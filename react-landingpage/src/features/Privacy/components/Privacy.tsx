import React from 'react';
import { ReactElement } from 'react';
import { Grid } from '@material-ui/core';
import useStyles from './privacy.jss';

//todo use smb lib
import LanguageService from '../../../utils/LanguageService';
import { loadConfig } from '@smb/smb-react-components-library';

/* eslint-disable no-irregular-whitespace */
export const privacyText = `<h1 id="datenschutzerklärung">Datenschutzerklärung</h1>
<h2 id="datenschutz-auf-dieser-website">Datenschutz auf dieser Website</h2>
<p>Es ist den Staatlichen Museen zu Berlin – Preußischer Kulturbesitz ein wichtiges Anliegen, verantwortungsvoll mit Ihren persönlichen Daten umzugehen. Daher wird in den folgenden Abschnitten erläutert:</p>
<ul>
<li><p>warum die Staatlichen Museen zu Berlin Daten erheben und speichern</p></li>
<li><p>welche Rechte Nutzer dieser Website haben</p></li>
<li><p>wie die Staatlichen Museen zu Berlin die Daten erheben und welche Daten sie speichern</p></li>
<li><p>welche Arten von Cookies auf der Website der Staatlichen Museen zu Berlin eingesetzt werden</p></li>
<li><p>wie Sie der Datenerfassung widersprechen oder diese vermeiden können</p></li>
<li><p>wer für die Websites der Staatlichen Museen zu Berlin und den Datenschutz verantwortlich ist</p></li>
</ul>
<h3 id="warum-erheben-die-staatlichen-museen-zu-berlin-daten-und-setzen-nutzungsanalyse-software-ein">1. Warum erheben die Staatlichen Museen zu Berlin Daten und setzen Nutzungsanalyse-Software ein?</h3>
<p>Wir erheben und verwenden personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Zum Beispiel ist die vorübergehende Speicherung der IP-Adresse durch das System technisch notwendig, um eine stabile und sichere Auslieferung der Website an den Rechner des Nutzers zu ermöglichen. Hierfür muss z. B. die anonymisierte IP-Adresse des Nutzers für die Dauer von 60 Tagen gespeichert werden bleiben. Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich sind.</p>
<p>Die Staatlichen Museen zu Berlin analysieren die Nutzung ihrer Website. Dadurch erhalten sie Informationen, um ihr Webangebot zu verbessern. Dazu zählt zum Beispiel das Wissen, wie oft bestimmte Inhalte aufgerufen wurden oder mit welchem Browser die Website betrachtet wurde. Die gespeicherten anonymisierten/pseudonymisierten Daten verwenden die Staatlichen Museen zu Berlin ausschließlich zu statistischen Zwecken. Eine andere Nutzung der Daten oder eine Weitergabe an Dritte erfolgt nicht.</p>
<h3 id="welche-rechte-haben-nutzer-unserer-websites">2. Welche Rechte haben Nutzer unserer Websites?</h3>
<p>In Bezug auf Ihre personenbezogenen Daten haben Sie uns gegenüber folgende Rechte:</p>
<ul>
<li><p>das Recht auf Auskunft (Art. 15 DSGVO),</p></li>
<li><p>das Recht auf Berichtigung und Löschung (Art. 16+17 DSGVO),</p></li>
<li><p>das Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO),</p></li>
<li><p>das Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO),</p></li>
<li><p>das Recht auf Datenübertragbarkeit (Art. 20).</p></li>
</ul>
<p>Sie haben zusätzlich das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren (Art. 77 DSGVO). Für die Staatlichen Museen zu Berlin ist die Bundesbeauftragte für Datenschutz und Informationsfreiheit (BfDI) zuständig.</p>
<h3 id="welche-daten-werden-erhoben">3. Welche Daten werden erhoben?</h3>
<h4 id="a-bereitstellung-der-website-und-erstellung-von-logfiles">a) Bereitstellung der Website und Erstellung von Logfiles</h4>
<p>Bei jedem Aufruf unserer Internetseiten erfasst unser System automatisiert Daten und Informationen vom Computersystem des aufrufenden Rechners. Diese Verarbeitung der personenbezogenen Daten erfolgt auf Grundlage von Art.6 Abs. 1 lit f. der DSGVO. Folgende Daten werden hierbei erhoben:</p>
<ul>
<li><p>IP-Adressen</p></li>
<li><p>Log-Dateien</p></li>
<li><p>Bestandsdaten, Verkehrsdaten und Inhaltsdaten der Websites</p></li>
<li><p>Fehlerprotokolle</p></li>
</ul>
<p>Durch Log-Dateien können Websitebetreiber Aktivitäten auf ihrer Website nachvollziehen. Die Access-Logs der Webserver protokollieren, welche Seitenaufrufe zu welchem Zeitpunkt stattgefunden haben. Sie beinhalten folgende Daten: IP, Verzeichnisschutzbenutzer, Datum, Uhrzeit, aufgerufene Seiten, Protokolle, Statuscode, Datenmenge, Referrer, User Agent, aufgerufener Hostname.</p>
<p>Die Website der Sammlungen Online wird durch die xailabs GmbH auf den Servern der Firma Hetzner gehostet. Hetzner speichert die Daten für folgende Zeiträume:</p>
<ul>
<li><p>Die IP-Adressen werden anonymisiert gespeichert. Hierzu werden die letzten drei Ziffern entfernt, d.h. aus 127.0.0.1 wird 127.0.0.*. IPv6-Adressen werden ebenfalls anonymisiert. Die anonymisierten IP-Adressen werden für 60 Tage aufbewahrt. Angaben zum verwendeten Verzeichnisschutzbenutzer werden nach einem Tag anonymisiert.</p></li>
<li><p>Error-Logs, welche fehlerhafte Seitenaufrufe protokollieren, werden nach sieben Tagen gelöscht. Diese beinhalten neben den Fehlermeldungen die zugreifende IP-Adresse und je nach Fehler die aufgerufene Website.</p></li>
<li><p>Zugriffe über FTP werden anonymisiert protokolliert und für 60 Tage aufbewahrt.</p></li>
</ul>
<p>Die Staatlichen Museen zu Berlin haben die Firma xailabs GmbH sorgfältig ausgewählt. Mit dem Dienstleister wurde ein Vertrag zur Auftragsverarbeitung geschlossen. xailabs ist an die Weisungen der Staatlichen Museen zu Berlin gebunden und wird regelmäßig kontrolliert.</p>
<h4 id="b-welche-cookies-setzt-diese-website-ein">b) Welche Cookies setzt diese Website ein?</h4>
<p>Cookies sind kleine Textdateien, die beim Besuch einer Website auf Ihrem Computer dem von Ihnen genutzten Browser zugeordnet gespeichert werden. Über Cookies können Informationen zwischen Computerprogrammen ausgetauscht oder für einen beschränkten Zeitraum gespeichert werden. Von den gespeicherten Cookies werden bestimmte Informationen an unsere Seite übermittelt. Sie können jedoch keine Programme ausführen oder Viren auf Ihren Computer übertragen.</p>
<p>Cookies können nur gespeichert werden, wenn Sie dies in den Einstellungen Ihres Browsers erlaubt haben. Daher haben Sie als Nutzer auch die volle Kontrolle über die Verwendung von Cookies. Durch eine Änderung der Einstellungen in Ihrem Internetbrowser können Sie die Übertragung von Cookies deaktivieren oder einschränken. Bereits gespeicherte Cookies können jederzeit gelöscht werden. Dies kann auch automatisiert erfolgen.</p>
<p>Bei jedem Zugriff auf eine Website im Internet und bei jedem Abruf einer Datei werden von Browsern üblicherweise Daten übertragen. Die Verarbeitung der personenbezogenen Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f. Von den Daten, die übermittelt werden, wenn Sie diese Website besuchen, speichern die Staatlichen Museen zu Berlin folgende Informationen:</p>
<ul>
<li><p>Browsertyp/-version</p></li>
<li><p>Betriebssystem</p></li>
<li><p>Referrer-URL (die weiterleitende Seite)</p></li>
<li><p>Datum und Uhrzeit der Serveranfrage</p></li>
<li><p>Aufgerufene Seite/n und Datei/en</p></li>
<li><p>übertragene Datenmenge</p></li>
<li><p>Anonymisierte/pseudonymisierte IP-Adresse</p></li>
<li><p>Herkunftsland</p></li>
<li><p>Meldung, ob der Zugriff/Abruf erfolgreich war.</p></li>
</ul>
<p>Die Website der Staatlichen Museen zu Berlin verwendet Cookies sehr sparsam. Das bedeutet, dass Sie diese Website grundsätzlich auch ohne Cookies betrachten können. Die auf dieser Website eingesetzten Cookies haben zwei unterschiedliche Funktionen:</p>
<ul>
<li><p>Ein Teil der eingesetzten Cookies (sog. transiente Cookies) gewährleistet, dass die Website einwandfrei funktioniert und angezeigt wird. Die Gültigkeit dieser Cookies ist auf den Websitebesuch beschränkt. Sobald Sie Ihren Browser beenden, werden diese sogenannten <em>Session-Cookies</em> gelöscht.</p></li>
<li><p>Für die Webanalyse setzen die Staatlichen Museen zu Berlin die von Datenschützern empfohlene Nutzungsanalyse-Software Matomo (vormals Piwik) ein. Die Verarbeitung der personenbezogenen Daten der Nutzer ermöglicht uns eine Analyse des Surfverhaltens unserer Nutzer. Wir sind durch die Auswertung der gewonnenen Daten in der Lage, Informationen über die Nutzung der einzelnen Komponenten unseres Webangebots zusammenzustellen. Dies hilft uns dabei, unser Webangebot und seine Nutzerfreundlichkeit stetig zu verbessern. Durch eine automatische Anonymisierung/Pseudonymisierung der IP-Adressen können die erhobenen Daten nicht mehr bestimmten Personen zugeordnet werden. Damit ist ausgeschlossen, dass Nutzungsdaten oder Nutzungsprofile mit personenbezogenen Daten in Verbindung gebracht werden. Die Software läuft dabei ausschließlich auf den Servern unseres Webangebots. Eine Speicherung der personenbezogenen Daten der Nutzer findet nur dort statt. Eine Weitergabe der Daten an Dritte erfolgt nicht.</p></li>
</ul>
<h4 id="cookie-einstellungen-zur-datenerfassung-durch-die-webanalyse-software-matomo">Cookie-Einstellungen zur Datenerfassung durch die Webanalyse-Software Matomo</h4>
<p>Es werden keine Cookies zu Zwecken der Analyse oder des Trackings eingesetzt.</p>
<p>Nähere Informationen zu den Privatsphäreeinstellungen in Matomo finden Sie unter folgendem Link: <a href="https://matomo.org/docs/privacy/">https://matomo.org/docs/privacy/</a>.</p>
<h3 id="wer-ist-für-inhalte-und-pflege-der-website-verantwortlich-und-wer-kümmert-sich-um-den-datenschutz">4. Wer ist für Inhalte und Pflege der Website verantwortlich und wer kümmert sich um den Datenschutz?</h3>
<p>Für diese Website sind im Sinne des Datenschutzes die Staatlichen Museen zu Berlin – Preußischer Kulturbesitz verantwortlich, gesetzlich vertreten durch Prof. Dr. hc. mult. Hermann Parzinger, den Präsident der Stiftung Preußischer Kulturbesitz.</p>
<p>Staatliche Museen zu Berlin – Preußischer Kulturbesitz<br />
Generaldirektion<br />
Stauffenbergstraße 41<br />
10785 Berlin<br />
Deutschland</p>
<p>Telefon: +49 (0)30 2660<br />
Website: <a href="http://www.smb.museum">www.smb.museum</a></p>
<h5 id="ansprechpartner-zum-datenschutz-in-der-stiftung-preußischer-kulturbesitz">Ansprechpartner zum Datenschutz in der Stiftung Preußischer Kulturbesitz</h5>
<p>Für Fragen zum Bereich Datenschutz gibt es in der Stiftung Preußischer Kulturbesitz eine Datenschutzbeauftragte als Kontaktperson, die Sie unter unserer vorgenannten Postanschrift mit dem Zusatz „Datenschutzbeauftragte“ oder wie folgt erreichen können:</p>
<p>E-Mail: Datenschutzbeauftragte@hv.spk-berlin.de<br />
Website der Stiftung Preußischer Kulturbesitz: <a href="http://www.preussischer-kulturbesitz.de/service/kontakt/ansprechpartnerinnen/interessenvertretungen.html" class="uri">http://www.preussischer-kulturbesitz.de/service/kontakt/ansprechpartnerinnen/interessenvertretungen.html</a></p>
<h3 id="änderung-der-datenschutzerklärung">5. Änderung der Datenschutzerklärung</h3>
<p>Die Staatlichen Museen zu Berlin behalten sich vor, die Datenschutzerklärung entsprechend der technischen Weiterentwicklung und veränderter gesetzlicher Rahmenbedingungen anzupassen. Den jeweiligen Stand dieser Datenschutzerklärung finden Sie am Ende der Erklärung.</p>
<p>Stand: Juni 2018</p>
`;

function Privacy(): ReactElement {
  const classes = useStyles();

  function createMarkup() {
    return { __html: privacyText };
  }

  const lang = LanguageService.getCurrentLanguage();
  const config = loadConfig(process.env.REACT_APP_STAGE ?? null);
  const matomoParams = `?module=CoreAdminHome&action=optOut&language=${lang}&backgroundColor=&fontColor=&fontSize=16px&fontFamily=Arial`;
  
  return (
    <Grid className={classes.content} data-testid={'page-privacy-wrapper'}>
      <Grid container justify="center">
        <Grid item container justify="space-between" className={classes.text}>
          <Grid item>
            <div
              dangerouslySetInnerHTML={createMarkup()}
              style={{ color: 'black' }}
            />
          </Grid>
          <iframe
            className={classes.iframe}
            src={`${config.MATOMO_URL}${matomoParams}`}
          ></iframe>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Privacy;
