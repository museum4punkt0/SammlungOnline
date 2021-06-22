package com.xailabs.microservices.hasura.auth.handler;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * AOP marker that tags a method as authentication function. This is used by {@link SessionHandler}
 * to set the operator in the session upon successful login.
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Login {
}
