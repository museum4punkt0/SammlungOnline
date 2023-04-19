const hostParts = window.location.host.split('.');
const currentExtension =
  hostParts.length > 1 ? hostParts[hostParts.length - 1] : 'dev';

const envs = [
  { extension: 'dev', name: 'dev' },
  { extension: 'net', name: 'stage' },
  { extension: 'museum', name: 'production' },
];

const domains = {
  production: [
    '*.sammlung.smb.museum',
    '*.recherche.smb.museum',
    '*.themen.smb.museum',
    '*.touren.smb.museum',
  ],
  stage: [
    '*.smb-landingpage.xaidev.net',
    '*.smb-guide.xaidev.net',
    '*.smb-research.xaidev.net',
    '*.smb-topics.xaidev.net',
  ],
  dev: [
    '*.smb-landingpage.xailabs.dev',
    '*.smb-guide.xailabs.dev',
    '*.smb-research.xailabs.dev',
    '*.smb-topics.xailabs.dev',
  ]
};

const siteID = {
  production: '1',
  stage: '1',
  dev: '2',
}

const trackingDomains = {
  production: '//admin.smb.museum/matomo/',
  stage: '//smb-admin.xaidev.net/matomo/',
  dev: '//smb-matomo.xailabs.dev/',
};

const cookieUrls = {
  production: '*.sammlung.smb.museum',
  stage: '*.smb-landingpage.xaidev.net',
  dev: '*.smb-landingpage.xailabs.dev',
};

function getEnv(ext) {
  return envs.find((env) => env.extension === ext).name;
}

var env = getEnv(currentExtension);
var _paq = (window._paq = window._paq || []);
_paq.push(['setDocumentTitle', document.domain + '/' + document.title]);
_paq.push(['setCookieDomain', cookieUrls[env]]);
_paq.push(['setDomains', domains[env]]);
_paq.push(['setDoNotTrack', true]);
_paq.push(['disableCookies']);
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function () {
  var u = trackingDomains[env];
  _paq.push(['setTrackerUrl', u + 'matomo.php']);
  //ACHTUNG Site-ID=2 in DEV und 1 in Stage/Live
  _paq.push(['setSiteId', siteID[env]]);
  var d = document,
    g = d.createElement('script'),
    s = d.getElementsByTagName('script')[0];
  g.type = 'text/javascript';
  g.async = true;
  g.src = u + 'matomo.js';
  s.parentNode.insertBefore(g, s);
})();
