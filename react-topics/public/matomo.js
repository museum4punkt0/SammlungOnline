const hostParts = window.location.host.split('.');
const currentExtension = hostParts.length > 1 ? hostParts[hostParts.length - 1] : 'com';

const envs = [
    { extension: 'dev', name: 'stage' },
    { extension: 'com', name: 'stage' },
    { extension: 'museum', name: 'production' },
];

const domains = {
    production: ['*.sammlung.smb.museum', '*.recherche.smb.museum', '*.themen.smb.museum', '*.touren.smb.museum'],
    stage: [
        '*.smb-landingpage.xailabs.com',
        '*.smb-guide.xailabs.com',
        '*.smb-research.xailabs.com',
        '*.smb-topics.xailabs.com',
    ],
};

const trackingDomains = {
    production: '//admin.smb.museum/matomo/',
    stage: '//smb-admin.xailabs.com/matomo/',
};

const cookieUrls = {
    production: '*.sammlung.smb.museum',
    stage: '*.smb-landingpage.xailabs.com',
};

function getEnv(ext) {
    return envs.find((env) => env.extension === ext).name;
}

var _paq = (window._paq = window._paq || []);
_paq.push(['setDocumentTitle', document.domain + '/' + document.title]);
_paq.push(['setCookieDomain', cookieUrls[getEnv(currentExtension)]]);
_paq.push(['setDomains', domains[getEnv(currentExtension)]]);
_paq.push(['setDoNotTrack', true]);
_paq.push(['disableCookies']);
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function () {
    var u = trackingDomains[getEnv(currentExtension)];
    _paq.push(['setTrackerUrl', u + 'matomo.php']);
    _paq.push(['setSiteId', '1']);
    var d = document,
        g = d.createElement('script'),
        s = d.getElementsByTagName('script')[0];
    g.type = 'text/javascript';
    g.async = true;
    g.src = u + 'matomo.js';
    s.parentNode.insertBefore(g, s);
})();
