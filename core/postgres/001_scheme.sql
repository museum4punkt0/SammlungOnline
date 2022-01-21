--
-- PostgreSQL database dump
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
-- Name: language; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.language_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE smb.language_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.language (
    id bigint NOT NULL DEFAULT nextval('smb.language_id_seq'::regclass),
    lang text NOT NULL,
    CONSTRAINT language_pkey PRIMARY KEY (id),
    CONSTRAINT language_lang_key UNIQUE (lang)
);
ALTER TABLE smb.language OWNER TO "smb-db-user";
COMMENT ON TABLE smb.language IS 'Multilanguage support';

ALTER SEQUENCE smb.language_id_seq OWNED BY smb.language.id;

CREATE INDEX language_lang_idx ON smb.language USING btree (lang ASC NULLS LAST) TABLESPACE pg_default;


--
-- Name: objects; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE TABLE smb.objects (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    exhibition_space text,
    CONSTRAINT objects_pkey PRIMARY KEY (id)
);
ALTER TABLE smb.objects OWNER TO "smb-db-user";
COMMENT ON TABLE smb.objects IS 'SMB objects fetched from MDS';


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
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE smb.attribute_translations_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.attribute_translations (
    id bigint NOT NULL DEFAULT nextval('smb.attribute_translations_id_seq'::regclass),
    object_id bigint NOT NULL,
    attribute_key text NOT NULL,
    value text,
    fq_key text NOT NULL,
    language_id bigint NOT NULL,
    CONSTRAINT attribute_translations_pkey PRIMARY KEY (id),
    CONSTRAINT attribute_translations_attribute_key_fkey FOREIGN KEY (attribute_key) 
        REFERENCES smb.attributes(key) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT attribute_translations_object_id_fkey FOREIGN KEY (object_id) 
        REFERENCES smb.objects(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT attribute_translations_language_id_fkey FOREIGN KEY (language_id) 
        REFERENCES smb.language(id) ON UPDATE cascade ON DELETE restrict
);
ALTER TABLE smb.attribute_translations OWNER TO "smb-db-user";
COMMENT ON TABLE smb.attribute_translations IS 'Attribute values of SMB objects';

ALTER SEQUENCE smb.attribute_translations_id_seq OWNED BY smb.attribute_translations.id;

CREATE INDEX attribute_translations_value_idx ON smb.attribute_translations USING gin (value public.gin_trgm_ops);
CREATE INDEX attribute_translations_attribute_idx ON smb.attribute_translations USING btree (attribute_key ASC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX attribute_translations_object_idx ON smb.attribute_translations USING btree (object_id ASC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX attribute_translations_language_idx ON smb.attribute_translations USING btree (language_id ASC NULLS LAST) TABLESPACE pg_default;

--
-- Name: licenses; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.licenses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE smb.licenses_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.licenses (
    id bigint NOT NULL DEFAULT nextval('smb.licenses_id_seq'::regclass),
    key text NOT NULL,
    link text NOT NULL,
    CONSTRAINT licenses_pkey PRIMARY KEY (id),
    CONSTRAINT licenses_key_key UNIQUE (key)
);
ALTER TABLE smb.licenses OWNER TO "smb-db-user";
COMMENT ON TABLE smb.licenses IS 'License deeds for images';

ALTER SEQUENCE smb.licenses_id_seq OWNED BY smb.licenses.id;


--
-- Name: licenses_translation; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.licenses_translation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE smb.licenses_translation_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.licenses_translation (
    id bigint NOT NULL DEFAULT nextval('smb.licenses_translation_id_seq'::regclass),
    content text NOT NULL,
    license_id bigint NOT NULL,
    language_id bigint NOT NULL,
    CONSTRAINT licenses_translation_pkey PRIMARY KEY (id),
    CONSTRAINT licenses_translation_language_id_fkey FOREIGN KEY (language_id) 
        REFERENCES smb.language(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT licenses_translation_license_id_fkey FOREIGN KEY (license_id) 
        REFERENCES smb.licenses(id) ON UPDATE CASCADE ON DELETE CASCADE
);
ALTER TABLE smb.licenses_translation OWNER TO "smb-db-user";
COMMENT ON TABLE smb.licenses_translation IS 'Unused - Supposed to store license deed translations';

ALTER SEQUENCE smb.licenses_translation_id_seq OWNED BY smb.licenses_translation.id;

CREATE INDEX licenses_translations_language_idx ON smb.licenses_translation USING btree (language_id ASC NULLS LAST) TABLESPACE pg_default;


--
-- Name: attachments; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.attachments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE smb.attachments_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.attachments (
    id bigint NOT NULL DEFAULT nextval('smb.attachments_id_seq'::regclass),
    attachment text NOT NULL,
    "primary" boolean DEFAULT false,
    object_id bigint NOT NULL,
    license_id bigint,
    credits text,
    CONSTRAINT attachments_pkey PRIMARY KEY (id),
    CONSTRAINT attachments_attachment_key UNIQUE (attachment),
    CONSTRAINT attachments_object_id_fkey FOREIGN KEY (object_id) 
        REFERENCES smb.objects(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT attachments_license_id_fkey FOREIGN KEY (license_id) 
        REFERENCES smb.licenses(id) ON UPDATE CASCADE ON DELETE SET NULL;
);
ALTER TABLE smb.attachments OWNER TO "smb-db-user";
COMMENT ON TABLE smb.attachments IS 'Attachments of SMB objects fetched from MDS';
ALTER SEQUENCE smb.attachments_id_seq OWNED BY smb.attachments.id;




--
-- Name: org_unit; Type: TABLE; Schema: smb; Owner: smb-db-user
--
CREATE SEQUENCE smb.org_unit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE smb.org_unit_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.org_unit (
    id bigint NOT NULL DEFAULT nextval('smb.org_unit_id_seq'::regclass),
    name text NOT NULL,
    CONSTRAINT org_unit_pkey PRIMARY KEY (id),
    CONSTRAINT org_unit_name_key UNIQUE (name)
);
ALTER TABLE smb.org_unit OWNER TO "smb-db-user";
COMMENT ON TABLE smb.org_unit IS 'Org-units fetched from MDS, used to group SMB objects';
ALTER SEQUENCE smb.org_unit_id_seq OWNED BY smb.org_unit.id;


--
-- Name: highlights; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.highlights_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE smb.highlights_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.highlights (
    id bigint NOT NULL DEFAULT nextval('smb.highlights_id_seq'::regclass),
    org_unit_id bigint NOT NULL,
    object_id bigint NOT NULL,
    CONSTRAINT highlights_pkey PRIMARY KEY (id),
    CONSTRAINT highlights_object_id_fkey FOREIGN KEY (object_id) 
        REFERENCES smb.objects(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT highlights_org_unit_id_fkey FOREIGN KEY (org_unit_id) 
        REFERENCES smb.org_unit(id) ON UPDATE CASCADE ON DELETE CASCADE
);
ALTER TABLE smb.highlights OWNER TO "smb-db-user";
COMMENT ON TABLE smb.highlights IS 'SMB highlight objects';

ALTER SEQUENCE smb.highlights_id_seq OWNED BY smb.highlights.id;


--
-- Name: ignoreable_keys; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.ignoreable_keys_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE smb.ignoreable_keys_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.ignoreable_keys (
    id bigint NOT NULL DEFAULT nextval('smb.ignoreable_keys_id_seq'::regclass),
    key text NOT NULL,
    CONSTRAINT ignoreable_keys_pkey PRIMARY KEY (id),
    CONSTRAINT ignoreable_keys_key_key UNIQUE (key)
);
ALTER TABLE smb.ignoreable_keys OWNER TO "smb-db-user";
COMMENT ON TABLE smb.ignoreable_keys IS 'Attribute keys that should be ignored during import from MDS';

ALTER SEQUENCE smb.ignoreable_keys_id_seq OWNED BY smb.ignoreable_keys.id;


--
-- Name: intro_slides; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.intro_slides_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE smb.intro_slides_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.intro_slides (
    id bigint NOT NULL DEFAULT nextval('smb.intro_slides_id_seq'::regclass),
    image text NOT NULL,
    CONSTRAINT intro_slides_pkey PRIMARY KEY (id)
);
ALTER TABLE smb.intro_slides OWNER TO "smb-db-user";
COMMENT ON TABLE smb.intro_slides IS 'Slide configuration for the landing page';

ALTER SEQUENCE smb.intro_slides_id_seq OWNED BY smb.intro_slides.id;


--
-- Name: intro_slide_translations; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.intro_slide_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE smb.intro_slide_translations_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.intro_slide_translations (
    id bigint NOT NULL DEFAULT nextval('smb.intro_slide_translations_id_seq'::regclass),
    language_id bigint NOT NULL,
    title text NOT NULL,
    intro_slide_id integer NOT NULL,
    CONSTRAINT intro_slide_translations_pkey PRIMARY KEY (id),
    CONSTRAINT intro_slide_translations_intro_slide_id_fkey FOREIGN KEY (intro_slide_id) 
        REFERENCES smb.intro_slides(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT intro_slide_translations_language_id_fkey FOREIGN KEY (language_id) 
        REFERENCES smb.language(id) ON UPDATE cascade ON DELETE restrict
);
ALTER TABLE smb.intro_slide_translations OWNER TO "smb-db-user";
COMMENT ON TABLE smb.intro_slide_translations IS 'Slide translations';

ALTER SEQUENCE smb.intro_slide_translations_id_seq OWNED BY smb.intro_slide_translations.id;

CREATE INDEX intro_slide_translations_language_idx ON smb.intro_slide_translations USING btree (language_id ASC NULLS LAST) TABLESPACE pg_default;


--
-- Name: intro_text_module_type; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE TABLE smb.intro_text_module_type (
    value text NOT NULL,
    comment text NOT NULL,
    CONSTRAINT intro_text_module_type_pkey PRIMARY KEY (value)
);
ALTER TABLE smb.intro_text_module_type OWNER TO "smb-db-user";
COMMENT ON TABLE smb.intro_text_module_type IS 'Enum type definition for text modules';


--
-- Name: intro_text_modules; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.intro_text_modules_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE smb.intro_text_modules_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.intro_text_modules (
    id bigint NOT NULL DEFAULT nextval('smb.intro_text_modules_id_seq'::regclass),
    sequence integer NOT NULL,
    link text,
    module_background_color text NOT NULL,
    title_color text NOT NULL,
    text_color text NOT NULL,
    text_area_color text NOT NULL,
    module_type text NOT NULL,
    CONSTRAINT intro_text_modules_pkey PRIMARY KEY (id),
    CONSTRAINT intro_text_modules_module_type_fkey FOREIGN KEY (module_type) 
        REFERENCES smb.intro_text_module_type(value) ON UPDATE CASCADE ON DELETE CASCADE
);
ALTER TABLE smb.intro_text_modules OWNER TO "smb-db-user";
COMMENT ON TABLE smb.intro_text_modules IS 'Text modules for the landing page';

ALTER SEQUENCE smb.intro_text_modules_id_seq OWNED BY smb.intro_text_modules.id;


--
-- Name: intro_text_module_translations; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.intro_text_module_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE smb.intro_text_module_translations_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.intro_text_module_translations (
    id bigint NOT NULL DEFAULT nextval('smb.intro_text_module_translations_id_seq'::regclass),
    title text NOT NULL,
    subtitle text NOT NULL,
    content text NOT NULL,
    link_caption text NOT NULL,
    intro_text_module_id integer NOT NULL,
    language_id bigint NOT NULL,
    CONSTRAINT intro_text_module_translations_pkey PRIMARY KEY (id),
    CONSTRAINT intro_text_module_translations_intro_text_module_id_fkey FOREIGN KEY (intro_text_module_id) 
        REFERENCES smb.intro_text_modules(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT intro_text_module_translations_language_id_fkey FOREIGN KEY (language_id) 
        REFERENCES smb.language(id) ON UPDATE cascade ON DELETE restrict
);
ALTER TABLE smb.intro_text_module_translations OWNER TO "smb-db-user";
COMMENT ON TABLE smb.intro_text_module_translations IS 'Text module translations';

ALTER SEQUENCE smb.intro_text_module_translations_id_seq OWNED BY smb.intro_text_module_translations.id;

CREATE INDEX intro_text_module_translations_language_idx ON smb.intro_text_module_translations USING btree (language_id ASC NULLS LAST) TABLESPACE pg_default;


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
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE smb.sync_cycles_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.sync_cycles (
    id bigint NOT NULL DEFAULT nextval('smb.sync_cycles_id_seq'::regclass),
    type text NOT NULL DEFAULT 'INCREMENTAL',
    "timestamp" timestamp with time zone NOT NULL,
    debug_information text NOT NULL,
    CONSTRAINT sync_cycles_pkey PRIMARY KEY (id),
    CONSTRAINT sync_cycle_type_fkey FOREIGN KEY (type) 
        REFERENCES smb.sync_cycle_type ON UPDATE CASCADE ON DELETE CASCADE
);
ALTER TABLE smb.sync_cycles OWNER TO "smb-db-user";
COMMENT ON TABLE smb.sync_cycles IS 'Enum type definition for sync-cycles';

ALTER SEQUENCE smb.sync_cycles_id_seq OWNED BY smb.sync_cycles.id;


--
-- Name: topics; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.topics_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE smb.topics_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.topics (
    id bigint NOT NULL DEFAULT nextval('smb.topics_id_seq'::regclass),
    has_slide boolean DEFAULT false NOT NULL,
    preview_image text NOT NULL,
    CONSTRAINT topics_pkey PRIMARY KEY (id)
);
ALTER TABLE smb.topics OWNER TO "smb-db-user";
COMMENT ON TABLE smb.topics IS 'Collections of SMB objects shown in topics platform';

ALTER SEQUENCE smb.topics_id_seq OWNED BY smb.topics.id;


--
-- Name: topics_objects; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.topics_objects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE smb.topics_objects_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.topics_objects (
    id bigint NOT NULL DEFAULT nextval('smb.topics_objects_id_seq'::regclass),
    topics_id bigint NOT NULL,
    objects_id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT topics_objects_pkey PRIMARY KEY (id),
    CONSTRAINT topics_objects_objects_id_fkey FOREIGN KEY (objects_id) 
        REFERENCES smb.objects(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT topics_objects_topics_id_fkey FOREIGN KEY (topics_id) 
        REFERENCES smb.topics(id) ON UPDATE CASCADE ON DELETE CASCADE
);
ALTER TABLE smb.topics_objects OWNER TO "smb-db-user";
COMMENT ON TABLE smb.topics_objects IS 'Assignment of SMB objects to collections';

ALTER SEQUENCE smb.topics_objects_id_seq OWNED BY smb.topics_objects.id;


--
-- Name: topics_translations; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.topics_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE smb.topics_translations_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.topics_translations (
    id bigint NOT NULL DEFAULT nextval('smb.topics_translations_id_seq'::regclass),
    language_id bigint NOT NULL,
    title text NOT NULL,
    description text,
    topics_id bigint NOT NULL,
    CONSTRAINT topics_translations_pkey PRIMARY KEY (id),
    CONSTRAINT topics_translations_language_id_fkey FOREIGN KEY (language_id) 
        REFERENCES smb.language(id) ON UPDATE cascade ON DELETE restrict,
    CONSTRAINT topics_translations_topics_id_fkey FOREIGN KEY (topics_id) 
        REFERENCES smb.topics(id) ON UPDATE CASCADE ON DELETE CASCADE
);
ALTER TABLE smb.topics_translations OWNER TO "smb-db-user";
COMMENT ON TABLE smb.topics_translations IS 'Collection translations';

ALTER SEQUENCE smb.topics_translations_id_seq OWNED BY smb.topics_translations.id;

CREATE INDEX topics_translations_language_idx ON smb.topics_translations USING btree (language_id ASC NULLS LAST) TABLESPACE pg_default;


--

CREATE SEQUENCE smb.tours_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE smb.tours_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.tours (
    id bigint NOT NULL DEFAULT nextval('smb.tours_id_seq'::regclass),
    number int NOT NULL,
    preview_image text NOT NULL,
    directions text,
    museum text NOT NULL,
    duration smallint NOT NULL CHECK (duration >= 0),
    CONSTRAINT tours_pkey PRIMARY KEY (id)
);
ALTER TABLE smb.tours OWNER TO "smb-db-user";
COMMENT ON TABLE smb.tours IS 'Tour definitions';

ALTER SEQUENCE smb.tours_id_seq OWNED BY smb.tours.id;


--

CREATE SEQUENCE smb.tours_translation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE smb.tours_translation_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.tours_translation
(
    id bigint NOT NULL DEFAULT nextval('smb.tours_translation_id_seq'::regclass),
    title text NOT NULL,
    subtitle text NOT NULL,
    abstract text NOT NULL,
    description text NOT NULL,
    tour_id bigint NOT NULL,
    language_id bigint NOT NULL,
    CONSTRAINT tours_translation_pkey PRIMARY KEY (id),
    CONSTRAINT tours_translation_language_id_fkey FOREIGN KEY (language_id) 
        REFERENCES smb.language (id) ON UPDATE cascade ON DELETE restrict,
    CONSTRAINT tours_translation_tour_id_fkey FOREIGN KEY (tour_id)
        REFERENCES smb.tours (id) ON UPDATE CASCADE ON DELETE CASCADE
);
ALTER TABLE smb.tours_translation OWNER to "smb-db-user";
COMMENT ON TABLE smb.tours_translation IS 'Tour text translations';

ALTER SEQUENCE smb.tours_translation_id_seq OWNED BY smb.tours_translation.id;

CREATE INDEX tours_translation_language_id_idx ON smb.tours_translation 
    USING btree (language_id ASC NULLS LAST) TABLESPACE pg_default;


--

CREATE SEQUENCE smb.tours_objects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE smb.tours_objects_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.tours_objects
(
    id bigint NOT NULL DEFAULT nextval('smb.tours_objects_id_seq'::regclass),
    sequence int NOT NULL,
    tour_id bigint NOT NULL,
    object_id bigint NOT NULL,
    room text NOT NULL,
    CONSTRAINT tours_objects_pkey PRIMARY KEY (id),
    CONSTRAINT tours_objects_tour_id_fkey FOREIGN KEY (tour_id)
        REFERENCES smb.tours (id) ON UPDATE cascade ON DELETE cascade,
    CONSTRAINT tours_objects_object_id_fkey FOREIGN KEY (object_id)
        REFERENCES smb.objects (id) ON UPDATE CASCADE ON DELETE CASCADE
);
ALTER TABLE smb.tours_objects OWNER to "smb-db-user";
COMMENT ON TABLE smb.tours_objects IS 'Object assigments to tours';

ALTER SEQUENCE smb.tours_objects_id_seq OWNED BY smb.tours_objects.id;


--

CREATE SEQUENCE smb.tours_objects_translation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE smb.tours_objects_translation_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.tours_objects_translation
(
    id bigint NOT NULL DEFAULT nextval('smb.tours_objects_translation_id_seq'::regclass),
    tour_object_id bigint NOT NULL,
    language_id bigint NOT NULL,
    abstract text NOT NULL,
    description text NOT NULL,
    CONSTRAINT tours_objects_translation_pkey PRIMARY KEY (id),
    CONSTRAINT tours_objects_translation_language_id_fkey FOREIGN KEY (language_id)
        REFERENCES smb.language (id) ON UPDATE cascade ON DELETE restrict,
    CONSTRAINT tours_objects_translation_tour_object_id_fkey FOREIGN KEY (tour_object_id)
        REFERENCES smb.tours_objects (id) ON UPDATE CASCADE ON DELETE CASCADE
);
ALTER TABLE smb.tours_objects_translation OWNER to "smb-db-user";
COMMENT ON TABLE smb.tours_objects_translation IS 'Object translations';

ALTER SEQUENCE smb.tours_objects_translation_id_seq OWNED BY smb.tours_objects_translation.id;

CREATE INDEX tours_objects_translation_language_id_idx ON smb.tours_objects_translation 
    USING btree (language_id ASC NULLS LAST) TABLESPACE pg_default;


--
-- Name: user_role; Type: TABLE; Schema: smb; Owner: smb-db-user
--

CREATE SEQUENCE smb.user_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE smb.user_role_id_seq OWNER TO "smb-db-user";

CREATE TABLE smb.user_role (
    id bigint NOT NULL DEFAULT nextval('smb.user_role_id_seq'::regclass),
    role text NOT NULL,
    CONSTRAINT user_role_pkey PRIMARY KEY (id),
    CONSTRAINT user_role_role_key UNIQUE (role)
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
    role_id integer,
    CONSTRAINT user_pkey PRIMARY KEY (id),
    CONSTRAINT user_email_key UNIQUE (email),
    CONSTRAINT user_role_id_fkey FOREIGN KEY (role_id) 
        REFERENCES smb.user_role(id) ON UPDATE SET NULL ON DELETE SET NULL
);
ALTER TABLE smb.user OWNER TO "smb-db-user";
COMMENT ON TABLE smb.user IS 'Users';


--
-- global functions
--

CREATE FUNCTION smb.array_idx(anyarray, anyelement) RETURNS integer
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
-- create triggers
--

CREATE FUNCTION smb.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
        DECLARE
          _new record;
        BEGIN
          _new := NEW;
          _new."updated_at" = NOW();
          RETURN _new;
        END;
    $$;
ALTER FUNCTION smb.set_current_timestamp_updated_at() OWNER TO "smb-db-user";

--
-- Name: trigger_remove_ignored_attributes(); Type: FUNCTION; Schema: smb; Owner: smb-db-user
--

CREATE FUNCTION smb.trigger_remove_ignored_attributes() RETURNS trigger
    LANGUAGE plpgsql STRICT
    AS $$
        BEGIN
            DELETE FROM smb.attributes WHERE attributes.key LIKE REPLACE(new.key, '*', '%');
            RETURN new;
        END;
    $$;
ALTER FUNCTION smb.trigger_remove_ignored_attributes() OWNER TO "smb-db-user";


CREATE TRIGGER remove_ignored_attributes AFTER INSERT ON smb.ignoreable_keys 
    FOR EACH ROW EXECUTE FUNCTION smb.trigger_remove_ignored_attributes();

CREATE TRIGGER set_smb_objects_updated_at BEFORE UPDATE ON smb.objects 
    FOR EACH ROW EXECUTE FUNCTION smb.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_smb_objects_updated_at ON smb.objects IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TRIGGER set_smb_topics_objects_updated_at BEFORE UPDATE ON smb.topics_objects 
    FOR EACH ROW EXECUTE FUNCTION smb.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_smb_topics_objects_updated_at ON smb.topics_objects IS 'trigger to set value of column "updated_at" to current timestamp on row update';
