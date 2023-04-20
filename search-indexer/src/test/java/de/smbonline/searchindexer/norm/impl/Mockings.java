package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.service.GraphQlService;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.ObjectProvider;

public final class Mockings {

    public static ObjectProvider<GraphQlService> graphQlProvider(final GraphQlService mockService) {
        return new ObjectProvider<>() {
            @Override public GraphQlService getObject(Object... args) throws BeansException {
                return mockService;
            }

            @Override public GraphQlService getIfAvailable() throws BeansException {
                return mockService;
            }

            @Override public GraphQlService getIfUnique() throws BeansException {
                return mockService;
            }

            @Override public GraphQlService getObject() throws BeansException {
                return mockService;
            }
        };
    }

    private Mockings() {
        // no instances
    }
}
