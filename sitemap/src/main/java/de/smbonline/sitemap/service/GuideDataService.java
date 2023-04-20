package de.smbonline.sitemap.service;

import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class GuideDataService implements DataService {

    // TODO
    @Override
    public List<String> getPathSegments() {
        return Collections.emptyList();
    }
}
