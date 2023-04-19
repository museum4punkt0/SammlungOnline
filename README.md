# Sammlungen Online

Die Sammlungen Online der Staatlichen Museen zu Berlin (SMB) zeigen derzeit über 280.000 Datensätze zu Objekten aus den unterschiedlichsten Epochen und Regionen der Welt.
Die Neugestaltung der Online Sammlungen verfolgt dabei folgende Ziele:
1. Die Objekte der Staatlichen Museen sollen im Digitalen Raum und international angemessen zeitgemäß zugänglich und recherchierbar gemacht werden.
2. Die Sichtbarkeit der SMB im Digitalen Raum soll erhöht werden.
3. Die Diversität der Online BesucherInnen soll verstärkt und die Zahl der Online BesucherInnen erhöht werden.

Beim Besuch der Online Sammlungen weisen BesucherInnen individuelle und spezifischen Motivationen und Bedürfnisse auf. Um diesen individuellen Zugriffen auf die Objekte der Online Sammlung gerecht zu werden, stehen die Objekte der Sammlungen im Mittelpunkt. Durch verschiedene Themenformate, werden für die individuellen Motivationen der Online BesucherInnen, individuelle Zugänge zu den Objekten geschaffen. Die Online Sammlungen wurden modular wachsend sowie mit der Möglichkeit der mehrsprachigen Nutzung geplant.

### Entstehungskontext
Die Plattform Sammlungen Online ist initial entstanden im Verbundprojekt [museum4punkt0 – Digitale Strategien für das Museum der Zukunft](https://www.museum4punkt0.de) im Teilprojekt [Visitor Journeys neu gedacht – digitale Erweiterung des Museumsbesuchs](https://www.museum4punkt0.de/teilprojekt/visitor-journeys-neu-gedacht-digitale-erweiterung-des-museumsbesuchs/) der Staatlichen Museen zu Berlin – Preußischer Kulturbesitz. Die Plattform wurde über die beiden weiteren Förderphasen des Verbundprojekts museum4punkt0 im Projekt [(De-)Coding Culture. Kulturelle Kompetenz im digitalen Raum](https://www.museum4punkt0.de/teilprojekt/de-coding-culture-kulturelle-kompetenz-im-digitalen-raum/) der Staatlichen Museen zu Berlin um weitere Funktionen und Module erweitert.

### Förderung
Das Projekt museum4punkt0 wird gefördert durch die Beauftragte der Bundesregierung für Kultur und Medien aufgrund eines Beschlusses des Deutschen Bundestages.

![BKM-Logo](https://github.com/museum4punkt0/Object-by-Object/blob/77bba25aa5a7f9948d4fd6f0b59f5bfb56ae89e2/04%20Logos/BKM_Fz_2017_Web_de.gif)
![NeustartKultur](https://github.com/museum4punkt0/Object-by-Object/blob/22f4e86d4d213c87afdba45454bf62f4253cada1/04%20Logos/BKM_Neustart_Kultur_Wortmarke_pos_RGB_RZ_web.jpg)

## Plattformen

Die einzelen Themenformate wurden als separate Plattformen umgesetzt, die im Folgenden kurz beschrieben werden. Alle dieser Plattformen nutzen modulare Komponenten aus einer geteilten Bibliothek `react-component-library`.

Alle Plattformen basieren auf TypeScript und React.

### SMB Intro

SMB Intro `react-landingpage` dient als Landingpage für die Online Sammlungen. Hier werden die verschiedenen Plattformen geteasert und zu einem Portal zusammengefügt.

### SMB Recherche

SMB Recherche `react-research` bildet den Zugang der Scientific Community zu den Sammlungen ab. Ziel dieser Anwendung ist das professionelle und effektive Forschen und Arbeiten an und mit den Sammlungen sowie die Objektrecherche. SMB Recherche ist als Such-Portal mit Objektdetailseiten umgesetzt.

### SMB Touren

SMB Touren `react-guide` ist die Brücke der Online Sammlung in die Häuser der Staatlichen Museen zu Berlin. Online BesucherInnen soll es ermöglicht werden, aktuelle Informationen zu den Ausstellungsorten von Objekten in den Museen zu erhalten und themenbezogene oder eigene Führungen aus SMB Touren zusammenzustellen, um den Museumsbesuch zu planen und zu begleiten. SMB Touren zeigt kuratierte Routen durch die Online Sammlungen, wobei die einzelnen Objekte in einen gemeinsamen Kontext in Form einer Tour gesetzt werden.

### SMB Themen

SMB Themen `react-topics` soll explizit Online BesucherInnen ansprechen, die nicht die Möglichkeit haben regelmäßig die Häuser der SMB vor Ort zu besuchen. Dennoch sollen ihre unterschiedlichen Motivationen als BesucherInnen durch die Anwendung erfüllt werden. Ähnlich wie bei SMB Touren werden die Objekte hier in einen Themenkontext zusammengefasst, wobei die Themen verschiedene Besucherinteressen abfangen und als Einstiegspunkt in die Online Sammlungen dienen.

## SMB API

Um Sammlungsobjekte aus dem Museumdokumentationssystem in die verschiedenen Formate einzubinden und aktuell zu halten, benötigt es eine offene, URL-Request-basierte Schnittstelle (API `core/hasura`), die es ermöglicht, Objektdaten dynamisch in Web-Anwendungen einzubinden. Hierfür steht eine generische GraphQL-API zur Verfügung, die es erlaubt verschiedenste Daten und Attribute je nach Anwendungsfall abzufragen. Die Plattformen SMB Intro, SMB Touren und SMB Themen nutzen diese generische API um die Plattform-Inhalte anzuzeigen. SMB Recherche nutzt einen dedizierten Search-Service `search-indexer`, der die GraphQL erweitert und eine exemplarische Implementierung für zukünftige Web-Services auf Basis der öffentlichen API darstellt.

## Weitere Backend-Services

Um die Plattformen im Hintergrund mit den notwendigen Daten zu versorgen, sind weitere Backend-Services implementiert. Diese sind mit Java11/Kotlin und Springboot umgesetzt. Die Services sind im einzelnen:

| Name           | Beschreibung                                                                                                   |
| -------------- | -------------------------------------------------------------------------------------------------------------- |
| hasura-auth    | Webhook Authentifizierungs-Service für Hasura                                                                  |
| mds-sync       | Service um den Daten-Index mit Änderungen im MDS zu synchronisieren                                            |
| react-admin    | Administrations-UI für die Pflege von Website-Content (Textblöcke, Themen, Touren)                             |
| search-indexer | Service für die Indizierung von Suchergebnissen mit Elasticsearch sowie Implementierung des Search-Webservices |
| sitemap        | Generierung und Bereitstellung der Sitemaps für SMB Recherche, SMB Touren und SMB Themen (SEO)                 |

## Infrastruktur-Komponenten

Im `core` befinden sich verwendete Docker-Container. Je nach Bedarf, müssen verschiedene Container gestartet werden. In den jeweiligen Ordnern liegen Instruktionen und Testdaten bereit.

**Achtung**: Die Umgebungsvariablen in den `docker-compose.yml` Dateien, sowohl im `core` als auch in den eigens implementierten Services, müssen ggf. auf die eigene Umgebung angepasst werden. Vor allem Benutzernamen und Passwörter sind in der vorhandenen Konfiguration aus Sicherheitsgründen nicht vollständig ausgefüllt.

**Hinweis**: Die Docker-Container, welche im `core` definiert sind, befinden sich in einer nicht-öffentlichen Registry der Entwicklerfirma. Es können an deren Stelle auch die äquivalenten offiziellen Container aus dem Docker-Hub verwendet werden.

Der Nginx `core/reverse-proxy` enthält eine kleine Beispielkonfiguration, um die gestarteten Dienste über einen zentralen Einstiegspunkt mit Subrouten verfügbar zu machen. Er ist nicht essentiell für die Nutzung.

Essentiell für die Nutzung *jedes* Dienstes ist die API `core/hasura`. Diese erlaubt Zugriff auf die Datenbank `core/postgres` und die Objektbilder `core/image-provider`. Der Zugriff auf die API wird über einen Webhook `hasura-auth` authentifiziert. Die entsprechende Startsequenz der Docker-Container ist daher wie folgt:
1. core/postgres
2. core/image-provider
3. core/hasura
4. hasura-auth

Nach dem ersten Start von Hasura, müssen inital das Postgres-Schema aus `core/postgres/001_scheme.sql` und die entsprechenden Metadaten aus `core/hasura/hasura_metadata.json` importiert werden. Für einen besseren Start empfiehlt sich auch der Import von `core/postgres/002_base_data.sql`. Weitere Informationen dazu gibt es in `core/howto-init-datamodel.txt`.

Matomo `core/matomo` wird für das User-Tracking auf den einzelnen Plattformen verwendet. Die Tracking-Daten werden in einer relationalen Datenbank `core/mysql` gespeichert. Soll vom Tracking in einer eigenen Matomo-Instanz Gebrauch gemacht werden, müssen diese Container zusätzlich in folgender Reihenfolge gestartet werden:
1. core/mysql
2. core/matomo

**Achtung**: Bei Nutzung einer eigenen Matomo-Instanz muss die Matomo-Konfiguration in allen Plattformen in `public/matomo.js` angepasst werden.

## Container-Nutzung für konkrete Anwendungsfälle

Je nach Anwendungsfall, müssen zusätzliche Container gestartet werden.

### Administration

SMB Admin erlaubt die Content-Pflege für die einzelen Plattformen. Der Content wird über die API `core/hasura` in der Datenbank `core/postgres`)gespeichert. Für die Administration ist eine Authentifizierung über einen Webhook `hasura-auth` notwendig. Alle dafür notwendigen Container sind oben beschrieben. Startsequenz:
1. s.o.
2. react-admin: `npm run start`

Die Museumsgrundriss-Informationen für die Touren werden in einer Graph-DB (`core/orientdb`) hinterlegt. Dieser Container muss für die Administration der Touren demnach zusätzlich gestartet werden.

**Hinweis**: Die Verwendung des Admin UI ist nur für Administratoren und Redakteure möglich. Bei Verwendung einer eigenen Instanz, muss daher zuvor ein Benutzer mit der Rolle "admin" oder "editor" angelegt werden. Es gibt zurzeit weder eine Registrierung noch die Möglichkeit sein Passwort selbst zu vergeben. Ein Administrator muss sich mit dem Admin Secret in die Hasura Admin-Console einloggen und den Benutzer in der Datenbank anlegen. Um ein Passwort zu erzeugen, werden die Postgres-Funktionen crypt und gen_salt (Blowfish Algorithmus 'bf') verwendet. Die Rechte des Redakteurs werden über die Spalte "editor_scope" definiert. Gültige Werte sind INTRO, TOPICS, GUIDE und SYSTEM - auch beliebig kombinierbar mit Pipe-Symbol getrennt.

_Beispiel_

`INSERT INTO smb.user (email, password, role_id, editor_scope) VALUES ('max.muster', crypt('hier-steht-das-passwort', gen_salt('bf', 10)), 1, 'TOPICS|GUIDE');`

### Intro

SMB Intro nutzt keine zusätzlichen Services. Alle notwendigen Container sind oben beschrieben. Startsequenz:
1. s.o.
2. react-landingpage: `npm run start`

### Recherche

SMB Recherche nutzt zusätzlich den Search-Webservice (`search-indexer`), welcher wiederum Elasticsearch (`core/elasticsearch`) verwendet. Startsequenz:
1. s.o.
2. core/elasticsearch
3. search-indexer
4. react-research: `npm run start`

### Touren

Aktuell werden die Daten für SMB Touren noch im Admin (`react-admin`) gepflegt. Zukünftig werden die Museumsgrundriss-Informationen für die Touren allerdings aus einer Graph-DB (`core/orientdb`) geladen. Es empfiehlt sich daher, den entsprechenden Container bei der Nutzung von Touren mitzustarten. Startsequenz:
1. s.o.
2. core/orientdb
3. react-guide: `npm run start`

### Themen

SMB Themen nutzt keine zusätzlichen Services. . Alle notwendigen Container sind oben beschrieben. Startsequenz:
1. s.o.
2. react-topics: `npm run start`

## Lizenz

Copyright (c) 2020-2022 / museum4punkt0

Die hier veröffentlichte Anwendung wird unter der GNU GPLv3 Lizenz veröffentlicht. Sämtliche verwendete Programmteile Dritter sind mit der jeweiligen Lizenz in der Datei `react-component-library/LICENSES` aufgeführt. Alle verwendeten Bibliotheken stehen unter Open-Source Lizenzen. Diese sind:
- Apache 2.0
- Artistic-2.0
- BSD
- ISC
- LGPL-3.0
- MIT
- Public Domain
- WTFPL
