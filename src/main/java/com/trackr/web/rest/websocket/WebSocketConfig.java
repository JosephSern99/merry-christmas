package com.trackr.web.rest.websocket;

import io.quarkus.arc.Unremovable;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.spi.CDI;
import jakarta.websocket.server.ServerEndpointConfig;

@ApplicationScoped
@Unremovable
public class WebSocketConfig extends ServerEndpointConfig.Configurator {

    @Override
    public <T> T getEndpointInstance(Class<T> endpointClass) {
        return CDI.current().select(endpointClass).get();
    }

    @Override
    public boolean checkOrigin(String originHeaderValue) {
        return true; // Disable origin checking for development
    }
}
