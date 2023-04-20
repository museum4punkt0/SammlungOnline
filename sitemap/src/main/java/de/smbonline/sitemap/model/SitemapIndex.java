package de.smbonline.sitemap.model;

import java.util.Date;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import de.smbonline.sitemap.model.adapter.LocationDateAdapter;

/**
 * Model for a sitemaps index sitemap entry.
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "", propOrder = { "location", "lastModification" })
@XmlRootElement(name = "sitemap", namespace = "http://www.sitemaps.org/schemas/sitemap/0.9")
public class SitemapIndex {

    @XmlElement(required = true, name = "loc")
    private String location;

    @XmlElement(name = "lastmod")
    @XmlJavaTypeAdapter(LocationDateAdapter.class)
    private Date lastModification;

    public String getLocation() {
        return this.location;
    }

    public void setLocation(final String location) {
        this.location = location;
    }

    public Date getLastModification() {
        return this.lastModification;
    }

    public void setLastModification(final Date lastModification) {
        this.lastModification = lastModification;
    }
}
