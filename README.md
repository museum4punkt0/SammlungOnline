# SMB Online Sammlungen

Die Online Sammlungen der SMB zeigen derzeit mehr als 250.000 Datensätze zu Objekten aus den unterschiedlichsten Epochen und Regionen der Welt.
Die Neugestaltung der Online Sammlungen verfolgt dabei folgende Ziele:
1. Die Objekte der Staatlichen Museen sollen im Digitalen Raum und international angemessen zeitgemäß zugänglich und recherchierbar gemacht werden.
2. Die Sichtbarkeit der SMB im Digitalen Raum soll erhöht werden.
3. Die Diversität der Online BesucherInnen soll verstärkt und die Zahl der Online BesucherInnen erhöht werden.

Beim Besuch der Online Sammlungen weisen BesucherInnen individuelle und spezifischen Motivationen und Bedürfnisse auf. Um diesen individuellen Zugriffen
auf die Objekte der Online Sammlung gerecht zu werden, stehen die Objekte der Sammlungen im Mittelpunkt. Durch verschiedene Themenformate, werden für
die individuellen Motivationen der Online BesucherInnen, individuelle Zugänge zu den Objekten geschaffen. Die Online Sammlungen wurden modular wachsend
sowie mit der Möglichkeit der mehrsprachigen Nutzung geplant.

Die einzelen Themenformate wurden als separate Plattformen umgesetzt, die im Folgenden kurz beschrieben werden. Alle dieser Plattformen nutzen modulare Komponenten
aus einer geteilten Bibliothek `react-component-library` sowie von [bit.dev](https://bit.dev/xai_mb/smb).

## SMB Intro
SMB Intro `react-landingpage` dient als Landingpage für die Online Sammlungen. Hier werden die verschiedenen Plattformen geteasert und zu einem Portal zusammengefügt.

## SMB Research 
SMB Research `react-research` bildet den Zugang der Scientific Community zu den Sammlungen ab. Ziel dieser Anwendung ist das professionelle und effektive Forschen
und Arbeiten an und mit den Sammlungen sowie die Objektrecherche. SMB Research ist als Such-Portal mit Objektdetailseiten umgesetzt.

## SMB Guide 
SMB Guide `react-guide` ist die Brücke der Online Sammlung in die Häuser der Staatlichen Museen zu Berlin. Online BesucherInnen soll es ermöglicht werden, aktuelle
Informationen zu den Ausstellungsorten von Objekten in den Museen zu erhalten und themenbezogene oder eigene Führungen aus SMB Guide zusammenzustellen,
um den Museumsbesuch zu planen und zu begleiten. SMB Guide zeigt kuratierte Routen durch die Online Sammlungen, wobei die einzelnen Objekte in einen
gemeinsamen Kontext in Form einer Tour gesetzt werden. 

## SMB Topics
SMB Topics `react-topics` soll explizit Online BesucherInnen ansprechen, die nicht die Möglichkeit haben regelmäßig die Häuser der SMB vor Ort zu besuchen. Dennoch sollen
ihre unterschiedlichen Motivationen als BesucherInnen durch die Anwendung erfüllt werden. Ähnlich wie bei SMB Guide werden die Objekte hier in einen
Themenkontext zusammengefasst, wobei die Themen verschiedene Besucherinteressen abfangen und als Einstiegspunkt in die Online Sammlungen dienen.

## SMB API
Um Sammlungsobjekte aus dem Museumdokumentationssystem in die verschiedenen Formate einzubinden und aktuell zu halten, benötigt es eine offene, 
URL-Request-basierte Schnittstelle (API `core/hasura`), die es ermöglicht Objektdaten dynamisch in Web-Anwendungen einzubinden. Hierfür steht eine generische GraphQL-API
zur Verfügung, die es erlaubt verschiedenste Daten und Attribute je nach Anwendungsfall abzufragen. Die Plattformen SMB Intro, SMB Guide und SMB Topics
nutzen diese generische API um die Plattform-Inhalte anzuzeigen. SMB Research nutzt einen dedizierten Search-Service `search-indexer`, der die GraphQL erweitert und eine
exemplarische Implementierung für zukünftige Web-Services auf Basis der öffentlichen API darstellt.

## Weitere Backend-Services
Um die Plattformen im Hintergrund mit den notwendigen Daten zu versorgen, sind weitere Backend-Services implementiert. Diese sind im einzelnen:

| Name           | Beschreibung                                                                                                   |
| -------------- | -------------------------------------------------------------------------------------------------------------- |
| hasura-auth    | Webhook Authentifizierungs-Service für Hasura                                                                  |
| mds-sync       | Service um den Daten-Index mit Änderungen im MDS zu synchronisieren                                            |
| react-admin    | Administrations-UI für die Pflege von Website-Content (Textblöcke, Themen, Touren)                             |
| search-indexer | Service für die Indizierung von Suchergebnissen mit Elasticsearch sowie Implementierung des Search-Webservices |
| sitemap        | Generierung und Bereitstellung der Sitemaps für SMD Research, SMB Guide und SMB Topics (SEO)                   |

## Infrastruktur-Komponenten
Im `core` befinden sich verwendete Docker-Container.