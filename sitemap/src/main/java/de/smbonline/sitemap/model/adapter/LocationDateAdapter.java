package de.smbonline.sitemap.model.adapter;

import org.apache.commons.lang3.time.DateFormatUtils;

import javax.xml.bind.annotation.adapters.XmlAdapter;
import java.text.ParseException;
import java.util.Date;

/**
 * Adapter to convert dates of a sitemap XML.
 */
public class LocationDateAdapter extends XmlAdapter<String, Date> {

    /**
     * See {@link XmlAdapter#unmarshal(Object)}
     *
     * @param iso8601Date
     * @return
     * @throws ParseException
     */
    @Override
    public Date unmarshal(final String iso8601Date) throws ParseException {
        synchronized (DateFormatUtils.ISO_8601_EXTENDED_DATE_FORMAT) {
            return DateFormatUtils.ISO_8601_EXTENDED_DATE_FORMAT.parse(iso8601Date);
        }
    }

    /**
     * See {@link XmlAdapter#marshal(Object)}
     *
     * @param date
     * @return
     * @throws ParseException
     */
    @Override
    public String marshal(final Date date) throws ParseException {
        synchronized (DateFormatUtils.ISO_8601_EXTENDED_DATE_FORMAT) {
            return DateFormatUtils.ISO_8601_EXTENDED_DATE_FORMAT.format(date);
        }
    }
}
