package de.smbonline.searchindexer.log;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * AOP aspect that logs execution time of annotated methods.
 * This class uses @{@link LogExecutionTime} annotation as pointcut.
 */
@Aspect
@Component
public class LogAspect {

    private static final Logger LOGGER = LoggerFactory.getLogger("performance");

    @Around("@annotation(LogExecutionTime)")
    public Object logExecutionTime(final ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        Object proceed = joinPoint.proceed();
        long end = System.currentTimeMillis();
        LOGGER.debug("{} took {} ms.", joinPoint.getSignature(), end - start);
        return proceed;
    }
}