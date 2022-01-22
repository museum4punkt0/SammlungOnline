package de.smbonline.sitemap.service;

import de.smbonline.sitemap.graphql.queries.fragment.TopicData;
import de.smbonline.sitemap.sitemap.graphql.GraphQlService;
import de.smbonline.sitemap.sitemap.graphql.Page;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TopicDataService implements DataService {

    private static final String DETAIL_PATH = "collections/";
    private static final int PAGE_SIZE = 50000;

    private final GraphQlService graphQlService;

    @Autowired
    public TopicDataService(final GraphQlService graphQlService) {
        this.graphQlService = graphQlService;
    }

    @Override
    public List<String> getIds() {
        List<String> ids = new ArrayList<>();
        int total = -1;
        for (int offset = 0; total == -1 || offset < total; offset += PAGE_SIZE) {
            Page<TopicData> data = this.graphQlService.fetchTopics(offset, PAGE_SIZE);
            ids.addAll(data.getItems().stream().parallel().map(this::buildIdSegment).collect(Collectors.toList()));
            total = data.getTotal();
        }
        return ids;
    }

    private String buildIdSegment(final TopicData item) {
        StringBuilder sb = new StringBuilder(DETAIL_PATH);
        sb.append(item.getId().toString());
        item.getTitles().stream()
                .filter(title -> !StringUtils.isBlank(title.getValue()))
                .findFirst()
                .ifPresent(title -> {
                    String encodedTitle = URLEncoder.encode(title.getValue(), StandardCharsets.UTF_8);
                    sb.append("/").append(encodedTitle);
                });
        return sb.toString();
    }
}
