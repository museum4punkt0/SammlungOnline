package de.smbonline.mdssync.exec.resolvers;

import de.smbonline.mdssync.exc.MdsApiConnectionException;
import de.smbonline.mdssync.jaxb.search.response.ModuleItem;

public interface MdsItemResolver {

    String getStatusInfo();

    ResolverResult parseAndProcessReferences(
            final ModuleItem parentItem,
            final boolean linkToParent,
            final String language) throws MdsApiConnectionException;
}
