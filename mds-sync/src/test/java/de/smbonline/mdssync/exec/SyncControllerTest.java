package de.smbonline.mdssync.exec;

import de.smbonline.mdssync.api.MdsApiClientFactory;
import de.smbonline.mdssync.api.MdsApiConfig;
import de.smbonline.mdssync.dataprocessor.queue.DataQueue;
import de.smbonline.mdssync.dataprocessor.service.LanguageService;
import de.smbonline.mdssync.dataprocessor.service.SyncCycleService;
import de.smbonline.mdssync.exec.resolvers.ResolverRegistry;
import kotlin.Pair;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.ObjectProvider;

import java.time.Duration;
import java.time.OffsetDateTime;
import java.util.concurrent.TimeUnit;

import static org.assertj.core.api.Assertions.*;

class SyncControllerTest {

    @Test
    void onlyOnePermitAllowed() throws Exception {

        SyncController controller = testController(false);

        assertThat(controller.getAvailablePermits()).isEqualTo(1);

        SyncResult[] effectivelyFinalValueHolder = new SyncResult[1];
        Thread winner = new Thread(() -> effectivelyFinalValueHolder[0] = controller.nextIncremental());
        winner.setName("winner");
        winner.start();

        // ensure our winner acquires the permit
        TimeUnit.MILLISECONDS.sleep(100);

        Thread[] otherThreads = new Thread[10];
        SyncResult[] otherResults = new SyncResult[otherThreads.length];

        for (int i = 0; i < otherThreads.length; i++) {

            // winner runs for some seconds so otherThreads should not be able to acquire a permit
            assertThat(controller.getAvailablePermits()).isZero();

            final int idx = i;
            otherThreads[idx] = new Thread(() -> {
                // tryAcquire with 60s timeout
                switch (idx % 3) {
                    case 1 -> otherResults[idx] = controller.removeDeleted();
                    case 2 -> otherResults[idx] = controller.resolveHighlights();
                    default -> otherResults[idx] = controller.nextIncremental();
                }
            });
            otherThreads[idx].setDaemon(true);
            otherThreads[idx].setName("otherThreads[" + idx + "]");
            otherThreads[idx].start();
        }

        winner.join();
        for (Thread t : otherThreads) {
            t.join();
        }

        // assert 'winner' acquired permit and others failed
        assertThat(effectivelyFinalValueHolder[0].getStatus()).isEqualTo(SyncResult.Status.SUCCESS);
        for (SyncResult r : otherResults) {
            assertThat(r.getStatus()).isEqualTo(SyncResult.Status.NOOP);
        }

        assertThat(controller.getAvailablePermits()).isEqualTo(1);
    }

    @Test
    void permitsAreReleasedOnSuccess() {

        SyncController controller = testController(false);

        assertThat(controller.getAvailablePermits()).isEqualTo(1);
        controller.removeDeleted();
        assertThat(controller.getAvailablePermits()).isEqualTo(1);
    }

    @Test
    void permitsAreReleasedOnFailure() {

        SyncController controller = testController(true);

        assertThat(controller.getAvailablePermits()).isEqualTo(1);

        try {
            controller.nextIncremental();
            failBecauseExceptionWasNotThrown(Exception.class);
        } catch (Exception ignored) {
        }

        assertThat(controller.getAvailablePermits()).isEqualTo(1);
    }

    @SuppressWarnings("unchecked")
    private SyncController testController(final boolean withException) {

        final int tryAcquireTimeout = 2;
        ObjectProvider<SyncExecuter> syncExecuterProvider = Mockito.mock(ObjectProvider.class);
        if (withException) {
            Mockito.when(syncExecuterProvider.getObject()).thenThrow(new RuntimeException("test error"));
        } else {
            // timeout must be longer than the timeout used in tryAcquire
            Mockito.when(syncExecuterProvider.getObject()).then((i) -> noopExecuter(tryAcquireTimeout * 3));
        }
        ObjectProvider<HighlightsSyncRunner> highlightsResolverProvider = Mockito.mock(ObjectProvider.class);
        ObjectProvider<AssortmentsSyncRunner> assortmentsResolverProvider = Mockito.mock(ObjectProvider.class);
        ObjectProvider<PersonsSyncRunner> personsResolverProvider = Mockito.mock(ObjectProvider.class);
        ObjectProvider<ExhibitionsSyncRunner> exhibitionsResolverProvider = Mockito.mock(ObjectProvider.class);
        ObjectProvider<ThesaurusSyncRunner> thesaurusResolverProvider = Mockito.mock(ObjectProvider.class);

        SyncController controller = new SyncController(
                syncExecuterProvider,
                highlightsResolverProvider,
                assortmentsResolverProvider,
                personsResolverProvider,
                exhibitionsResolverProvider,
                thesaurusResolverProvider);
        controller.getConfig().setIncrementalTimeout(new Pair<>(tryAcquireTimeout, TimeUnit.SECONDS));
        controller.getConfig().setHighlightTimeout(new Pair<>(tryAcquireTimeout, TimeUnit.SECONDS));
        controller.getConfig().setDeleteTimeout(new Pair<>(tryAcquireTimeout, TimeUnit.SECONDS));
        return controller;
    }

    @SuppressWarnings("unchecked")
    private SyncExecuter noopExecuter(final int noopDurationSeconds) {
        return new SyncExecuter(
                Mockito.mock(MdsApiConfig.class),
                Mockito.mock(MdsApiClientFactory.class),
                Mockito.mock(LanguageService.class),
                Mockito.mock(SyncCycleService.class),
                Mockito.mock(DataQueue.class),
                Mockito.mock(ResolverRegistry.class)) {

            @Override
            public SyncResult sync() {
                noop(noopDurationSeconds);
                return new SyncResult(SyncResult.Status.SUCCESS, Duration.ofSeconds(noopDurationSeconds));
            }

            @Override
            public synchronized SyncResult syncDeleted() {
                noop(noopDurationSeconds);
                return new SyncResult(SyncResult.Status.SUCCESS, Duration.ofSeconds(noopDurationSeconds));
            }

            @Override
            public SyncResult sync(final OffsetDateTime start, final OffsetDateTime end) {
                noop(noopDurationSeconds);
                return new SyncResult(SyncResult.Status.SUCCESS, Duration.ofSeconds(noopDurationSeconds));
            }

            private void noop(final int noopDurationSeconds) {
                try {
                    TimeUnit.SECONDS.sleep(noopDurationSeconds);
                } catch (InterruptedException exc) {
                    Thread.currentThread().interrupt();
                    throw new RuntimeException(exc);
                }
            }
        };
    }
}