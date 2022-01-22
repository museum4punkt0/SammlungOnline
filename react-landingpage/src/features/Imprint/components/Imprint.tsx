import React from 'react';
import { ReactElement } from 'react';
import { Grid } from '@material-ui/core';

import useStyles from './imprint.jss';

/* eslint-disable no-irregular-whitespace */
export const imprintText = `<h1 id="impressum">Impressum</h1>
<p>Die nachstehenden Informationen enthalten die gesetzlich vorgesehenen Pflichtangaben zur Anbieterkennzeichnung, sowie wichtige rechtliche Hinweise zur Internetpräsenz der Staatlichen Museen zu Berlin – Preußischer Kulturbesitz.</p>
<h2 id="anbieter">Anbieter</h2>
<p>Anbieter dieser Internetpräsenz ist im Rechtssinne die Stiftung Preußischer Kulturbesitz: Staatliche Museen zu Berlin – Preußischer Kulturbesitz.</p>
<p>Staatliche Museen zu Berlin – Preußischer Kulturbesitz<br />
Generaldirektion<br />
Stauffenbergstraße 41<br />
10785 Berlin</p>
<p>Telefon: 030 / 2660<br />
E-Mail: kommunikation@smb.spk-berlin.de</p>
<h3 id="vertreter">Vertreter</h3>
<p>Die Stiftung Preußischer Kulturbesitz wird gesetzlich vertreten durch Ihren Präsidenten, Herrn Prof. Dr. Dr. hc. mult. Hermann Parzinger. Dieser wird vertreten durch den Generaldirektor der Staatlichen Museen zu Berlin – Preußischer Kulturbesitz, Herrn Prof. Dr. Michael Eissenhauer.</p>
<h4 id="umsatzsteueridentifikationsnummer">Umsatzsteueridentifikationsnummer</h4>
<p>Die Umsatzsteueridentifikationsnummer der Staatlichen Museen zu Berlin – Preußischer Kulturbesitz lautet: DE 136630206</p>
<h3 id="projektbezogene-informationen">Projektbezogene Informationen</h3>
<p>Die Neugestaltung der Sammlungen Online der Staatlichen Museen zu Berlin ist eine Entwicklung aus dem Teilprojekt “Visitor Journeys neu gedacht - digitale Erweiterung des Museumsbesuchs” (2017-2020) der Staatlichen Museen zu Berlin im Verbundprojekt museum4punkt0.</p>
<p>Gefördert von der Beauftragten der Bundesregierung für Kultur und Medien aufgrund eines Beschlusses des Deutschen Bundestages.</p>
<p><img src="https://raw.githubusercontent.com/museum4punkt0/media_storage/2c46af6cb625a2560f39b01ecb8c4c360733811c/BKM_Fz_2017_Web_de.gif" alt="Logo Foerderung BKM" width="243"/> <img src="https://raw.githubusercontent.com/museum4punkt0/media_storage/2c46af6cb625a2560f39b01ecb8c4c360733811c/BKM_Neustart_Kultur_Wortmarke_neg_RGB_RZ.png" alt="Logo Neustart Kultur" width="243"/></p>
<h4 id="projektleitung">Projektleitung</h4>
<p><a href="https://www.museum4punkt0.de/teilprojekt/visitor-journeys-neu-gedacht-digitale-erweiterung-des-museumsbesuchs">Teilprojekt “Visitor Journeys neu gedacht - digitale Erweiterung des Museumsbesuchs”</a> der Staatlichen Museen zu Berlin im Verbundprojekt museum4punkt0</p>
<p>Dienstsitz:<br />
Projektbüro museum4punkt0<br />
Paderborner Straße 2<br />
10709 Berlin<br />
E-Mail: m4p0.m1@smb.spk-berlin.de</p>
<h4 id="konzept-design-und-umsetzung">Konzept, Design und Umsetzung</h4>
<p>Teilprojektteam mit xailabs GmbH</p>
<h4 id="museumsdokumentationssystem">Museumsdokumentationssystem</h4>
<p>Michael Noack, Zentraler Programmadministrator Museumsdokumentationssystem Helen Reich, Museumsdokumentationssystem</p>
<h4 id="technische-administration-und-produktion">Technische Administration und Produktion</h4>
<p>xailabs GmbH</p>
<h3 id="urheber--und-nutzungsrechte">Urheber- und Nutzungsrechte</h3>
<h4 id="texte-und-bilder">Texte und Bilder</h4>
<p>Alle textlichen Bestandteile dieser Website stehen unter einer <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.de">CC NC-BY-SA-Lizenz</a>.</p>
<p>Bei allen anderen Inhalten (Bilder, Videos, Audiodateien) ist die jeweilige Lizenzierung im Copyright-Vermerk angegeben.</p>
<p>So die Stiftung Preußischer Kulturbesitz an Inhalten die notwendigen Rechte besitzt, sind diese mit dem entsprechenden CC-Logo oder dem Zusatz „CC NC-BY-SA" gekennzeichnet.</p>
<p>Falls Sie eine kommerzielle Nutzung des Bildermaterials dieser Seite beabsichtigen, wenden Sie sich bitte an die <a href="https://www.bpk-bildagentur.de/">bpk – Bildagentur Preußischer Kulturbesitz</a>.</p>
<p>Für alle anderen Inhalte sowie für das Layout der Website gilt allgemeines Urheberrecht.</p>
<p>Der Quellcode dieser Anwendung ist unter der Lizenz „GNU General Public License v3.0" veröffentlicht. Dieser ist im <a href="https://www.github.com/museum4punkt0">Repository des Verbundprojekts museum4punkt0</a> einzusehen und für weitere Anwendungen verwendbar.</p>
<p>Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei bekannt werden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>
<h3 id="rechtliche-hinweise-zur-haftung-disclaimer">Rechtliche Hinweise zur Haftung / Disclaimer</h3>
<p>Die Staatlichen Museen zu Berlin – Preußischer Kulturbesitz sind um Richtigkeit und Aktualität der auf dieser Internetpräsenz bereitgestellten Informationen bemüht. Trotzdem können Fehler und Unklarheiten nicht vollständig ausgeschlossen werden. Die Staatlichen Museen zu Berlin – Preußischer Kulturbesitz übernehmen daher keinerlei Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder Qualität der bereitgestellten Informationen.</p>
<p>Für Schäden materieller oder immaterieller Art, die durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen unmittelbar oder mittelbar verursacht werden, haften die Staatlichen Museen zu Berlin – Preußischer Kulturbesitz nicht, sofern ihnen nicht nachweislich vorsätzliches oder grob fahrlässiges Verschulden zur Last fällt. Gleiches gilt für kostenlos zum Download bereitgehaltene Software.<br />
Alle Angebote sind freibleibend und unverbindlich. Die Staatlichen Museen zu Berlin – Preußischer Kulturbesitz behalten es sich ausdrücklich vor, Teile des Internetangebotes oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.</p>
<p>Die Verantwortlichkeit für <em>fremde Inhalte</em>, die beispielsweise durch direkte oder indirekte Verknüpfungen (z. B. so genannte <em>Links</em>) zu anderen Anbietern bereitgehalten werden, setzt unter anderem positive Kenntnis des rechtswidrigen bzw. strafbaren Inhaltes voraus. <em>Fremde Inhalte</em> sind in geeigneter Weise gekennzeichnet. Die Staatlichen Museen zu Berlin – Preußischer Kulturbesitz haben auf <em>fremde Inhalte</em> keinerlei Einfluss und machen sich diese Inhalte auch nicht zu Eigen. Die Staatlichen Museen zu Berlin – Preußischer Kulturbesitz haben keine positive Kenntnis über rechtswidrige oder anstößige Inhalte auf den verknüpften Seiten fremder Anbieter. Sollten auf den verknüpften Seiten fremder Anbieter dennoch rechtswidrige oder anstößige Inhalte enthalten sein, so distanzieren sich die Staatlichen Museen zu Berlin – Preußischer Kulturbesitz von diesen Inhalten ausdrücklich.</p>
<p>Die Staatlichen Museen zu Berlin – Preußischer Kulturbesitz sind bestrebt, in allen Publikationen die Urheberrechte der verwendeten Grafiken, Tondokumente, Videosequenzen und Texte zu beachten, von ihnen selbst erstellte Grafiken, Tondokumente, Videosequenzen und Texte zu nutzen oder auf lizenzfreie Grafiken, Tondokumente, Videosequenzen und Texte zurückzugreifen.<br />
Alle innerhalb des Internetangebotes genannten und ggf. durch Dritte geschützten Marken- und Warenzeichen unterliegen uneingeschränkt den Bestimmungen des jeweils gültigen Kennzeichenrechts und den Besitzrechten der jeweiligen eingetragenen Eigentümer. Allein aufgrund der bloßen Nennung ist nicht der Schluss zu ziehen, dass Markenzeichen nicht durch Rechte Dritter geschützt sind!</p>
<h3 id="rechtswirksamkeit-dieses-haftungsausschlusses">Rechtswirksamkeit dieses Haftungsausschlusses</h3>
<p>Dieser Haftungsausschluss ist als Teil des Internetangebotes zu betrachten, von dem aus auf diese Seite verwiesen wurde. Sofern Teile oder einzelne Formulierungen dieses Textes der geltenden Rechtslage nicht, nicht mehr oder nicht vollständig entsprechen sollten, bleiben die übrigen Teile des Dokumentes in ihrem Inhalt und ihrer Gültigkeit davon unberührt.</p>
`;

function Imprint(): ReactElement {
  const classes = useStyles();

  function createMarkup() {
    return { __html: imprintText };
  }

  return (
    <Grid className={classes.content} data-testid={'page-imprint-wrapper'}>
      <Grid container justify="center">
        <Grid item container justify="space-between" className={classes.text}>
          <Grid item>
            <div
              key={Date()}
              dangerouslySetInnerHTML={createMarkup()}
              style={{ color: 'black' }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Imprint;
