package de.smbonline.searchindexer.norm.impl.mappings;

import de.smbonline.searchindexer.graphql.queries.fragment.*;
import org.springframework.lang.Nullable;

import java.util.*;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public interface MappingSupplier {

    List<AssortmentData> fetchAssortments(final String language);

    List<BuildingData> fetchBuildings();

    default @Nullable BuildingData fetchBuilding(final String keyOrLabel) {
        List<BuildingData> buildings = fetchBuildings();
        var building = firstOrNull(buildings, b -> keyOrLabel.equals(b.getKey()));
        if (building == null) {
            building = buildings
                    .stream()
                    .filter(b -> keyOrLabel.equals(b.getTitle()))
                    .min(Comparator.comparingInt(b -> b.getKey().length())) // shortest key is the best fit, e.g. prefer "PMU" over "PMU vor GuE"
                    .orElse(null);
        }
        return building;
    }

    default Map<String, String> buildingMapping() {
        return new TreeMap<>(fetchBuildings().stream().collect(Collectors.toMap(
                BuildingData::getKey,
                BuildingData::getTitle)
        ));
    }

    List<CompilationData> fetchCompilations();

    default @Nullable CompilationData fetchCompilation(final String orgUnit) {
        List<CompilationData> compilations = fetchCompilations();
        return firstOrNull(compilations, c -> orgUnit.equals(c.getKey()));
    }

    default Map<String, String> compilationMapping() {
        return new TreeMap<>(fetchCompilations().stream().collect(Collectors.toMap(
                CompilationData::getKey,
                CompilationData::getTitle)
        ));
    }

    List<CollectionData> fetchCollections();

    default @Nullable CollectionData fetchCollection(final String orgUnit) {
        List<CollectionData> collections = fetchCollections();
        return firstOrNull(collections, c -> orgUnit.startsWith(c.getKey()));
    }

    default Map<String, String> collectionMapping() {
        return new TreeMap<>(fetchCollections().stream().collect(Collectors.toMap(
                CollectionData::getKey,
                CollectionData::getTitle)
        ));
    }


    private <T> T firstOrNull(final Collection<T> list, final Predicate<T> filter) {
        return list.stream().filter(filter).findFirst().orElse(null);
    }
}