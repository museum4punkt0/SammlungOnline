package de.smbonline.mdssync.exec.resolvers;

import de.smbonline.mdssync.api.MdsApiClientFactory;
import de.smbonline.mdssync.api.MdsApiConfig;
import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.InvolvedPartyData;
import de.smbonline.mdssync.dataprocessor.queue.DataQueue;
import de.smbonline.mdssync.dataprocessor.service.PersonService;
import de.smbonline.mdssync.dto.ObjPerson;
import de.smbonline.mdssync.dto.Operation;
import de.smbonline.mdssync.dto.ParsedMdsItem;
import de.smbonline.mdssync.dto.Person;
import de.smbonline.mdssync.dto.Thesaurus;
import de.smbonline.mdssync.dto.WrapperDTO;
import de.smbonline.mdssync.exc.ErrorHandling;
import de.smbonline.mdssync.exc.MdsApiConnectionException;
import de.smbonline.mdssync.exec.parsers.ModuleItemParser;
import de.smbonline.mdssync.exec.parsers.ModuleItemParserFactory;
import de.smbonline.mdssync.index.SearchIndexerClient;
import de.smbonline.mdssync.jaxb.search.response.Module;
import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import de.smbonline.mdssync.jaxb.search.response.ModuleReference;
import de.smbonline.mdssync.jaxb.search.response.ModuleReferenceItem;
import de.smbonline.mdssync.jaxb.search.response.VocabularyReference;
import de.smbonline.mdssync.jaxb.search.response.VocabularyReferenceItem;
import de.smbonline.mdssync.ruleset.BiographicalDatesRule;
import de.smbonline.mdssync.ruleset.PersonNameRule;
import de.smbonline.mdssync.ruleset.PersonNormdataRule;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.commons.lang3.tuple.Triple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

import static de.smbonline.mdssync.util.Lookup.*;
import static de.smbonline.mdssync.util.MdsConstants.*;
import static de.smbonline.mdssync.util.Misc.*;
import static de.smbonline.mdssync.util.ValueExtractor.*;

@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class PersonsResolver extends ModuleItemResolverBase<ParsedMdsItem> {

    private final PersonService personService;

    @Autowired
    public PersonsResolver(
            final MdsApiConfig mdsConfig,
            final MdsApiClientFactory clientFactory,
            final SearchIndexerClient indexerClient,
            final PersonService personService,
            final DataQueue<WrapperDTO> dataQueue) {
        super(MODULE_PERSON, mdsConfig, indexerClient, clientFactory, dataQueue);
        this.personService = personService;
    }

    @Override
    public ResolverResult parseAndProcess(final Module module, final ResolverContext ctx) {
        ResolverResult result = parseAndProcess(module, ctx.language, state(), null);

        // this is a bit crappy but the best we can do:
        // when the person has been updated, we have to update all involved-parties as well
        for (ModuleItem personItem : module.getModuleItem()) {
            if (!result.hasSucceeded(personItem.getId())) {
                // update involved-parties only if person update was successful
                continue;
            }
            // fetch involved-parties before the update
            List<InvolvedPartyData> oldInvolvedParties = this.personService.getInvolvedParties(null, personItem.getId());
            ModuleReference objectRef = findModuleRef(personItem.getModuleReference(), "PerObjectRef");
            if (objectRef != null) {
                // filter obj-references by existence of RoleVoc
                List<ModuleReferenceItem> objectRefs = objectRef.getModuleReferenceItem().stream()
                        .filter(ref -> findVocRef(ref.getVocabularyReference(), VOC_ROLE) != null)
                        .toList();
                // for each reference, create/update involved party
                Person dto = parsePersonData(personItem, ctx.language);
                for (ModuleReferenceItem ref : objectRefs) {
                    ObjPerson involvedParty = resolveInvolvedParty(dto, ref);
                    process(newWrapper(involvedParty, Operation.UPSERT, result));
                    if (result.hasSucceeded(personItem.getId())) {
                        // TODO should be done in SyncRunner instead - add to ctx
                        notifyReindexObject(ref.getModuleItemId(), "involvedParties");
                    }
                }
            }
            // when done, delete old involved-parties that don't exist anymore
            List<InvolvedPartyData> newInvolvedParties = this.personService.getInvolvedParties(null, personItem.getId());
            List<InvolvedPartyData> obsoleteInvolvedParties = collectObsoleteInvolvedParties(oldInvolvedParties, newInvolvedParties);
            deleteInvolvedParties(obsoleteInvolvedParties, result);
            obsoleteInvolvedParties
                    .stream()
                    .map(party -> ((Number) party.getObjectId()).longValue())
                    .distinct()
                    // TODO should be done in SyncRunner instead - add to ctx
                    .forEach(objectId -> notifyReindexObject(objectId, "involvedParties"));
        }

        return result;
    }

    @Override
    public ResolverResult parseAndProcessReferences(final ModuleItem parentItem, final boolean linkToParent, final String language) throws MdsApiConnectionException {

        int total = 0;
        ResolverResult result = new ResolverResult();
        List<InvolvedPartyData> oldInvolvedParties = linkToParent ? this.personService.getInvolvedParties(parentItem.getId(), null) : null;

        // resolve new involved parties
        ModuleReference personRef = findFirst(parentItem.getModuleReference(), ref -> "ObjPerAssociationRef".equals(ref.getName()));
        if (personRef != null && personRef.getSize() > 0) {
            total = (int) personRef.getModuleReferenceItem().stream().map(ModuleReferenceItem::getModuleItemId).distinct().count();
            Module personModule = fetchReferencedModule(personRef, language);
            parseAndProcess(personModule, language, result, linkToParent ? parentItem : null);
        }

        // delete obsolete involved parties
        if (linkToParent) {
            List<InvolvedPartyData> newInvolvedParties = this.personService.getInvolvedParties(parentItem.getId(), null);
            List<InvolvedPartyData> obsoleteInvolvedParties = collectObsoleteInvolvedParties(oldInvolvedParties, newInvolvedParties);
            // add all person ids of obsolete parties that have not been processed already to the total
            total += obsoleteInvolvedParties.stream()
                    .map(InvolvedPartyData::getPersonId)
                    .distinct()
                    .filter(id -> !result.getProcessedIds().contains(((Number) id).longValue()))
                    .count();
            deleteInvolvedParties(obsoleteInvolvedParties, result);
        }

        logStatistics(total, result);
        return result;
    }

    private ResolverResult parseAndProcess(
            final Module module,
            final String language,
            final ResolverResult result,
            final @Nullable ModuleItem objectItem) {
        for (ModuleItem personItem : module.getModuleItem()) {
            try {
                if (isDeleted(personItem)) {
                    process(newWrapper(new Person(personItem.getId()), Operation.DELETE, result));
                } else {
                    Person dto = parsePersonData(personItem, language);
                    if (objectItem == null) {
                        process(newWrapper(dto, Operation.UPSERT, result));
                    } else {
                        // it could be that the person has multiple roles in context of this object,
                        // we have to create relations for all of these ModuleReferenceItems
                        Collection<ObjPerson> involvedParties = resolveInvolvedParties(dto, objectItem);
                        involvedParties.forEach(person -> process(newWrapper(person, Operation.UPSERT, result)));
                    }
                }
            } catch (Exception exc) {
                ErrorHandling.capture(exc, "Failed to sync person {}", personItem.getId());
                result.failed(personItem.getId());
            }
        }
        return result;
    }

    private Person parsePersonData(final ModuleItem item, final String language) {
        ModuleItemParser<Person> parser = ModuleItemParserFactory.getParser(MODULE_PERSON, language);
        Person person = parser.parseModuleItem(item);
        resolveAdditionalAttributes(item, person);
        return person;
    }

    private void resolveAdditionalAttributes(final ModuleItem moduleItem, final Person dto) {
        String name = new PersonNameRule().apply(moduleItem);
        dto.setName(name);

        Triple<LocalDate, LocalDate, String> life = new BiographicalDatesRule().apply(moduleItem);
        if (life != null) {
            dto.setDateOfBirth(life.getLeft());
            dto.setDateOfDeath(life.getMiddle());
            dto.setBiographicalDates(life.getRight());
        }

        Pair<String, String>[] normdata = new PersonNormdataRule().apply(moduleItem);
        if (normdata != null && normdata.length > 0) {
            dto.setNormdata1(normdata[0].getKey() + ":" + normdata[0].getValue());
            if (normdata.length > 1) {
                dto.setNormdata2(normdata[1].getKey() + ":" + normdata[1].getValue());
                if (normdata.length > 2) {
                    dto.setNormdata3(normdata[2].getKey() + ":" + normdata[2].getValue());
                }
            }
        }
    }

    private static Collection<ObjPerson> resolveInvolvedParties(final Person person, final ModuleItem objectItem) {
        ModuleReference personRef = Objects.requireNonNull(
                findFirst(objectItem.getModuleReference(), ref -> "ObjPerAssociationRef".equals(ref.getName())));
        Collection<ModuleReferenceItem> personRefItems = Objects.requireNonNull(
                findAll(personRef.getModuleReferenceItem(), ref -> ref.getModuleItemId().equals(person.getMdsId())));
        return personRefItems.stream().map(personRefItem -> {
            VocabularyReference roleVocRef = findVocRef(personRefItem.getVocabularyReference(), VOC_ROLE);
            if (roleVocRef == null) {
                return null;
            }
            Thesaurus role = convertToThesaurus(roleVocRef);
            VocabularyReference attributionVocRef = findVocRef(personRefItem.getVocabularyReference(), "AttributionVoc");
            Thesaurus attribution = attributionVocRef == null ? null : convertToThesaurus(attributionVocRef);
            return new ObjPerson(person, objectItem.getId(), extractSortInfo(personRefItem), Pair.of(role, attribution));
        }).filter(Objects::nonNull).toList();
    }

    private static ObjPerson resolveInvolvedParty(final Person person, final ModuleReferenceItem objectRefItem) {
        VocabularyReference roleVocRef = Objects.requireNonNull(findVocRef(objectRefItem.getVocabularyReference(), VOC_ROLE));
        Thesaurus role = convertToThesaurus(roleVocRef);
        VocabularyReference attributionVocRef = findVocRef(objectRefItem.getVocabularyReference(), "AttributionVoc");
        Thesaurus attribution = attributionVocRef == null ? null : convertToThesaurus(attributionVocRef);
        return new ObjPerson(person, objectRefItem.getModuleItemId(), -1 /*unknown seq*/, Pair.of(role, attribution));
    }

    private static Thesaurus convertToThesaurus(final VocabularyReference vocRef) {
        VocabularyReferenceItem vocRefItem = Objects.requireNonNull(vocRef.getVocabularyReferenceItem());
        Thesaurus thesaurus = new Thesaurus(Long.parseLong(vocRefItem.getId()), vocRef.getName());
        thesaurus.setName(nonNullVocName(vocRefItem));
        thesaurus.setInstance(vocRef.getInstanceName());
        return thesaurus;
    }

    private static List<InvolvedPartyData> collectObsoleteInvolvedParties(final List<InvolvedPartyData> oldParties, final List<InvolvedPartyData> newParties) {
        return oldParties.stream().filter(oldParty -> {
            // if party was not updated, it is obsolete
            InvolvedPartyData newParty = findFirst(newParties, party -> oldParty.getId().equals(party.getId()));
            return (newParty == null || oldParty.getUpdatedAt().equals(newParty.getUpdatedAt()));
        }).toList();
    }

    private void deleteInvolvedParties(final List<InvolvedPartyData> parties, final ResolverResult result) {
        // TODO use DataQueue
        parties.forEach(party -> {
            long id = ((Number) party.getPersonId()).longValue();
            try {
                result.processed(id);
                boolean deleted = this.personService.deleteInvolvedParty(party);
                if (deleted && !result.hasFailed(id)) {
                    result.successful(id);
                } else {
                    result.failed(id);
                }
            } catch (Exception exc) {
                ErrorHandling.capture(exc, "Failed to delete involved-party (object={}, person={}, role={})",
                        party.getObjectId(), party.getPersonId(), party.getRoleId());
                result.failed(id);
            }
        });
    }
}