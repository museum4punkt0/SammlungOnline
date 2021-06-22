package de.smbonline.sitemap.service;

import de.smbonline.sitemap.graphql.queries.fragment.ObjectData;
import de.smbonline.sitemap.sitemap.graphql.GraphQlService;
import de.smbonline.sitemap.sitemap.graphql.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResearchDataService implements DataService {

    private static final String DETAIL_PATH = "detail/";
    private static final int PAGE_SIZE = 50000;

    private final GraphQlService graphQlService;

    @Autowired
    public ResearchDataService(final GraphQlService graphQlService) {
        this.graphQlService = graphQlService;
    }

    @Override
    public List<String> getIds() {
        List<String> ids = new ArrayList<>();
        int total = -1;
        for (int offset = 0; total == -1 || offset < total; offset += PAGE_SIZE) {
            Page<ObjectData> data = this.graphQlService.fetchObjects(offset, PAGE_SIZE);
            ids.addAll(data.getItems().stream().parallel().map(this::buildIdSegment).collect(Collectors.toList()));
            total = data.getTotal();
        }
        return ids;
    }

    private String buildIdSegment(final ObjectData item) {
        StringBuilder sb = new StringBuilder(DETAIL_PATH);
        sb.append(item.getId().toString());
// TODO no titles available yet
//        item.getTitles().stream().findFirst().ifPresent(title -> {
//            if (!StringUtils.isBlank(title.getValue())) {
//                sb.append("/").append(URLEncoder.encode(title.getValue(), StandardCharsets.UTF_8));
//            }
//        });
        return sb.toString();
    }
}
