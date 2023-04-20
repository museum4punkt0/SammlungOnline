--
-- PostgreSQL database scheme
--

-- Extension for uuids
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
-- Extension for operators
CREATE extension IF NOT EXISTS pg_trgm WITH SCHEMA public;

CREATE SCHEMA smb;
ALTER SCHEMA smb OWNER TO "smb-db-user";

SET default_tablespace = '';
SET default_table_access_method = heap;



--
-- Name: sync_triggers; Type: TABLE; Schema: smb; Owner: smb-db-user
--
CREATE TABLE smb.sync_triggers (
    entity_type text NOT NULL,
    keys text[] NOT NULL DEFAULT '{}',
    keys_type text NOT NULL DEFAULT 'IDs',
    CONSTRAINT sync_triggers_pkey PRIMARY KEY (entity_type)
);
ALTER TABLE smb.sync_triggers OWNER TO "smb-db-user";
COMMENT ON TABLE smb.sync_triggers IS 'Enter comma-separated identifiers in the keys column, enclosed by {} and then run the desired trigger function.';


--
-- Name: language; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.language_id_seq
    START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE smb.language_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.language (
    id BIGINT NOT NULL DEFAULT nextval('smb.language_id_seq'::regclass),
    lang text NOT NULL,
    sync_enabled BOOLEAN DEFAULT false,
    CONSTRAINT language_pkey PRIMARY KEY (id),
    CONSTRAINT language_lang_ukey UNIQUE (lang)
);
ALTER TABLE smb.language OWNER TO "smb-db-user";
COMMENT ON TABLE smb.language IS 'Multilanguage support';

ALTER SEQUENCE smb.language_id_seq OWNED BY smb.language.id;

CREATE INDEX language_lang_idx ON smb.language USING btree (lang ASC NULLS LAST) TABLESPACE pg_default;


--
-- Name: thesaurus; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.thesaurus_id_seq
    START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE smb.thesaurus_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.thesaurus (
    id BIGINT NOT NULL DEFAULT nextval('smb.thesaurus_id_seq'::regclass),
    parent_id BIGINT,
    mds_id BIGINT NOT NULL,
    name text,
    type text NOT NULL,
    instance text NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    CONSTRAINT thesaurus_pkey PRIMARY KEY (id),
    CONSTRAINT thesaurus_ukey UNIQUE (mds_id, type),
    CONSTRAINT thesaurus_parent_id_fkey FOREIGN KEY (parent_id) 
        REFERENCES smb.thesaurus(id) ON UPDATE CASCADE ON DELETE SET NULL
);
ALTER TABLE smb.thesaurus OWNER TO "smb-db-user";
COMMENT ON TABLE smb.thesaurus IS 'thesaurus';

ALTER SEQUENCE smb.thesaurus_id_seq OWNED BY smb.thesaurus.id;

CREATE INDEX thesaurus_parent_idx ON smb.thesaurus USING btree (parent_id ASC NULLS FIRST) TABLESPACE pg_default;
CREATE INDEX thesaurus_name_idx ON smb.thesaurus USING btree (name ASC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX thesaurus_type_idx ON smb.thesaurus USING btree (type ASC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX thesaurus_instance_idx ON smb.thesaurus USING btree (instance ASC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX thesaurus_mdsid_idx ON smb.thesaurus USING btree (mds_id ASC NULLS LAST) TABLESPACE pg_default;


--
-- Name: thesaurus_translations; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.thesaurus_translations_id_seq
    START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE smb.thesaurus_translations_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.thesaurus_translations (
    id BIGINT NOT NULL DEFAULT nextval('smb.thesaurus_translations_id_seq'::regclass),
    thesaurus_id BIGINT NOT NULL,
    language_id BIGINT NOT NULL,
    value text,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    CONSTRAINT thesaurus_translations_pkey PRIMARY KEY (id),
    CONSTRAINT thesaurus_translations_thesaurus_id_fkey FOREIGN KEY (thesaurus_id) 
        REFERENCES smb.thesaurus(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT thesaurus_translations_language_id_fkey FOREIGN KEY (language_id) 
        REFERENCES smb.language(id) ON UPDATE CASCADE ON DELETE RESTRICT
);
ALTER TABLE smb.thesaurus_translations OWNER TO "smb-db-user";
COMMENT ON TABLE smb.thesaurus_translations IS 'language specific display values for thesaurus entries';

ALTER SEQUENCE smb.thesaurus_translations_id_seq OWNED BY smb.thesaurus_translations.id;

CREATE INDEX thesaurus_translations_value_idx ON smb.thesaurus_translations USING gin (value public.gin_trgm_ops);
CREATE INDEX thesaurus_translations_thesaurus_idx ON smb.thesaurus_translations USING btree (thesaurus_id ASC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX thesaurus_translations_language_idx ON smb.thesaurus_translations USING btree (language_id ASC NULLS LAST) TABLESPACE pg_default;


--
-- Name: objects; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE TABLE smb.objects (
    id BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    exhibition_space text,
    CONSTRAINT objects_pkey PRIMARY KEY (id)
);
ALTER TABLE smb.objects OWNER TO "smb-db-user";
COMMENT ON TABLE smb.objects IS 'SMB objects fetched from MDS';


--
-- Name: geographical_references; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.geographical_references_id_seq
    START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE smb.geographical_references_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.geographical_references (
    id BIGINT NOT NULL DEFAULT nextval('smb.geographical_references_id_seq'::regclass),
    object_id BIGINT NOT NULL,
    geo_item_id BIGINT NOT NULL,
    language_id BIGINT NOT NULL,
    geopol_voc_id BIGINT,
    place_voc_id BIGINT,
    role_voc_id BIGINT,
    type_voc_id BIGINT,
    sequence INTEGER NOT NULL,
    details text,
    CONSTRAINT geographical_references_pkey PRIMARY KEY (id),
    CONSTRAINT geographical_references_object_id_fkey FOREIGN KEY (object_id) 
        REFERENCES smb.objects(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT geographical_references_language_id_fkey FOREIGN KEY (language_id) 
        REFERENCES smb.language(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT geographical_references_geopol_id_fkey FOREIGN KEY (geopol_voc_id) 
        REFERENCES smb.thesaurus(id) ON UPDATE CASCADE ON DELETE SET NULL,
    CONSTRAINT geographical_references_place_id_fkey FOREIGN KEY (place_voc_id) 
        REFERENCES smb.thesaurus(id) ON UPDATE CASCADE ON DELETE SET NULL,
    CONSTRAINT geographical_references_role_id_fkey FOREIGN KEY (role_voc_id) 
        REFERENCES smb.thesaurus(id) ON UPDATE CASCADE ON DELETE SET NULL,
    CONSTRAINT geographical_references_type_id_fkey FOREIGN KEY (type_voc_id) 
        REFERENCES smb.thesaurus(id) ON UPDATE CASCADE ON DELETE SET NULL
);
ALTER TABLE smb.geographical_references OWNER TO "smb-db-user";
COMMENT ON TABLE smb.geographical_references IS 'geographic locations collected from repeatable group items';

ALTER SEQUENCE smb.geographical_references_id_seq OWNED BY smb.geographical_references.id;

CREATE INDEX geographical_references_object_idx ON smb.geographical_references USING btree (object_id ASC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX geographical_references_geo_item_idx ON smb.geographical_references USING btree (geo_item_id ASC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX geographical_references_language_idx ON smb.geographical_references USING btree (language_id ASC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX geographical_references_geopol_idx ON smb.geographical_references USING btree (geopol_voc_id ASC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX geographical_references_place_id_idx ON smb.geographical_references USING btree (place_voc_id ASC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX geographical_references_role_id_idx ON smb.geographical_references USING btree (role_voc_id ASC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX geographical_references_type_id_idx ON smb.geographical_references USING btree (type_voc_id ASC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX geographical_references_details_idx ON smb.geographical_references USING gin (details public.gin_trgm_ops);
CREATE INDEX geographical_references_sequence_idx ON smb.geographical_references USING btree (sequence ASC NULLS LAST) TABLESPACE pg_default;



--
-- Name: material_references; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.material_references_id_seq
    START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE smb.material_references_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.material_references (
    id BIGINT NOT NULL DEFAULT nextval('smb.material_references_id_seq'::regclass),
    object_id BIGINT NOT NULL,
    material_item_id BIGINT NOT NULL,
    language_id BIGINT NOT NULL,
    specific_type_voc_id BIGINT,
    type_voc_id BIGINT,
    sequence INTEGER NOT NULL,
    details text,
    CONSTRAINT material_references_pkey PRIMARY KEY (id),
    CONSTRAINT material_references_object_id_fkey FOREIGN KEY (object_id) 
        REFERENCES smb.objects(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT material_references_language_id_fkey FOREIGN KEY (language_id) 
        REFERENCES smb.language(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT material_references_specific_type_id_fkey FOREIGN KEY (specific_type_voc_id) 
        REFERENCES smb.thesaurus(id) ON UPDATE CASCADE ON DELETE SET NULL,
    CONSTRAINT material_references_type_id_fkey FOREIGN KEY (type_voc_id) 
        REFERENCES smb.thesaurus(id) ON UPDATE CASCADE ON DELETE SET NULL
);
ALTER TABLE smb.material_references OWNER TO "smb-db-user";
COMMENT ON TABLE smb.material_references IS 'materials and techniques collected from repeatable group items';

ALTER SEQUENCE smb.material_references_id_seq OWNED BY smb.material_references.id;

CREATE INDEX material_references_object_idx ON smb.material_references USING btree (object_id ASC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX material_references_material_item_idx ON smb.material_references USING btree (material_item_id ASC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX material_references_language_idx ON smb.material_references USING btree (language_id ASC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX material_references_specific_type_id_idx ON smb.material_references USING btree (specific_type_voc_id ASC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX material_references_type_id_idx ON smb.material_references USING btree (type_voc_id ASC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX material_references_details_idx ON smb.material_references USING gin (details public.gin_trgm_ops);
CREATE INDEX material_references_sequence_idx ON smb.material_references USING btree (sequence ASC NULLS LAST) TABLESPACE pg_default;


--
-- Name: attributes; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE TABLE smb.attributes (
    key text NOT NULL,
    datatype text NOT NULL,
    CONSTRAINT attributes_pkey PRIMARY KEY (key)
);
ALTER TABLE smb.attributes OWNER TO "smb-db-user";
COMMENT ON TABLE smb.attributes IS 'Attributes fetched from MDS';


--
-- Name: attribute_translations; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.attribute_translations_id_seq
    START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE smb.attribute_translations_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.attribute_translations (
    id BIGINT NOT NULL DEFAULT nextval('smb.attribute_translations_id_seq'::regclass),
    object_id BIGINT NOT NULL,
    attribute_key text NOT NULL,
    value text,
    visible BOOLEAN NOT NULL DEFAULT true,
    fq_key text NOT NULL,
    language_id BIGINT NOT NULL,
    CONSTRAINT attribute_translations_pkey PRIMARY KEY (id),
    CONSTRAINT attribute_translations_attribute_key_fkey FOREIGN KEY (attribute_key) 
        REFERENCES smb.attributes(key) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT attribute_translations_object_id_fkey FOREIGN KEY (object_id) 
        REFERENCES smb.objects(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT attribute_translations_language_id_fkey FOREIGN KEY (language_id) 
        REFERENCES smb.language(id) ON UPDATE CASCADE ON DELETE RESTRICT
);
ALTER TABLE smb.attribute_translations OWNER TO "smb-db-user";
COMMENT ON TABLE smb.attribute_translations IS 'Attribute values of SMB objects';

ALTER SEQUENCE smb.attribute_translations_id_seq OWNED BY smb.attribute_translations.id;

CREATE INDEX attribute_translations_value_idx ON smb.attribute_translations USING gin (value public.gin_trgm_ops);
CREATE INDEX attribute_translations_attribute_idx ON smb.attribute_translations USING btree (attribute_key ASC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX attribute_translations_visible_idx ON smb.attribute_translations USING btree (visible DESC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX attribute_translations_object_idx ON smb.attribute_translations USING btree (object_id ASC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX attribute_translations_language_idx ON smb.attribute_translations USING btree (language_id ASC NULLS LAST) TABLESPACE pg_default;


--
-- Name: collections; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE TABLE smb.collections (
    key text NOT NULL,
    comment text NOT NULL,
    CONSTRAINT collections_pkey PRIMARY KEY (key)
);
ALTER TABLE smb.collections OWNER TO "smb-db-user";
COMMENT ON TABLE smb.collections IS 'Enum type definition of MDS collection keys';

--
-- Name: attribute_approval; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.attribute_approval_id_seq
    START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE smb.attribute_approval_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.attribute_approval (
    id BIGINT NOT NULL DEFAULT nextval('smb.attribute_approval_id_seq'::regclass),
    attribute_key text NOT NULL,
--    AKu BOOLEAN DEFAULT NULL,
--    AMP BOOLEAN DEFAULT NULL,
--    ANT BOOLEAN DEFAULT NULL,
--    EM  BOOLEAN DEFAULT NULL,
--    GF  BOOLEAN DEFAULT NULL,
--    GG  BOOLEAN DEFAULT NULL,
--    IFM BOOLEAN DEFAULT NULL,
--    ISL BOOLEAN DEFAULT NULL,
--    KB  BOOLEAN DEFAULT NULL,
--    KGM BOOLEAN DEFAULT NULL,
--    KK  BOOLEAN DEFAULT NULL,
--    MEK BOOLEAN DEFAULT NULL,
--    MIM BOOLEAN DEFAULT NULL,
--    MK  BOOLEAN DEFAULT NULL,
--    MSB BOOLEAN DEFAULT NULL,
--    MVF BOOLEAN DEFAULT NULL,
--    NG  BOOLEAN DEFAULT NULL,
--    RaO BOOLEAN DEFAULT NULL,
--    SBM BOOLEAN DEFAULT NULL,
--    SKS BOOLEAN DEFAULT NULL,
--    VAM BOOLEAN DEFAULT NULL,
--    ZA  BOOLEAN DEFAULT NULL,
    CONSTRAINT attribute_approval_pkey PRIMARY KEY (id),
    CONSTRAINT attribute_approval_attribute_key_ukey UNIQUE (attribute_key),
    CONSTRAINT attribute_approval_attribute_key_fkey FOREIGN KEY (attribute_key) 
        REFERENCES smb.attributes(key) ON UPDATE CASCADE ON DELETE CASCADE
);
ALTER TABLE smb.attribute_approval OWNER TO "smb-db-user";
COMMENT ON TABLE smb.attribute_approval IS 'Publishing approvals for attributes fetched from MDS; each value from smb.collections is represented as column';

ALTER SEQUENCE smb.attribute_approval_id_seq OWNED BY smb.attribute_approval.id;


--
-- Name: persons; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE TABLE smb.persons (
    id BIGINT NOT NULL,
    name text,
    date_of_birth text,
    date_of_death text,
    date_range text,
    normdata1 text,
    normdata2 text,
    normdata3 text,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    CONSTRAINT persons_pkey PRIMARY KEY (id)
);
ALTER TABLE smb.persons OWNER TO "smb-db-user";
COMMENT ON TABLE smb.persons IS 'persons';

CREATE INDEX persons_name_idx ON smb.persons USING gin (name public.gin_trgm_ops);


--
-- Name: persons_objects; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.persons_objects_id_seq
    START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE smb.persons_objects_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.persons_objects (
    id BIGINT NOT NULL DEFAULT nextval('smb.persons_objects_id_seq'::regclass),
    person_id BIGINT NOT NULL,
    object_id BIGINT NOT NULL,
    role_voc_id BIGINT,
    sequence INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    CONSTRAINT persons_objects_pkey PRIMARY KEY (id),
    CONSTRAINT persons_objects_object_id_fkey FOREIGN KEY (object_id) 
        REFERENCES smb.objects(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT persons_objects_person_id_fkey FOREIGN KEY (person_id) 
        REFERENCES smb.persons(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT persons_objects_role_voc_id_fkey FOREIGN KEY (role_voc_id) 
        REFERENCES smb.thesaurus(id) ON UPDATE CASCADE ON DELETE SET NULL
);
ALTER TABLE smb.persons_objects OWNER TO "smb-db-user";
COMMENT ON TABLE smb.persons_objects IS 'involved parties; persons who are stakeholders on objects';

ALTER SEQUENCE smb.persons_objects_id_seq OWNED BY smb.persons_objects.id;

CREATE INDEX persons_objects_person_id_idx ON smb.persons_objects USING btree (person_id ASC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX persons_objects_object_id_idx ON smb.persons_objects USING btree (object_id ASC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX persons_objects_role_voc_id_idx ON smb.persons_objects USING btree (role_voc_id ASC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX persons_objects_sequence_idx ON smb.persons_objects USING btree (sequence ASC NULLS LAST) TABLESPACE pg_default;


--
-- Name: exhibitions; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE TABLE smb.exhibitions (
    id BIGINT NOT NULL,
    title text,
    location text,
    description text,
    start_date text,
    end_date text,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    CONSTRAINT exhibitions_pkey PRIMARY KEY (id)
);
ALTER TABLE smb.exhibitions OWNER TO "smb-db-user";
COMMENT ON TABLE smb.exhibitions IS 'exhibitions';

CREATE INDEX exhibitions_title_idx ON smb.exhibitions USING gin (title public.gin_trgm_ops);
CREATE INDEX exhibitions_location_idx ON smb.exhibitions USING gin (location public.gin_trgm_ops);


--
-- Name: exhibitions_objects; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.exhibitions_objects_id_seq
    START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE smb.exhibitions_objects_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.exhibitions_objects (
    id BIGINT NOT NULL DEFAULT nextval('smb.exhibitions_objects_id_seq'::regclass),
    exhibition_id BIGINT NOT NULL,
    object_id BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    CONSTRAINT exhibitions_objects_pkey PRIMARY KEY (id),
    CONSTRAINT exhibitions_objects_object_id_fkey FOREIGN KEY (object_id) 
        REFERENCES smb.objects(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT exhibitions_objects_exhibition_id_fkey FOREIGN KEY (exhibition_id) 
        REFERENCES smb.exhibitions(id) ON UPDATE CASCADE ON DELETE CASCADE
);
ALTER TABLE smb.exhibitions_objects OWNER TO "smb-db-user";
COMMENT ON TABLE smb.exhibitions_objects IS 'Linkage of exhibitions and objects';

ALTER SEQUENCE smb.exhibitions_objects_id_seq OWNED BY smb.exhibitions_objects.id;

CREATE INDEX exhibitions_objects_exhibition_id_idx ON smb.exhibitions_objects USING btree (exhibition_id ASC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX exhibitions_objects_object_id_idx ON smb.exhibitions_objects USING btree (object_id ASC NULLS LAST) TABLESPACE pg_default;


--
-- Name: assortments; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.assortments_id_seq
    START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE smb.assortments_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.assortments (
    id BIGINT NOT NULL DEFAULT nextval('smb.assortments_id_seq'::regclass),
    key text NOT NULL,
    preview_image text,
    search_query text DEFAULT NULL,
    search_query_type text NOT NULL,
    CONSTRAINT assortments_pkey PRIMARY KEY (id),
    CONSTRAINT assortments_key_ukey UNIQUE (key)
);
ALTER TABLE smb.assortments OWNER TO "smb-db-user";
COMMENT ON TABLE smb.assortments IS 'search-collections';

ALTER SEQUENCE smb.assortments_id_seq OWNED BY smb.assortments.id;

CREATE INDEX assortments_key_idx ON smb.assortments USING btree (key ASC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX assortments_search_query_type_idx ON smb.assortments USING btree (search_query_type ASC NULLS LAST) TABLESPACE pg_default;


--
-- Name: assortments_objects; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.assortments_objects_id_seq
    START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE smb.assortments_objects_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.assortments_objects (
    id BIGINT NOT NULL DEFAULT nextval('smb.assortments_objects_id_seq'::regclass),
    assortment_id BIGINT NOT NULL,
    object_id BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    CONSTRAINT assortments_objects_pkey PRIMARY KEY (id),
    CONSTRAINT assortments_objects_object_id_fkey FOREIGN KEY (object_id) 
        REFERENCES smb.objects(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT assortments_objects_assortment_id_fkey FOREIGN KEY (assortment_id) 
        REFERENCES smb.assortments(id) ON UPDATE CASCADE ON DELETE CASCADE
);
ALTER TABLE smb.assortments_objects OWNER TO "smb-db-user";
COMMENT ON TABLE smb.assortments_objects IS 'Assignment of SMB objects to assortments';

ALTER SEQUENCE smb.assortments_objects_id_seq OWNED BY smb.assortments_objects.id;


--
-- Name: assortments_translation; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.assortments_translation_id_seq
    START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE smb.assortments_translation_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.assortments_translation (
    id BIGINT NOT NULL DEFAULT nextval('smb.assortments_translation_id_seq'::regclass),
    assortment_id BIGINT NOT NULL,
    title text NOT NULL,
    subtitle text,
    abstract text,
    description text,
    language_id BIGINT NOT NULL,
    CONSTRAINT assortments_translation_pkey PRIMARY KEY (id),
    CONSTRAINT assortments_translation_assortment_id_fkey FOREIGN KEY (assortment_id) 
        REFERENCES smb.assortments(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT assortments_translation_language_id_fkey FOREIGN KEY (language_id) 
        REFERENCES smb.language(id) ON UPDATE CASCADE ON DELETE RESTRICT
);
ALTER TABLE smb.assortments_translation OWNER TO "smb-db-user";

ALTER SEQUENCE smb.assortments_translation_id_seq OWNED BY smb.assortments_translation.id;

CREATE INDEX assortments_translations_title_idx ON smb.assortments_translation USING gin (title public.gin_trgm_ops);
CREATE INDEX assortments_translations_language_idx ON smb.assortments_translation USING btree (language_id ASC NULLS LAST) TABLESPACE pg_default;


--
-- Name: licenses; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.licenses_id_seq
    START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE smb.licenses_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.licenses (
    id BIGINT NOT NULL DEFAULT nextval('smb.licenses_id_seq'::regclass),
    key text NOT NULL,
    link text,
    CONSTRAINT licenses_pkey PRIMARY KEY (id),
    CONSTRAINT licenses_key_ukey UNIQUE (key)
);
ALTER TABLE smb.licenses OWNER TO "smb-db-user";
COMMENT ON TABLE smb.licenses IS 'License deeds for attachments';

ALTER SEQUENCE smb.licenses_id_seq OWNED BY smb.licenses.id;


--
-- Name: licenses_translation; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.licenses_translation_id_seq
    START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE smb.licenses_translation_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.licenses_translation (
    id BIGINT NOT NULL DEFAULT nextval('smb.licenses_translation_id_seq'::regclass),
    content text NOT NULL,
    license_id BIGINT NOT NULL,
    language_id BIGINT NOT NULL,
    license_text text,
    CONSTRAINT licenses_translation_pkey PRIMARY KEY (id),
    CONSTRAINT licenses_translation_language_id_fkey FOREIGN KEY (language_id) 
        REFERENCES smb.language(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT licenses_translation_license_id_fkey FOREIGN KEY (license_id) 
        REFERENCES smb.licenses(id) ON UPDATE CASCADE ON DELETE CASCADE
);
ALTER TABLE smb.licenses_translation OWNER TO "smb-db-user";

ALTER SEQUENCE smb.licenses_translation_id_seq OWNED BY smb.licenses_translation.id;

CREATE INDEX licenses_translations_language_idx ON smb.licenses_translation USING btree (language_id ASC NULLS LAST) TABLESPACE pg_default;


--
-- Name: attachments; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE TABLE smb.attachments (
    id BIGINT NOT NULL,
    attachment text NOT NULL,
    "primary" BOOLEAN DEFAULT false,
    object_id BIGINT NOT NULL,
    license_id BIGINT,
    credits text,
    media_type text DEFAULT 'IMAGE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    CONSTRAINT attachments_pkey PRIMARY KEY (id),
    CONSTRAINT attachments_filename_ukey UNIQUE (attachment),
    CONSTRAINT attachments_object_id_fkey FOREIGN KEY (object_id) 
        REFERENCES smb.objects(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT attachments_license_id_fkey FOREIGN KEY (license_id) 
        REFERENCES smb.licenses(id) ON UPDATE CASCADE ON DELETE SET NULL
);
ALTER TABLE smb.attachments OWNER TO "smb-db-user";
COMMENT ON TABLE smb.attachments IS 'Attachments of SMB objects fetched from MDS';

CREATE INDEX attachments_media_type_idx ON smb.attachments USING btree (media_type ASC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX attachments_primary_idx ON smb.attachments USING btree ("primary" DESC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX attachments_object_id_idx ON smb.attachments USING btree (object_id ASC NULLS LAST) TABLESPACE pg_default;



--
-- Name: org_unit; Type: TABLE; Schema: smb; Owner: smb-db-user
--
CREATE SEQUENCE smb.org_unit_id_seq
    START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE smb.org_unit_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.org_unit (
    id BIGINT NOT NULL DEFAULT nextval('smb.org_unit_id_seq'::regclass),
    name text NOT NULL,
    CONSTRAINT org_unit_pkey PRIMARY KEY (id),
    CONSTRAINT org_unit_name_ukey UNIQUE (name)
);
ALTER TABLE smb.org_unit OWNER TO "smb-db-user";
COMMENT ON TABLE smb.org_unit IS 'Org-units fetched from MDS, used to group SMB objects';
ALTER SEQUENCE smb.org_unit_id_seq OWNED BY smb.org_unit.id;


--
-- Name: highlights; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.highlights_id_seq
    START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE smb.highlights_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.highlights (
    id BIGINT NOT NULL DEFAULT nextval('smb.highlights_id_seq'::regclass),
    org_unit_id BIGINT NOT NULL,
    object_id BIGINT NOT NULL,
    CONSTRAINT highlights_pkey PRIMARY KEY (id),
    CONSTRAINT highlights_object_id_fkey FOREIGN KEY (object_id) 
        REFERENCES smb.objects(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT highlights_org_unit_id_fkey FOREIGN KEY (org_unit_id) 
        REFERENCES smb.org_unit(id) ON UPDATE CASCADE ON DELETE CASCADE
);
ALTER TABLE smb.highlights OWNER TO "smb-db-user";
COMMENT ON TABLE smb.highlights IS 'SMB highlight objects';

ALTER SEQUENCE smb.highlights_id_seq OWNED BY smb.highlights.id;

CREATE INDEX highlights_object_id_idx ON smb.highlights USING btree (object_id ASC NULLS LAST) TABLESPACE pg_default;


--
-- Name: ignoreable_keys; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.ignoreable_keys_id_seq
    START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE smb.ignoreable_keys_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.ignoreable_keys (
    id BIGINT NOT NULL DEFAULT nextval('smb.ignoreable_keys_id_seq'::regclass),
    key text NOT NULL,
    CONSTRAINT ignoreable_keys_pkey PRIMARY KEY (id),
    CONSTRAINT ignoreable_keys_key_ukey UNIQUE (key)
);
ALTER TABLE smb.ignoreable_keys OWNER TO "smb-db-user";
COMMENT ON TABLE smb.ignoreable_keys IS 'Attribute keys that should be ignored during import from MDS';

ALTER SEQUENCE smb.ignoreable_keys_id_seq OWNED BY smb.ignoreable_keys.id;


---
--- Name: sync_cycle_type; Type: TABLE; Schema: smb; Owner: smb-db-user
---

CREATE TABLE smb.sync_cycle_type
(
    value text NOT NULL,
    comment text,
    CONSTRAINT isync_cycle_type_pkey PRIMARY KEY (value)
);
ALTER TABLE smb.sync_cycle_type OWNER to "smb-db-user";
COMMENT ON TABLE smb.sync_cycle_type IS 'Enum type definition for sync-cycles';


--
-- Name: sync_cycles; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.sync_cycles_id_seq
    START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE smb.sync_cycles_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.sync_cycles (
    id BIGINT NOT NULL DEFAULT nextval('smb.sync_cycles_id_seq'::regclass),
    type text NOT NULL DEFAULT 'INCREMENTAL',
    module text DEFAULT NULL,
    "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL,
    succeeded_ids BIGINT[] DEFAULT NULL,
    failed_ids BIGINT[] DEFAULT NULL,
    skipped_ids BIGINT[] DEFAULT NULL,
    debug_information text NOT NULL,
    CONSTRAINT sync_cycles_pkey PRIMARY KEY (id),
    CONSTRAINT sync_cycle_type_fkey FOREIGN KEY (type) 
        REFERENCES smb.sync_cycle_type ON UPDATE CASCADE ON DELETE CASCADE
);
ALTER TABLE smb.sync_cycles OWNER TO "smb-db-user";
COMMENT ON TABLE smb.sync_cycles IS 'Enum type definition for sync-cycles';

ALTER SEQUENCE smb.sync_cycles_id_seq OWNED BY smb.sync_cycles.id;


--
-- Name: stt_platform; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE TABLE smb.stt_platform (
    value text NOT NULL,
    comment text,
    CONSTRAINT stt_platform_pkey PRIMARY KEY (value)
);
ALTER TABLE smb.stt_platform OWNER TO "smb-db-user";
COMMENT ON TABLE smb.stt_platform IS 'Enum type definition for STT platforms';


--
-- Name: stt_platform_config; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.stt_platform_config_id_seq
    START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE smb.stt_platform_config_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.stt_platform_config (
    id BIGINT NOT NULL DEFAULT nextval('smb.stt_platform_config_id_seq'::regclass),
    platform_key text NOT NULL,
    link_template text NOT NULL,
    hide_in_overview BOOLEAN DEFAULT false,
    hero_slider_limit INTEGER DEFAULT 10 NOT NULL,
    enable_story_filter BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    CONSTRAINT stt_platform_config_pkey PRIMARY KEY (id),
    CONSTRAINT stt_platform_config_ukey UNIQUE (platform_key),
    CONSTRAINT stt_platform_fkey FOREIGN KEY (platform_key) 
        REFERENCES smb.stt_platform(value) ON UPDATE CASCADE ON DELETE CASCADE
);
ALTER TABLE smb.stt_platform_config OWNER TO "smb-db-user";
COMMENT ON TABLE smb.stt_platform_config IS 'STT platform configuration';

CREATE INDEX stt_platform_config_key_idx ON smb.stt_platform_config USING btree (platform_key ASC NULLS LAST) TABLESPACE pg_default;

--
-- Name: user_role; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.user_role_id_seq
    AS INTEGER
    START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE smb.user_role_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.user_role (
    id BIGINT NOT NULL DEFAULT nextval('smb.user_role_id_seq'::regclass),
    role text NOT NULL,
    CONSTRAINT user_role_pkey PRIMARY KEY (id),
    CONSTRAINT user_role_role_ukey UNIQUE (role)
);
ALTER TABLE smb.user_role OWNER TO "smb-db-user";
COMMENT ON TABLE smb.user_role IS 'Roles';

ALTER SEQUENCE smb.user_role_id_seq OWNED BY smb.user_role.id;


--
-- Name: user; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE TABLE smb.user (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    editor_scope text,
    role_id INTEGER,
    CONSTRAINT user_pkey PRIMARY KEY (id),
    CONSTRAINT user_email_ukey UNIQUE (email),
    CONSTRAINT user_role_id_fkey FOREIGN KEY (role_id) 
        REFERENCES smb.user_role(id) ON UPDATE SET NULL ON DELETE SET NULL
);
ALTER TABLE smb.user OWNER TO "smb-db-user";
COMMENT ON TABLE smb.user IS 'Users';


--
-- global functions
--

CREATE FUNCTION smb.array_idx(anyarray, anyelement) RETURNS INTEGER
    LANGUAGE sql IMMUTABLE
    AS $_$
SELECT i
FROM (
         SELECT generate_series(array_lower($1, 1), array_upper($1, 1))
     ) g(i)
WHERE $1[i] = $2
LIMIT 1;
$_$;
ALTER FUNCTION smb.array_idx(anyarray, anyelement) OWNER TO "smb-db-user";


-- 
-- functions for virtual fields
--

-- compilation
CREATE FUNCTION smb.extract_compilation(obj smb.objects) RETURNS text
   LANGUAGE sql STABLE
AS $_$
   SELECT value FROM smb.attribute_translations
   WHERE attribute_key = '__orgUnit' AND object_id = obj.id
   LIMIT 1
$_$;
ALTER FUNCTION smb.extract_compilation(smb.objects) OWNER TO "smb-db-user";

-- collectionKey
CREATE FUNCTION smb.extract_collection_key(obj smb.objects) RETURNS text
    LANGUAGE sql STABLE
AS $_$
    SELECT c.key FROM smb.collections c 
    WHERE smb.extract_compilation(obj) LIKE c.key || '%'
    LIMIT 1
$_$;
ALTER FUNCTION smb.extract_collection_key(smb.objects) OWNER TO "smb-db-user";


-- approvals
CREATE OR REPLACE FUNCTION smb.extract_approvals(rec smb.attribute_approval) RETURNS text
LANGUAGE plpgsql STABLE
AS $$
    DECLARE
        col text;
        val BOOLEAN;
        collection_key text;
        approvals text[];
    BEGIN
        FOR col in 
            SELECT column_name FROM information_schema.columns 
            WHERE table_schema = 'smb' AND table_name = 'attribute_approval' AND column_name NOT IN ('id', 'attribute_key')
        LOOP
            EXECUTE 'select ' || col || ' from smb.attribute_approval where id = ' || rec.id INTO val;
            IF (val) THEN
                EXECUTE 'select key from smb.collections where LOWER(key) = LOWER(''' || col || ''')' INTO collection_key;
                approvals := array_append(approvals, collection_key);
            END IF;
        END LOOP;
        RETURN '[' || array_to_string(approvals, ',') || ']';
    END;
$$;


-- 
-- create triggers
--

CREATE FUNCTION smb.trigger_update_attribute_translation_visibility() RETURNS trigger 
LANGUAGE plpgsql STRICT
AS $$
    DECLARE
        collection_key text;
        old_approvals text[];
        new_approvals text[];
        old_hidden BOOLEAN;
        new_hidden BOOLEAN;
    BEGIN
        old_approvals := string_to_array(btrim(smb.extract_approvals(OLD),  '[]'), ',');
        new_approvals := string_to_array(btrim(smb.extract_approvals(NEW),  '[]'), ',');
        FOR collection_key IN SELECT "key" FROM smb.collections LOOP
        
            -- check new approval status for this collection
            IF (collection_key = ANY(new_approvals)) THEN
                new_hidden := false;
            ELSE
                new_hidden := true;
            END IF;
            
            -- check old approval status for this collection
            IF (collection_key = ANY(old_approvals)) THEN
                old_hidden := false;
            ELSE
                old_hidden := true;
            END IF;
            
            -- update all visibility flags of related atttributes if approval status changed for this collection
            IF (new_hidden <> old_hidden) THEN
                UPDATE smb.attribute_translations SET "visible" = NOT new_hidden 
                    WHERE "attribute_key" LIKE NEW."attribute_key" || '%'
                    AND object_id IN (SELECT object_id FROM smb.attribute_translations WHERE attribute_key = '__orgUnit' AND value LIKE collection_key || '%');
            END IF;
            
        END LOOP;
        RETURN NEW;
    END;
$$; ALTER FUNCTION smb.trigger_update_attribute_translation_visibility() OWNER TO "smb-db-user";

CREATE TRIGGER update_attribute_translation_visibility AFTER UPDATE ON smb.attribute_approval
    FOR EACH ROW EXECUTE FUNCTION smb.trigger_update_attribute_translation_visibility();
COMMENT ON TRIGGER update_attribute_translation_visibility ON smb.attribute_approval 
    IS 'trigger to set visibility flag of attribute_translations when approval value changes';


CREATE FUNCTION smb.set_current_timestamp_updated_at() RETURNS trigger
LANGUAGE plpgsql
AS $$
    DECLARE
        _new record;
    BEGIN
        _new := NEW;
        _new."updated_at" = now();
        RETURN _new;
    END;
$$;
ALTER FUNCTION smb.set_current_timestamp_updated_at() OWNER TO "smb-db-user";

CREATE TRIGGER set_smb_objects_updated_at BEFORE UPDATE ON smb.objects 
    FOR EACH ROW EXECUTE FUNCTION smb.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_smb_objects_updated_at ON smb.objects 
    IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TRIGGER set_smb_attachments_updated_at BEFORE UPDATE ON smb.attachments 
    FOR EACH ROW EXECUTE FUNCTION smb.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_smb_attachments_updated_at ON smb.attachments 
    IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TRIGGER set_smb_assortments_objects_updated_at BEFORE UPDATE ON smb.assortments_objects 
    FOR EACH ROW EXECUTE FUNCTION smb.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_smb_assortments_objects_updated_at ON smb.assortments_objects 
    IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TRIGGER set_smb_persons_objects_updated_at BEFORE UPDATE ON smb.persons_objects 
    FOR EACH ROW EXECUTE FUNCTION smb.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_smb_persons_objects_updated_at ON smb.persons_objects 
    IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TRIGGER set_smb_persons_updated_at BEFORE UPDATE ON smb.persons 
    FOR EACH ROW EXECUTE FUNCTION smb.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_smb_persons_updated_at ON smb.persons 
    IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TRIGGER set_smb_exhibitions_objects_updated_at BEFORE UPDATE ON smb.exhibitions_objects 
    FOR EACH ROW EXECUTE FUNCTION smb.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_smb_exhibitions_objects_updated_at ON smb.exhibitions_objects 
    IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TRIGGER set_smb_exhibitions_updated_at BEFORE UPDATE ON smb.exhibitions 
    FOR EACH ROW EXECUTE FUNCTION smb.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_smb_exhibitions_updated_at ON smb.exhibitions 
    IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TRIGGER set_smb_thesaurus_updated_at BEFORE UPDATE ON smb.thesaurus 
    FOR EACH ROW EXECUTE FUNCTION smb.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_smb_thesaurus_updated_at ON smb.thesaurus 
    IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TRIGGER set_smb_thesaurus_translations_updated_at BEFORE UPDATE ON smb.thesaurus_translations 
    FOR EACH ROW EXECUTE FUNCTION smb.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_smb_thesaurus_translations_updated_at ON smb.thesaurus_translations 
    IS 'trigger to set value of column "updated_at" to current timestamp on row update';

--

CREATE FUNCTION smb.trigger_remove_ignored_attributes() RETURNS trigger
LANGUAGE plpgsql STRICT
AS $$
    BEGIN
        DELETE FROM smb.attributes WHERE attributes.key LIKE REPLACE(NEW.key, '*', '%');
        RETURN NEW;
    END;
$$;
ALTER FUNCTION smb.trigger_remove_ignored_attributes() OWNER TO "smb-db-user";

CREATE TRIGGER remove_ignored_attributes AFTER INSERT ON smb.ignoreable_keys 
    FOR EACH ROW EXECUTE FUNCTION smb.trigger_remove_ignored_attributes();
COMMENT ON TRIGGER remove_ignored_attributes ON smb.ignoreable_keys 
    IS 'trigger to remove all attribute and respective translations for a newly added ignorable key';

--

CREATE FUNCTION smb.trigger_set_default_license_translation_text() RETURNS trigger 
LANGUAGE plpgsql STRICT
AS $$ 
    BEGIN
        IF NEW.content is NULL OR NEW.content = '' THEN
            NEW.content = (SELECT key from smb.licenses where id = NEW.license_id);
        END IF;
        RETURN NEW;
    END; 
$$; 
ALTER FUNCTION smb.trigger_set_default_license_translation_text() OWNER TO "smb-db-user";

CREATE TRIGGER set_default_license_translation_text BEFORE INSERT ON smb.licenses_translation
    FOR EACH ROW EXECUTE FUNCTION smb.trigger_set_default_license_translation_text();
COMMENT ON TRIGGER set_default_license_translation_text ON smb.licenses_translation 
    IS 'trigger to set default license translation text if missing';

--

CREATE FUNCTION smb.trigger_add_approval_column() RETURNS trigger 
LANGUAGE plpgsql STRICT
AS $$ 
    BEGIN
        EXECUTE 'ALTER TABLE smb.attribute_approval ADD COLUMN ' || NEW.key || ' BOOLEAN DEFAULT NULL';
        RETURN NEW;
    END; 
$$; 
ALTER FUNCTION smb.trigger_add_approval_column() OWNER TO "smb-db-user";

CREATE TRIGGER add_approval_column AFTER INSERT ON smb.collections
    FOR EACH ROW EXECUTE FUNCTION smb.trigger_add_approval_column();

--

CREATE FUNCTION smb.trigger_prevent_collection_key_change() RETURNS trigger 
LANGUAGE plpgsql STRICT
AS $$ 
    BEGIN
        IF OLD.key != NEW.key THEN
            RAISE 'Collection key cannot be changed' 
                USING HINT = 'Insert a new row instead.', DETAIL = 'Enum values must be final.';
        END IF;
        RETURN NEW;
    END; 
$$; 
ALTER FUNCTION smb.trigger_prevent_collection_key_change() OWNER TO "smb-db-user";

CREATE TRIGGER prevent_collection_key_change BEFORE UPDATE ON smb.collections
    FOR EACH ROW EXECUTE FUNCTION smb.trigger_prevent_collection_key_change();
