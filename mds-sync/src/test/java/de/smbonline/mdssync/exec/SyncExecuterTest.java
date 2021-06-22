package de.smbonline.mdssync.exec;

import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.IgnorableKeyData;
import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.LanguageData;
import de.smbonline.mdssync.dataprocessor.queue.DataQueue;
import de.smbonline.mdssync.dataprocessor.queue.ObservableDataQueue;
import de.smbonline.mdssync.dataprocessor.repository.IgnorableKeyRepository;
import de.smbonline.mdssync.dataprocessor.repository.LanguageRepository;
import de.smbonline.mdssync.dataprocessor.repository.SyncCycleRepository;
import de.smbonline.mdssync.dataprocessor.service.IgnorableKeyService;
import de.smbonline.mdssync.dataprocessor.service.LanguageService;
import de.smbonline.mdssync.dataprocessor.service.SyncCycleService;
import de.smbonline.mdssync.dto.WrapperDTO;
import de.smbonline.mdssync.index.SearchIndexerConfig;
import de.smbonline.mdssync.search.MdsApiClient;
import de.smbonline.mdssync.search.MdsApiConfig;
import de.smbonline.mdssync.search.response.Module;
import de.smbonline.mdssync.search.response.ModuleItem;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.ObjectProvider;

import javax.validation.constraints.NotNull;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.*;

public class SyncExecuterTest {

    @Test
    public void ignoredKeys() throws Exception {
        Repos repos = new Repos().ignorableKeys("foo", "bar", "foo.bar", "one.two.three");
        SyncExecuter exec = newSyncExecuter(repos);
        String[] ignoredKeys = exec.getIgnoredKeys();
        assertThat(ignoredKeys).containsExactly("bar", "foo", "foo.bar", "one.two.three");
    }

    @Test
    public void syncedIds() throws Exception {
        Long[] ids = {1L, 2L, 3L};
        Repos repos = new Repos().languages("de");
        SyncExecuter exec = newSyncExecuter(repos);
        SyncResult result = exec.sync(ids);
        assertThat(result.getSuccessfulIds()).isNotNull();
        assertThat(result.getFailedIds()).isNotNull();
        assertThat(result.getSkippedIds()).isNotNull();
        assertThat(result.getStatus()).isNotNull();
        assertThat(result.getDuration()).isNotNull();
        assertThat(result.getSuccessfulIds().length + result.getFailedIds().length + result.getSkippedIds().length).isEqualTo(ids.length);
    }

    @SuppressWarnings("unchecked")
    private static SyncExecuter newSyncExecuter(final @NotNull Repos repos) throws Exception {
        MdsApiConfig mdsApiConfig = new MdsApiConfig();
        MdsApiClient client = Mockito.mock(MdsApiClient.class);
        Mockito.when(client.search(Mockito.any(), Mockito.eq("de"))).then((invocation) -> {
            ModuleItem item1 = new ModuleItem();
            item1.setId(1L);
            ModuleItem item2 = new ModuleItem();
            item2.setId(2L);
            ModuleItem item3 = new ModuleItem();
            item3.setId(3L);
            Module module = new Module();
            module.setName("Objects");
            module.getModuleItem().add(item1);
            module.getModuleItem().add(item2);
            module.getModuleItem().add(item3);
            module.setTotalSize((long) module.getModuleItem().size());
            return module;
        });
        SearchIndexerConfig indexerConfig = new SearchIndexerConfig();
        indexerConfig.setShouldUpdate(false);
        DataQueue<WrapperDTO> dataQueue = new ObservableDataQueue<>();
        ObjectProvider<AttachmentsResolver> attachmentResolverProvider = Mockito.mock(ObjectProvider.class);
        LanguageService langService = new LanguageService();
        langService.languageRepository = repos.languageRepository;
        IgnorableKeyService ignoreService = new IgnorableKeyService();
        ignoreService.ignorableKeyRepo = repos.ignorableKeyRepository;
        SyncCycleService cycleService = new SyncCycleService();
        cycleService.syncCycleRepository=repos.cyclesRepository;

        return new SyncExecuter(
                mdsApiConfig,
                indexerConfig,
                langService,
                cycleService,
                ignoreService,
                dataQueue,
                attachmentResolverProvider) {
            @Override
            public MdsApiClient mdsClient() {
                return client;
            }
        };
    }

    private static class Repos {
        private final LanguageRepository languageRepository = Mockito.mock(LanguageRepository.class);
        private final SyncCycleRepository cyclesRepository = Mockito.mock(SyncCycleRepository.class);
        private final IgnorableKeyRepository ignorableKeyRepository = Mockito.mock(IgnorableKeyRepository.class);

        public Repos ignorableKeys(final @NotNull String... keys) {
            List<IgnorableKeyData> ignorableKeys = Arrays.stream(keys)
                    .map(key -> new IgnorableKeyData("smb_ignorable_key", key, key))
                    .collect(Collectors.toList());
            Mockito.when(ignorableKeyRepository.fetchAllIgnorableKeysBlocking()).thenReturn(ignorableKeys);
            return this;
        }

        public Repos languages(final @NotNull String... isoKeys) {
            List<LanguageData> languages = Arrays.stream(isoKeys)
                    .map(key -> new LanguageData("smb_language", key, key))
                    .collect(Collectors.toList());
            Mockito.when(languageRepository.fetchLanguagesBlocking()).thenReturn(languages);
            return this;
        }
    }
}
