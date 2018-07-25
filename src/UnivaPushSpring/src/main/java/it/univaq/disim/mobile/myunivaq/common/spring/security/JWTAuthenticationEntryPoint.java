package it.univaq.disim.mobile.myunivaq.common.spring.security;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Serializable;

@Component
public class JWTAuthenticationEntryPoint implements AuthenticationEntryPoint, Serializable {

    private static final long serialVersionUID = -8970718410437077606L;

    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException {
        // Questo metodo e' invocato quando un utente tenta di accedere ad un endpoint non pubblico senza credenziali corrette
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
    }
}