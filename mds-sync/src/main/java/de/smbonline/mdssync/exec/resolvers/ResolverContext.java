package de.smbonline.mdssync.exec.resolvers;

import org.apache.commons.lang3.tuple.Pair;
import org.springframework.lang.Nullable;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Map;

import static de.smbonline.mdssync.util.Validations.*;

// FIXME cleanup
public class ResolverContext {
    public String language = "de";
    public boolean force = false;
    public Map<String, ? super Object> whatever = new LinkedHashMap<>();

    public static ResolverContext of(final @Nullable String lang, final boolean force) {
        ResolverContext ctx = new ResolverContext();
        ctx.language = lang;
        ctx.force = force;
        return ctx;
    }

    public static ResolverContext of(final @Nullable String lang, final boolean force, final Pair<String, ?>... args) {
        ResolverContext ctx = new ResolverContext();
        ctx.language = lang;
        ctx.force = force;
        if (isVarArgsDefined(args)) {
            Arrays.stream(args).forEach(pair -> ctx.whatever.put(pair.getKey(), pair.getValue()));
        }
        return ctx;
    }
}
