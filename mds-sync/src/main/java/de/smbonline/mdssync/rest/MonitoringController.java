package de.smbonline.mdssync.rest;

import de.smbonline.mdssync.diff.ObjectIdsResolver;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashSet;
import java.util.Set;
import java.util.TreeSet;

import static org.springframework.http.MediaType.*;

@RestController
@RequestMapping(path = "monitoring")
public class MonitoringController {

    private final ObjectIdsResolver idResolver;

    @Autowired
    public MonitoringController(final ObjectIdsResolver resolver) {
        this.idResolver = resolver;
    }

    @GetMapping(path = "/listing", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> fetchObjectIds(
            final @RequestParam(name = "startId", defaultValue = "1") Long startId,
            final @RequestParam(name = "endId", defaultValue = "999999999999999") Long endId,
            final @RequestParam(name = "lang", defaultValue = "de") String lang,
            final @RequestParam(name = "systems", defaultValue = "mds,hasura,elastic") String systemNames,
            final @RequestParam(name = "projection", defaultValue = "diff") String projection) {

        // evaluate params
        String[] systems = StringUtils.stripAll(systemNames.split(","));
        boolean full = "full".equals(projection);
        boolean diff = systems.length > 1 && (full || "diff".equals(projection));
        boolean deviance = systems.length > 1 && (full || diff || "deviance".equals(projection));

        // listings
        boolean mds = ArrayUtils.contains(systems, "mds");
        Set<Long> mdsIds = mds
                ? this.idResolver.getMdsObjectIds(startId, endId, lang) : null;
        boolean hasura = ArrayUtils.contains(systems, "hasura");
        Set<Long> hasuraIds = hasura
                ? this.idResolver.getHasuraObjectIds(startId, endId) : null;
        boolean elastic = ArrayUtils.contains(systems, "elastic");
        Set<Long> elasticIds = elastic
                ? this.idResolver.getElasticObjectIds(startId, endId, lang) : null;

        Set<Long> divergence = new TreeSet<>();
        Set<Data> diffs = new LinkedHashSet<>();

        // deviance and diffs
        if (diff || deviance) {
            if (mds && hasura) {
                Pair<Set<Long>, Set<Long>> div = deviance(mdsIds, hasuraIds);
                if (deviance) {
                    divergence.addAll(aggregate(div.getLeft(), div.getRight()));
                }
                if (diff) {
                    diffs.add(diff("mds", div.getLeft(), "hasura", div.getRight()));
                }
            }
            if (mds && elastic) {
                Pair<Set<Long>, Set<Long>> div = deviance(mdsIds, elasticIds);
                if (deviance) {
                    divergence.addAll(aggregate(div.getLeft(), div.getRight()));
                }
                if (diff) {
                    diffs.add(diff("mds", div.getLeft(), "elastic", div.getRight()));
                }
            }
            if (hasura && elastic) {
                Pair<Set<Long>, Set<Long>> div = deviance(hasuraIds, elasticIds);
                if (deviance) {
                    divergence.addAll(aggregate(div.getLeft(), div.getRight()));
                }
                if (diff) {
                    diffs.add(diff("hasura", div.getLeft(), "elastic", div.getRight()));
                }
            }
        }

        // response
        Data response = new Data()
                .setNonNullAttribute("mds", full ? mdsIds : null)
                .setNonNullAttribute("hasura", full ? hasuraIds : null)
                .setNonNullAttribute("elastic", full ? elasticIds : null)
                .setNonNullAttribute("diffs", diff ? diffs : null)
                .setNonNullAttribute("deviance", deviance ? divergence : null);
        return ResponseEntity.ok(response);
    }

    private Data diff(final String left, final Set<Long> leftIds, final String right, final Set<Long> rightIds) {
        return new Data()
                .setAttribute(left + "_vs_" + right, new Data()
                        .setAttribute("only_left", leftIds)
                        .setAttribute("only_right", rightIds)
                );
    }

    private Pair<Set<Long>, Set<Long>> deviance(final Set<Long> leftIds, final Set<Long> rightIds) {
        Set<Long> onlyLeft = new LinkedHashSet<>(leftIds);
        onlyLeft.removeAll(new LinkedHashSet<>(rightIds));
        Set<Long> onlyRight = new LinkedHashSet<>(rightIds);
        onlyRight.removeAll(new LinkedHashSet<>(leftIds));
        return Pair.of(onlyLeft, onlyRight);
    }

    private Set<Long> aggregate(final Set<Long> leftIds, final Set<Long> rightIds) {
        Set<Long> aggregate = new TreeSet<>();
        aggregate.addAll(leftIds);
        aggregate.addAll(rightIds);
        return aggregate;
    }
}
