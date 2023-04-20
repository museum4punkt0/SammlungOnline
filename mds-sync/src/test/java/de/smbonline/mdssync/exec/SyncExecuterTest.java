package de.smbonline.mdssync.exec;

import de.smbonline.mdssync.api.MdsApiClient;
import de.smbonline.mdssync.api.MdsApiClientFactory;
import de.smbonline.mdssync.api.MdsApiConfig;
import de.smbonline.mdssync.api.MdsSessionHandler;
import de.smbonline.mdssync.dataprocessor.queue.DataQueue;
import de.smbonline.mdssync.dataprocessor.queue.ObservableDataQueue;
import de.smbonline.mdssync.dataprocessor.service.IgnorableKeyService;
import de.smbonline.mdssync.dataprocessor.service.LanguageService;
import de.smbonline.mdssync.dataprocessor.service.SyncCycleService;
import de.smbonline.mdssync.dto.WrapperDTO;
import de.smbonline.mdssync.exec.resolvers.ObjectsResolver;
import de.smbonline.mdssync.exec.resolvers.ResolverRegistry;
import de.smbonline.mdssync.exec.resolvers.ResolverResult;
import de.smbonline.mdssync.index.SearchIndexerConfig;
import de.smbonline.mdssync.jaxb.search.response.Module;
import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.ObjectProvider;

import java.util.Arrays;

import static org.assertj.core.api.Assertions.*;

class SyncExecuterTest {

    @Test
    void syncedIds() throws Exception {
        Long[] ids = {1L, 2L, 3L};
        Services services = new Services().languages("de");
        SyncExecuter exec = newSyncExecuter(services);
        SyncResult result = exec.sync(ids);
        assertThat(result.getSuccessfulIds()).isNotNull();
        assertThat(result.getFailedIds()).isNotNull();
        assertThat(result.getSkippedIds()).isNotNull();
        assertThat(result.getStatus()).isNotNull();
        assertThat(result.getDuration()).isNotNull();
        assertThat(result.getSuccessfulIds().length + result.getFailedIds().length + result.getSkippedIds().length).isEqualTo(ids.length);
    }

    @SuppressWarnings("unchecked")
    private static SyncExecuter newSyncExecuter(final Services services) throws Exception {
        MdsApiConfig mdsApiConfig = new MdsApiConfig();
        MdsSessionHandler sessionHandler = Mockito.mock(MdsSessionHandler.class);
        MdsApiClient client = Mockito.mock(MdsApiClient.class);
        Mockito.when(client.getModuleName()).thenReturn("Object");
        Mockito.when(client.search(Mockito.any(), Mockito.eq("de"))).then((invocation) -> {
            ModuleItem item1 = new ModuleItem();
            item1.setId(1L);
            ModuleItem item2 = new ModuleItem();
            item2.setId(2L);
            ModuleItem item3 = new ModuleItem();
            item3.setId(3L);
            Module module = new Module();
            module.setName("Object");
            module.getModuleItem().add(item1);
            module.getModuleItem().add(item2);
            module.getModuleItem().add(item3);
            module.setTotalSize((long) module.getModuleItem().size());
            return module;
        });
        MdsApiClientFactory clientFactory = new MdsApiClientFactory(mdsApiConfig, sessionHandler);
        clientFactory.registerApiClient(client);
        SearchIndexerConfig indexerConfig = new SearchIndexerConfig();
        indexerConfig.setShouldUpdate(false);
        DataQueue<WrapperDTO> dataQueue = new ObservableDataQueue<>();
        ObjectsResolver objectResolver = Mockito.mock(ObjectsResolver.class);
        Mockito.when(objectResolver.parseAndProcess(Mockito.any(), Mockito.any())).then((invocation) -> {
            Module module = invocation.getArgument(0);
            ResolverResult result = new ResolverResult();
            for (ModuleItem item : module.getModuleItem()) {
                result.processed(item.getId());
                if (item.getId() % 2 == 0) {
                    result.failed(item.getId());
                } else {
                    result.successful(item.getId());
                }

            }
            return result;
        });
        ObjectProvider<ObjectsResolver> objectResolverProvider = Mockito.mock(ObjectProvider.class);
        Mockito.when(objectResolverProvider.getObject()).thenReturn(Mockito.mock(ObjectsResolver.class));
        ResolverRegistry registry = new ResolverRegistry(
                objectResolverProvider,
                Mockito.mock(ObjectProvider.class),
                Mockito.mock(ObjectProvider.class),
                Mockito.mock(ObjectProvider.class),
                Mockito.mock(ObjectProvider.class));

        SyncExecuter executer = new SyncExecuter(
                mdsApiConfig,
                clientFactory,
                services.languageService,
                services.cyclesService,
                dataQueue,
                registry);
        executer.setModuleName("Object");
        return executer;
    }

    private static class Services {
        private final LanguageService languageService = Mockito.mock(LanguageService.class);
        private final SyncCycleService cyclesService = Mockito.mock(SyncCycleService.class);
        private final IgnorableKeyService ignorableKeyService = Mockito.mock(IgnorableKeyService.class);

        public Services ignorableKeys(final String... keys) {
            Mockito.when(ignorableKeyService.getIgnorableKeys()).thenReturn(Arrays.asList(keys));
            return this;
        }

        public Services languages(final String... isoKeys) {
            Mockito.when(languageService.getSupportedLanguages()).thenReturn(Arrays.asList(isoKeys));
            return this;
        }
    }
}
