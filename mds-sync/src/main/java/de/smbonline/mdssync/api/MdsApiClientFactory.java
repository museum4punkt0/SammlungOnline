package de.smbonline.mdssync.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import java.util.LinkedHashMap;
import java.util.Map;

@Component
public class MdsApiClientFactory {

    private final Map<String, MdsApiClient> registry = new LinkedHashMap<>();
    private final MdsApiConfig config;
    private final MdsSessionHandler sessionHandler;

    @Autowired
    public MdsApiClientFactory(final MdsApiConfig config, final @Nullable MdsSessionHandler handler) {
        this.config = config;
        this.sessionHandler = handler;
    }

    public void registerApiClient(final MdsApiClient client) {
        this.registry.put(client.getModuleName(), client);
    }

    public MdsApiClient getApiClient(final String moduleName) {
        return this.registry.computeIfAbsent(moduleName, name -> new MdsApiClient(this.config, name, this.sessionHandler));
    }
}
