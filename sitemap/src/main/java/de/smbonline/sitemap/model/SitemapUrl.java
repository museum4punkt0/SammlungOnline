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
 * Model for a sitemaps url entry.
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "", propOrder = {
    "location",
    "lastModification",
    "changeFrequency",
    "priority"
})
@XmlRootElement(name = "url", namespace = "http://www.sitemaps.org/schemas/sitemap/0.9")
public class SitemapUrl {

    @XmlElement(required = true, name = "loc")
    private String location;

    @XmlElement(name = "lastmod")
    @XmlJavaTypeAdapter(LocationDateAdapter.class)
    private Date lastModification;

    @XmlElement(name = "changefreq")
    private ChangeFrequency changeFrequency;

    @XmlElement(name = "priority")
    private float priority = 0.5f;

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

    public ChangeFrequency getChangeFrequency() {
        return this.changeFrequency;
    }

    public void setChangeFrequency(final ChangeFrequency changeFrequency) {
        this.changeFrequency = changeFrequency;
    }

    public float getPriority() {
        return this.priority;
    }

    public void setPriority(final float priority) {
        this.priority = priority;
    }
}
