package de.smbonline.mdssync.log;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import static de.smbonline.mdssync.log.Loggers.*;

/**
 * AOP aspect that logs execution time of annotated methods.
 * This class uses @{@link de.smbonline.mdssync.log.LogExecutionTime} annotation as pointcut.
 */
@Aspect
@Component
public class LogAspect {


    @Around("@annotation(LogExecutionTime)")
    public Object logExecutionTime(final ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long end = System.currentTimeMillis();
        PERFORMANCE_LOGGER.debug("{} took {} ms.", joinPoint.getSignature(), end - start);
        return result;
    }
}