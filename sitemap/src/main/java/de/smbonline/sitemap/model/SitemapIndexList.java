package de.smbonline.sitemap.model;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Model for a sitemaps sitemap-index.
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlRootElement(name = "sitemapindex", namespace = "http://www.sitemaps.org/schemas/sitemap/0.9")
public class SitemapIndexList {

    @XmlElement(name = "sitemap", type = SitemapIndex.class)
    private List<SitemapIndex> sitemap;

    public SitemapIndexList() {
        this.sitemap = new ArrayList<>();
    }

    public void addSitemapIndex(final SitemapIndex sitemapIndex) {
        this.sitemap.add(sitemapIndex);
    }

    public void addSitemapIndices(final List<SitemapIndex> sitemapIndices) {
        this.sitemap.addAll(sitemapIndices);
    }

    public List<SitemapIndex> getSitemap() {
        return this.sitemap;
    }

    public void setSitemap(final List<SitemapIndex> sitemap) {
        this.sitemap = sitemap;
    }
}
