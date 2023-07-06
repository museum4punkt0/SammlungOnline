-- find thesaurus duplicates
SELECT COUNT(name) AS count, name, type, instance, ('[' || STRING_AGG(mds_id::text, ',') || ']') AS ids 
FROM smb.thesaurus 
GROUP BY name, type, instance 
HAVING COUNT(name) > 1 
ORDER BY COUNT(name) DESC, name ASC;

-- find all thesauri
SELECT instance, ('[' || STRING_AGG(DISTINCT type::TEXT, ',') || ']') AS types FROM smb.thesaurus GROUP BY instance ORDER BY instance;

-- find missing photographer info
SELECT id, object_id, REGEXP_REPLACE(credits, '/ null', '/') FROM smb.attachments WHERE credits LIKE '%null%';
-- fix missing photographer info
UPDATE smb.attachments SET credits = REGEXP_REPLACE(credits, '/ null', '/') WHERE credits LIKE '%null%';

-- find leading semicolons in thesaurus translations
SELECT value, REGEXP_REPLACE(value, '^;+ *', '') FROM smb.thesaurus_translations WHERE value LIKE ';%';
-- fix leading semicolons in thesaurus translations
UPDATE smb.thesaurus_translations SET value = REGEXP_REPLACE(value, '^;+ *', '') WHERE value LIKE ';%';

-- find invalid html content in attributes
SELECT value, REGEXP_REPLACE(value, '(<html><body>)+(.*?)(</body></html>)+', '\2', 'g') FROM smb.attribute_translations WHERE value LIKE '<html%';
-- find objects with invalid  html content in attributes
SELECT distinct object_id FROM smb.attribute_translations WHERE value LIKE '<html%' order by object_id;
-- fix invalid html content in attributes
UPDATE smb.attribute_translations SET value = REGEXP_REPLACE(value, '(<html><body>)+(.*?)(</body></html>)+', '\2', 'g') WHERE value LIKE '<html%';

-- find all compilations
SELECT DISTINCT value FROM smb.attribute_translations WHERE attribute_key = '__orgUnit' ORDER BY value;

-- find amount of attachments per object
SELECT object_id, COUNT(attachment) AS count, ('[' || ARRAY_TO_STRING(ARRAY_AGG(id ORDER BY id ASC), ',') || ']') AS ids 
FROM smb.attachments 
WHERE "primary" = false
GROUP BY object_id 
HAVING COUNT(attachment) > 9 
ORDER BY COUNT(attachment) DESC, object_id ASC;

-- find amount of attachments per license
SELECT lic.id, lic.key AS license, COUNT(att.attachment) AS attachments_count, COUNT(DISTINCT att.object_id) AS objects_count
FROM smb.licenses lic, smb.attachments att
WHERE lic.id = att.license_id 
GROUP BY lic.id, lic.key 
HAVING COUNT(att.attachment) > 1 
ORDER BY COUNT(att.attachment) DESC;

-- find CC-* images
SELECT * from smb.attachments WHERE license_id IN (SELECT id from smb.licenses WHERE key LIKE 'CC%' ORDER BY id);

-- find persons with potentially invalid lifetime
SELECT id, name, date_of_birth, date_of_death, date_range FROM smb.persons WHERE date_of_birth LIKE '%-01-01' OR date_of_death LIKE '%-01-01' ORDER BY name;

-- delete irrelevant sync_cycles
DELETE FROM smb.sync_cycles 
WHERE debug_information LIKE '%Synced: 0%Failed: 0%Skipped: 0' 
   OR debug_information LIKE 'Duration: 00:00:00%';

-- delete unallowed involved-parties
DELETE FROM smb.persons_objects 
WHERE role_voc_id IN (
  SELECT id FROM smb.thesaurus WHERE instance = 'ObjPerAssociationRoleVgr' AND type = 'RoleVoc' AND name IN (
    'Leihgeber', 'Mäzen', 'Nachlasser', 'Person', 'Veräußerer', 'Vorbesitzer'
  )
);

-- delete unallowed geographical-references
DELETE FROM smb.geographical_references 
WHERE type_voc_id IN (
  SELECT id FROM smb.thesaurus WHERE instance = 'ObjGeographicTypeVgr' AND type = 'TypeVoc' AND name IN (
    'Statistischer Bezug', 
    'Fundort Ausgabe', 'Fundort aktuell', 'Fundort (aktuell)', 'Fundort (aktueller)', 
    'Fundort normiert', 'Fundort (normiert)', 
    'Fundort Variante', 'Fundort (Variante)', 
    'Fundort historisch 1800', 'Fundort (historisch 1800)', 
    'Fundort historisch 1900', 'Fundort (historisch 1900)', 
    'Fundort historisch 2000', 'Fundort (historisch 2000)'
  )
);