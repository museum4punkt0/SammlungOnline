package de.smbonline.sitemap.service;

import de.smbonline.sitemap.config.SitemapConfig;
import de.smbonline.sitemap.graphql.GraphQlService;
import de.smbonline.sitemap.model.Page;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TopicDataService implements DataService {

    private static final String DETAIL_CATEGORY_PATH = "stories/";
    private static final String DETAIL_STORY_PATH = "story/";
    private static final String DETAIL_TOPIC_PATH = "topic/";
    private static final int PAGE_SIZE = 500;
    private final SitemapConfig.StrapiPlatform strapiPlatform;

    private final GraphQlService graphQlService;

    @Autowired
    public TopicDataService(final GraphQlService graphQlService, final SitemapConfig sitemapConfig) {
        this.graphQlService = graphQlService;
        this.strapiPlatform = sitemapConfig.getStrapiPlatform();
    }

    @Override
    public List<String> getPathSegments() {
        List<String> segments = new ArrayList<>();
        segments.addAll(getSmbCategoriesPaths());
        segments.addAll(getSmbStoryPaths());
        segments.addAll(getSmbTopicsPaths());
        segments.addAll(getHbfCategoriesPaths());
        segments.addAll(getHbfStoryPaths());
        segments.addAll(getHbfTopicsPaths());
        segments.addAll(getKgmCategoriesPaths());
        segments.addAll(getKgmStoryPaths());
        segments.addAll(getKgmTopicsPaths());
        return segments;
    }

    private List<String> getSmbCategoriesPaths() {
        List<String> ids = new ArrayList<>();
        int total = -1;
        for (int offset = 0; total == -1 || offset < total; offset += PAGE_SIZE) {
            Page<String> data = this.graphQlService.fetchSmbCategories(offset, PAGE_SIZE);
            ids.addAll(buildPathSegments(data.getItems(), this.strapiPlatform.getSmb(), DETAIL_CATEGORY_PATH));
            total = data.getTotal();
        }
        return ids;
    }

    private List<String> getSmbStoryPaths() {
        List<String> ids = new ArrayList<>();
        int total = -1;
        for (int offset = 0; total == -1 || offset < total; offset += PAGE_SIZE) {
            Page<String> data = this.graphQlService.fetchSmbStories(offset, PAGE_SIZE);
            ids.addAll(buildPathSegments(data.getItems(), this.strapiPlatform.getSmb(), DETAIL_STORY_PATH));
            total = data.getTotal();
        }
        return ids;
    }

    private List<String> getSmbTopicsPaths() {
        List<String> ids = new ArrayList<>();
        int total = -1;
        for (int offset = 0; total == -1 || offset < total; offset += PAGE_SIZE) {
            Page<String> data = this.graphQlService.fetchSmbTopics(offset, PAGE_SIZE);
            ids.addAll(buildPathSegments(data.getItems(), this.strapiPlatform.getSmb(), DETAIL_TOPIC_PATH));
            total = data.getTotal();
        }
        return ids;
    }

    private List<String> getHbfCategoriesPaths() {
        List<String> ids = new ArrayList<>();
        int total = -1;
        for (int offset = 0; total == -1 || offset < total; offset += PAGE_SIZE) {
            Page<String> data = this.graphQlService.fetchHbfCategories(offset, PAGE_SIZE);
            ids.addAll(buildPathSegments(data.getItems(), this.strapiPlatform.getHbf(), DETAIL_CATEGORY_PATH));
            total = data.getTotal();
        }
        return ids;
    }

    private List<String> getHbfStoryPaths() {
        List<String> ids = new ArrayList<>();
        int total = -1;
        for (int offset = 0; total == -1 || offset < total; offset += PAGE_SIZE) {
            Page<String> data = this.graphQlService.fetchHbfStories(offset, PAGE_SIZE);
            ids.addAll(buildPathSegments(data.getItems(), this.strapiPlatform.getHbf(), DETAIL_STORY_PATH));
            total = data.getTotal();
        }
        return ids;
    }

    private List<String> getHbfTopicsPaths() {
        List<String> ids = new ArrayList<>();
        int total = -1;
        for (int offset = 0; total == -1 || offset < total; offset += PAGE_SIZE) {
            Page<String> data = this.graphQlService.fetchHbfTopics(offset, PAGE_SIZE);
            ids.addAll(buildPathSegments(data.getItems(), this.strapiPlatform.getHbf(), DETAIL_TOPIC_PATH));
            total = data.getTotal();
        }
        return ids;
    }

    private List<String> getKgmCategoriesPaths() {
        List<String> ids = new ArrayList<>();
        int total = -1;
        for (int offset = 0; total == -1 || offset < total; offset += PAGE_SIZE) {
            Page<String> data = this.graphQlService.fetchKgmCategories(offset, PAGE_SIZE);
            ids.addAll(buildPathSegments(data.getItems(), this.strapiPlatform.getKgm(), DETAIL_CATEGORY_PATH));
            total = data.getTotal();
        }
        return ids;
    }

    private List<String> getKgmStoryPaths() {
        List<String> ids = new ArrayList<>();
        int total = -1;
        for (int offset = 0; total == -1 || offset < total; offset += PAGE_SIZE) {
            Page<String> data = this.graphQlService.fetchKgmStories(offset, PAGE_SIZE);
            ids.addAll(buildPathSegments(data.getItems(), this.strapiPlatform.getKgm(), DETAIL_STORY_PATH));
            total = data.getTotal();
        }
        return ids;
    }

    private List<String> getKgmTopicsPaths() {
        List<String> ids = new ArrayList<>();
        int total = -1;
        for (int offset = 0; total == -1 || offset < total; offset += PAGE_SIZE) {
            Page<String> data = this.graphQlService.fetchKgmTopics(offset, PAGE_SIZE);
            ids.addAll(buildPathSegments(data.getItems(), this.strapiPlatform.getKgm(), DETAIL_TOPIC_PATH));
            total = data.getTotal();
        }
        return ids;
    }

    private List<String> buildPathSegments(final List<String> slugs, final String platform, final String detailPath) {
        return slugs.stream().map(slug -> buildPathSegments(platform, detailPath, slug)).toList();
    }

    private String buildPathSegments(final String platform, final String detailPath, final String slug) {
        return StringUtils.appendIfMissing(platform, "/") + StringUtils.appendIfMissing(detailPath, "/") + slug;
    }
}
