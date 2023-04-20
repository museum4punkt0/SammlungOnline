package de.smbonline.mdssync.exec.resolvers;

import de.smbonline.mdssync.dto.Operation;
import de.smbonline.mdssync.jaxb.search.response.Module;

public interface ModuleItemResolver extends MdsItemResolver {

    @FunctionalInterface
    interface BeforeExecuteCommandListener {
        void onBeforeExecuteCommand(final Long itemId, final Operation op);
    }

    @FunctionalInterface
    interface AfterExecuteCommandListener {
        void onAfterExecuteCommand(final Long itemId, final Operation op);
    }

    @FunctionalInterface
    interface ErrorExecuteCommandListener {
        void onErrorExecuteCommand(final Long itemId, final Operation op, final Exception exc);
    }

    void addBeforeExecuteCommandListener(final BeforeExecuteCommandListener listener);

    void addAfterExecuteCommandListener(final AfterExecuteCommandListener listener);

    void addOnErrorExecuteCommandListener(final ErrorExecuteCommandListener listener);

    String getModuleName();

    ResolverResult parseAndProcess(final Module module, final ResolverContext ctx);
}
