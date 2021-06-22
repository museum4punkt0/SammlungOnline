package de.smbonline.sitemap.model;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Model for a sitemaps url-set.
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlRootElement(name = "urlset", namespace = "http://www.sitemaps.org/schemas/sitemap/0.9")
public class SitemapUrlSet {

    @XmlElement(name = "url", type = SitemapUrl.class)
    private List<SitemapUrl> urls;

    public SitemapUrlSet() {
        this.urls = new ArrayList<>();
    }

    public void addUrl(final SitemapUrl url) {
        this.urls.add(url);
    }

    public void addUrls(final List<SitemapUrl> urls) {
        this.urls.addAll(urls);
    }

    public List<SitemapUrl> getUrls() {
        return this.urls;
    }

    public void setUrls(final List<SitemapUrl> urls) {
        this.urls = urls;
    }
}
