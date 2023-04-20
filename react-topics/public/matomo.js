const hostParts = window.location.host.split('.');
const ext = hostParts.length > 1 ? hostParts[hostParts.length - 1] : 'dev';

const envs = [
  {
    name: 'production',
    siteID: '1',
    extension: 'museum',
    domains: [
      '*.sammlung.smb.museum',
      '*.recherche.smb.museum',
      '*.themen.smb.museum',
      '*.touren.smb.museum',
    ],
    trackingDomain: '//admin.smb.museum/matomo/',
    cookieUrl: '*.sammlung.smb.museum',
  },
  {
    name: 'stage',
    siteID: '1',
    extension: 'net',
    domains: [
      '*.smb-landingpage.xaidev.net',
      '*.smb-guide.xaidev.net',
      '*.smb-research.xaidev.net',
      '*.smb-topics.xaidev.net',
    ],
    trackingDomain: '//smb-admin.xaidev.net/matomo/',
    cookieUrl: '*.smb-landingpage.xaidev.net',
  },
  {
    name: 'dev',
    extension: 'dev',
    siteID: '1',
    domains: [
      '*.smb-landingpage.xailabs.dev',
      '*.smb-guide.xailabs.dev',
      '*.smb-research.xailabs.dev',
      '*.smb-topics.xailabs.dev',
    ],
    trackingDomain: '//smb-matomo.xailabs.dev/',
    cookieUrl: '*.smb-landingpage.xailabs.dev',
  },
];

function getEnv(ext) {
  return envs.find((env) => env.extension === ext);
}

const env = getEnv(ext);

var _paq = (window._paq = window._paq || []);
_paq.push(['setDocumentTitle', document.domain + '/' + document.title]);
_paq.push(['setCookieDomain', env.cookieUrl]);
_paq.push(['setDomains', env.domains]);
_paq.push(['setDoNotTrack', true]);
_paq.push(['disableCookies']);
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function () {
  var u = env.trackingDomain;
  _paq.push(['setTrackerUrl', u + 'matomo.php']);
  _paq.push(['setSiteId', env.siteID]);
  var d = document,
    g = d.createElement('script'),
    s = d.getElementsByTagName('script')[0];
  g.type = 'text/javascript';
  g.async = true;
  g.src = u + 'matomo.js';
  s.parentNode.insertBefore(g, s);
})();
