package de.smbonline.sitemap.service;

import java.util.ArrayList;
import java.util.List;

import de.smbonline.sitemap.graphql.GraphQlService;
import de.smbonline.sitemap.model.Page;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IslDataService implements DataService {

    private static final String DETAIL_CATEGORY_PATH = "stories/";
    private static final String DETAIL_STORY_PATH = "story/";
    private static final String DETAIL_TOPIC_PATH = "topic/";
    private static final int PAGE_SIZE = 100;

    private final GraphQlService graphQlService;

    @Autowired
    public IslDataService(final GraphQlService graphQlService) {
        this.graphQlService = graphQlService;
    }

    @Override
    public List<String> getPathSegments() {
        List<String> segments = new ArrayList<>();
        segments.addAll(getCategoriesPaths());
        segments.addAll(getStoryPaths());
        segments.addAll(getTopicsPaths());
        return segments;
    }

    private List<String> getCategoriesPaths() {
        List<String> segments = new ArrayList<>();
        int total = -1;
        for (int offset = 0; total == -1 || offset < total; offset += PAGE_SIZE) {
            Page<String> data = this.graphQlService.fetchIslCategories(offset, PAGE_SIZE);
            data.getItems().stream().map(slug -> buildPathSegments(slug, DETAIL_CATEGORY_PATH)).forEach(segments::add);
            total = data.getTotal();
        }
        return segments;
    }

    private List<String> getStoryPaths() {
        List<String> segments = new ArrayList<>();
        int total = -1;
        for (int offset = 0; total == -1 || offset < total; offset += PAGE_SIZE) {
            Page<String> data = this.graphQlService.fetchIslStories(offset, PAGE_SIZE);
            data.getItems().stream().map(slug -> buildPathSegments(slug, DETAIL_STORY_PATH)).forEach(segments::add);
            total = data.getTotal();
        }
        return segments;
    }

    private List<String> getTopicsPaths() {
        List<String> segments = new ArrayList<>();
        int total = -1;
        for (int offset = 0; total == -1 || offset < total; offset += PAGE_SIZE) {
            Page<String> data = this.graphQlService.fetchIslTopics(offset, PAGE_SIZE);
            data.getItems().stream().map(slug -> buildPathSegments(slug, DETAIL_TOPIC_PATH)).forEach(segments::add);
            total = data.getTotal();
        }
        return segments;
    }

    private String buildPathSegments(final String slug, final String detailPath) {
        return StringUtils.appendIfMissing(detailPath, "/") + slug;
    }
}
