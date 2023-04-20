package de.smbonline.searchindexer.rest;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.dto.Projection;
import de.smbonline.searchindexer.service.GraphQlDataResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static de.smbonline.searchindexer.conf.ConstKt.*;
import static de.smbonline.searchindexer.dto.Projection.*;
import static de.smbonline.searchindexer.rest.Params.*;
import static de.smbonline.searchindexer.rest.Responses.*;
import static de.smbonline.searchindexer.rest.Requests.*;
import static org.springframework.http.MediaType.*;

@RestController
@RequestMapping("lookup")
public class LookupController {

    private final GraphQlDataResolver dataResolver;

    @Autowired
    public LookupController(final GraphQlDataResolver dataResolver) {
        this.dataResolver = dataResolver;
    }

    @GetMapping(path = "/thesaurus/{id}", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> getThesaurus(
            final @PathVariable("id") String thesaurusId,
            final @RequestParam(name = LANGUAGE_PARAMETER, defaultValue = DEFAULT_LANGUAGE) String lang,
            final @RequestParam(name = PROJECTION_PARAMETER, defaultValue = DEFAULT_PROJECTION_NAME) String projection) {
        long id = requireNumericPathElement(thesaurusId);
        Data object = this.dataResolver.resolveThesaurus(id, lang);
        return object == null
                ? ResponseEntity.notFound().build()
                : handleDataResponse(object, Projection.getOrDefault(projection));
    }
/*
    @GetMapping(path = "/geo/{id}", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> getGeographicalReference(
            final @PathVariable("id") String geoRefId,
            final @RequestParam(name = LANGUAGE_PARAMETER, defaultValue = DEFAULT_LANGUAGE) String lang,
            final @RequestParam(name = PROJECTION_PARAMETER, defaultValue = DEFAULT_PROJECTION_NAME) String projection) {
        long id = requireNumericPathElement(geoRefId);
        Data object = this.dataResolver.resolveGeographicalReference(id, lang);
        return object == null
                ? ResponseEntity.notFound().build()
                : handleDataResponse(object, Projection.getOrDefault(projection));
    }

    @GetMapping(path = "/material/{id}", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> getMaterialAndTechnique(
            final @PathVariable("id") String materialId,
            final @RequestParam(name = LANGUAGE_PARAMETER, defaultValue = DEFAULT_LANGUAGE) String lang,
            final @RequestParam(name = PROJECTION_PARAMETER, defaultValue = DEFAULT_PROJECTION_NAME) String projection) {
        long id = requireNumericPathElement(materialId);
        Data object = this.dataResolver.resolveMaterial(id, lang);
        return object == null
                ? ResponseEntity.notFound().build()
                : handleDataResponse(object, Projection.getOrDefault(projection));
    }
*/
    @GetMapping(path = "/person/{id}", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> getPerson(
            final @PathVariable("id") String personId,
            final @RequestParam(name = LANGUAGE_PARAMETER, defaultValue = DEFAULT_LANGUAGE) String lang,
            final @RequestParam(name = PROJECTION_PARAMETER, defaultValue = DEFAULT_PROJECTION_NAME) String projection) {
        long id = requireNumericPathElement(personId);
        Data object = this.dataResolver.resolvePerson(id, lang);
        return object == null
                ? ResponseEntity.notFound().build()
                : handleDataResponse(object, Projection.getOrDefault(projection));
    }

    @GetMapping(path = "/exhibition/{id}", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Data> getExhibition(
            final @PathVariable("id") String exhibitionId,
            final @RequestParam(name = LANGUAGE_PARAMETER, defaultValue = DEFAULT_LANGUAGE) String lang,
            final @RequestParam(name = PROJECTION_PARAMETER, defaultValue = DEFAULT_PROJECTION_NAME) String projection) {
        long id = requireNumericPathElement(exhibitionId);
        Data object = this.dataResolver.resolveExhibition(id, lang);
        return object == null
                ? ResponseEntity.notFound().build()
                : handleDataResponse(object, Projection.getOrDefault(projection));
    }
}
