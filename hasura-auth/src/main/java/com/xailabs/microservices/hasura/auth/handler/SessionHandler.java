package com.xailabs.microservices.hasura.auth.handler;

import com.xailabs.microservices.hasura.auth.data.User;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.security.auth.login.CredentialNotFoundException;
import javax.security.auth.login.LoginException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Aspect
@Component
public class SessionHandler implements WebMvcConfigurer, HandlerInterceptor {

    private static final Logger LOGGER = LoggerFactory.getLogger(SessionHandler.class);

    private static final String SESSION_KEY_OPERATOR = "operator";
    private static final String LOGIN_POINTCUT =
            "@annotation(com.xailabs.microservices.hasura.auth.handler.Login)";

    @Override
    public void addInterceptors(final InterceptorRegistry registry) {
        registry.addInterceptor(this).addPathPatterns("/logout");
    }

    @Override
    public void postHandle(
            final HttpServletRequest request,
            final HttpServletResponse response,
            final Object handler,
            final @Nullable ModelAndView mv) {
        if (request.getRequestURI().endsWith("/logout")) {
            HttpSession session = request.getSession(false);
            if (session != null) {
                session.invalidate();
            }
        }
    }

    public String getSessionId() {
        return RequestContextHolder.currentRequestAttributes().getSessionId();
    }

    @AfterReturning(pointcut = LOGIN_POINTCUT, returning = "user")
    public void authenticated(final User user) {
        RequestAttributes current = RequestContextHolder.currentRequestAttributes();
        current.setAttribute(SESSION_KEY_OPERATOR, user, RequestAttributes.SCOPE_SESSION);
        LOGGER.debug("Session owner {}={}", current.getSessionId(), user.getUsername());
    }

    public User getOperator() throws LoginException {
        Object operator = RequestContextHolder.currentRequestAttributes()
                .getAttribute(SESSION_KEY_OPERATOR, RequestAttributes.SCOPE_SESSION);
        if (operator == null) {
            throw new CredentialNotFoundException("operator not set in session");
        }
        return (User) operator;
    }
}
