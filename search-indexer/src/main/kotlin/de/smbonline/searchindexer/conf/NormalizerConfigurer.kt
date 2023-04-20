package de.smbonline.searchindexer.conf

import de.smbonline.searchindexer.norm.NormalizerRegistry
import de.smbonline.searchindexer.norm.impl.AcquisitionNormalizer
import de.smbonline.searchindexer.norm.impl.AssortmentsNormalizer
import de.smbonline.searchindexer.norm.impl.AttachmentsNormalizer
import de.smbonline.searchindexer.norm.impl.CollectionKeyNormalizer
import de.smbonline.searchindexer.norm.impl.CollectionNormalizer
import de.smbonline.searchindexer.norm.impl.CompilationNormalizer
import de.smbonline.searchindexer.norm.impl.CreditLineNormalizer
import de.smbonline.searchindexer.norm.impl.DateRangeNormalizer
import de.smbonline.searchindexer.norm.impl.DatingNormalizer
import de.smbonline.searchindexer.norm.impl.DimensionsAndWeightNormalizer
import de.smbonline.searchindexer.norm.impl.ExhibitNormalizer
import de.smbonline.searchindexer.norm.impl.ExhibitionSpaceNormalizer
import de.smbonline.searchindexer.norm.impl.ExhibitionsNormalizer
import de.smbonline.searchindexer.norm.impl.FindSpotNormalizer
import de.smbonline.searchindexer.norm.impl.GeographicalReferenceNormalizer
import de.smbonline.searchindexer.norm.impl.HighlightsNormalizer
import de.smbonline.searchindexer.norm.impl.IconclassNormalizer
import de.smbonline.searchindexer.norm.impl.IconographyNormalizer
import de.smbonline.searchindexer.norm.impl.IdNormalizer
import de.smbonline.searchindexer.norm.impl.IdentNumberNormalizer
import de.smbonline.searchindexer.norm.impl.InscriptionNormalizer
import de.smbonline.searchindexer.norm.impl.InvolvedPartiesNormalizer
import de.smbonline.searchindexer.norm.impl.KeywordNormalizer
import de.smbonline.searchindexer.norm.impl.LiteratureNormalizer
import de.smbonline.searchindexer.norm.impl.LocationNormalizer
import de.smbonline.searchindexer.norm.impl.LongDescriptionNormalizer
import de.smbonline.searchindexer.norm.impl.MaterialAndTechniqueNormalizer
import de.smbonline.searchindexer.norm.impl.ProvenanceEvaluationNormalizer
import de.smbonline.searchindexer.norm.impl.ProvenanceNormalizer
import de.smbonline.searchindexer.norm.impl.SignatureNormalizer
import de.smbonline.searchindexer.norm.impl.TechnicalTermNormalizer
import de.smbonline.searchindexer.norm.impl.TitlesNormalizer
import de.smbonline.searchindexer.service.GraphQlService
import org.springframework.beans.factory.ObjectProvider
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class NormalizerConfigurer @Autowired constructor(
        private val props: NormalizerConfig
) {

    @Bean
    fun initConverterRegistry(graphQl: ObjectProvider<GraphQlService>): NormalizerRegistry {
        return NormalizerRegistry()
                .register(AcquisitionNormalizer())
                .register(AssortmentsNormalizer(graphQl))
                .register(AttachmentsNormalizer())
                .register(CollectionNormalizer())
                .register(CollectionKeyNormalizer())
                .register(CompilationNormalizer())
                .register(CreditLineNormalizer())
                .register(DateRangeNormalizer())
                .register(DatingNormalizer())
                .register(DimensionsAndWeightNormalizer())
                .register(exhibitNormalizer())
                .register(ExhibitionsNormalizer())
                .register(ExhibitionSpaceNormalizer(props.locationSeparator))
                .register(FindSpotNormalizer())
                .register(GeographicalReferenceNormalizer(graphQl))
                .register(HighlightsNormalizer())
                .register(IconclassNormalizer())
                .register(IconographyNormalizer())
                .register(IdNormalizer())
                .register(IdentNumberNormalizer())
                .register(InscriptionNormalizer())
                .register(InvolvedPartiesNormalizer(graphQl))
                .register(KeywordNormalizer())
                .register(LiteratureNormalizer())
                .register(LocationNormalizer(props.locationSeparator))
                .register(LongDescriptionNormalizer())
                .register(MaterialAndTechniqueNormalizer(graphQl))
                .register(ProvenanceNormalizer())
                .register(ProvenanceEvaluationNormalizer())
                .register(SignatureNormalizer())
                .register(TechnicalTermNormalizer())
                .register(TitlesNormalizer())

    }

    private fun exhibitNormalizer(): ExhibitNormalizer {
        val normalizer = ExhibitNormalizer()
        normalizer.unknownExhibitionSpace = props.unknownExhibitionSpace
        return normalizer
    }
}