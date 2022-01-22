import React from 'react';
import { ReactElement } from 'react';
import { Grid } from '@material-ui/core';

import useStyles from './accessibility.jss';

export const accessibilityText = `<h1 id="erklärung-zur-digitalen-barrierefreiheit">Erklärung zur digitalen Barrierefreiheit</h1>
<p>Diese Erklärung zur digitalen Barrierefreiheit gilt für die unter https://sammlung.smb.museum veröffentlichte Website der Staatliche Museen zu Berlin – Preußischer Kulturbesitz.</p>
<p>Als öffentliche Stelle im Sinne der Richtlinie (EU) 2016/2102 sind wir bemüht, unsere Websites und mobilen Anwendungen im Einklang mit den Bestimmungen des Behindertengleichstellungsgesetzes des Bundes (BGG) sowie der Barrierefreien-Informationstechnik-Verordnung (BITV 2.0) zur Umsetzung der Richtlinie (EU) 2016/2102 barrierefrei zugänglich zu machen.</p>
<h2 id="stand-der-vereinbarkeit-mit-den-anforderungen">Stand der Vereinbarkeit mit den Anforderungen</h2>
<p>Die Anforderungen der Barrierefreiheit ergeben sich aus §§ 3 Absätze 1 bis 4 und 4 der BITV 2.0, die auf der Grundlage von § 12d BGG erlassen wurde.</p>
<p>Die Überprüfung der Einhaltung der Anforderungen beruht auf einer im Zeitraum vom 1. bis 17 Mai 2021 durchgeführten Selbstbewertung.</p>
<p>Aufgrund der Überprüfung ist die Website mit den zuvor genannten Anforderungen wegen der folgenden Unvereinbarkeiten teilweise vereinbar.</p>
<p>Teilbereiche, die nicht barrierefrei sind:</p>
<h4 id="bilder">Bilder:</h4>
<p>Nicht alle Bilder und Grafiken enthalten Alternativtexte.</p>
<h4 id="textlinks">Textlinks:</h4>
<p>Einige Textlinks, die auf weiterführende Inhalte verweisen, enthalten die Formulierung "mehr Informationen", "mehr erfahren" etc., unterscheiden sich also nicht voneinander, auch nicht, wenn mehrere davon auf einer Seite eingebunden sind. In diesen Fällen bietet das verwendete CMS aktuell keine technische Alternative an.</p>
<h4 id="screenreader-kompatibilität">Screenreader-Kompatibilität:</h4>
<p>Nicht alle Bilder, Grafiken und Regionen der Webseiten-Struktur sind mit Alternativtexten und Definitionen hinterlegt.</p>
<h4 id="leichte-sprache-und-deutsche-gebärdensprache">Leichte Sprache und Deutsche Gebärdensprache:</h4>
<p>Es fehlen Informationen in Deutscher Gebärdensprache und Leichter Sprache.</p>
<h4 id="externe-inhalte">Externe Inhalte:</h4>
<p>Externe Websites und Dokumente, auf die wir verlinken, sind nicht zwingend barrierefrei.</p>
<h4 id="begründung">Begründung</h4>
<p>Die Staatlichen Museen zu Berlin arbeiten beständig daran, die Zugänglichkeit ihrer Online-Angebote zu verbessern. Für die sukzessiv zu erreichende Umsetzung der digitalen Barrierefreiheit im Sinne von BITV 2.0 und WCAG 2.1 werden wir im Jahre 2021 weiterhin mit externer fachlicher Beratung und Expert*innen in eigener Sache zusammenarbeiten.</p>
<p>Dabei fokussieren wir zunächst die Umsetzung einer barrierefreien und inklusiven Webseitennavigation und -grundstruktur, die sowohl in Leichter Sprache als auch in Deutscher Gebärdensprache angeboten wird. Zudem möchten wir eine Suchfunktion aller barrierefreien Inhalte anbieten. Unser Ziel ist es, Besucher*innen bei der Berücksichtigung ihrer unterschiedlichen Bedürfnisse miteinzubeziehen, und somit technische wie inhaltliche Voraussetzung zu schaffen, damit möglichst viele Menschen unser digitales Angebot nutzen möchten.</p>
<h2 id="datum-der-erstellung-bzw.-der-letzten-aktualisierung-der-erklärung">Datum der Erstellung bzw. der letzten Aktualisierung der Erklärung</h2>
<p>Diese Erklärung wurde am 17. Mai 2021 erstellt und zuletzt am 17. Mai 2021 aktualisiert.</p>
<h2 id="barrieren-melden-kontakt-zu-den-feedback-ansprechpartnerinnen">Barrieren melden: Kontakt zu den Feedback-Ansprechpartner*innen</h2>
<p>Sind Ihnen Mängel beim barrierefreien Zugang zu Inhalten dieser Webseite aufgefallen? Oder haben Sie Fragen zum Thema Barrierefreiheit? Dann können Sie sich gerne bei uns melden:</p>
<p>Staatliche Museen zu Berlin – Preußischer Kulturbesitz<br />
Generaldirektion<br />
Stauffenbergstraße 41<br />
10785 Berlin</p>
<p>Telefon: 030 / 2660<br />
E-Mail: kommunikation@smb.museum</p>
<h2 id="schlichtungsverfahren">Schlichtungsverfahren</h2>
<p>Wenn auch nach Ihrem Feedback an den oben genannten Kontakt keine zufriedenstellende Lösung gefunden wurde, können Sie sich an die Schlichtungsstelle nach § 16 BGG wenden. Die Schlichtungsstelle BGG hat die Aufgabe, bei Konflikten zum Thema Barrierefreiheit zwischen Menschen mit Behinderungen und öffentlichen Stellen des Bundes eine außergerichtliche Streitbeilegung zu unterstützen. Das Schlichtungsverfahren ist kostenlos. Es muss kein Rechtsbeistand eingeschaltet werden. Weitere Informationen zum Schlichtungsverfahren und den Möglichkeiten der Antragstellung erhalten Sie auf der <a href="https://www.behindertenbeauftragter.de/DE/SchlichtungsstelleBGG/SchlichtungsstelleBGG_node.html">Website der Schlichtungsstelle</a>.</p>
<p>Direkt kontaktieren können Sie die Schlichtungsstelle BGG unter info@schlichtungsstelle-bgg.de.</p>
`;

function Accessibility(): ReactElement {
  const classes = useStyles();

  function createMarkup() {
    return { __html: accessibilityText };
  }

  return (
    <Grid
      className={classes.content}
      data-testid={'page-accessibility-wrapper'}
    >
      <Grid container justify="center">
        <Grid item container justify="space-between" className={classes.text}>
          <Grid item>
            <div
              dangerouslySetInnerHTML={createMarkup()}
              style={{ color: 'black' }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Accessibility;
