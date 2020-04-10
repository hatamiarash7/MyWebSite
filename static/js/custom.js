//---------------- Google Analytics ------------------//

(function (i, s, o, g, r, a, m) {
    i["GoogleAnalyticsObject"] = r;
    (i[r] =
        i[r] ||
        function () {
            (i[r].q = i[r].q || []).push(arguments);
        }),
        (i[r].l = 1 * new Date());
    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
})(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");
ga("create", "UA-65859337-10", "auto");
ga("require", "linkid", "linkid.js");
ga("send", "pageview");

//---------------- Google Tag Manager ------------------//

(function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js",
    });
    var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
})(window, document, "script", "dataLayer", "GTM-WWDVDS2");

//---------------- Hotjar ------------------//

(function (h, o, t, j, a, r) {
    h.hj =
        h.hj ||
        function () {
            (h.hj.q = h.hj.q || []).push(arguments);
        };
    h._hjSettings = { hjid: 1573387, hjsv: 6 };
    a = o.getElementsByTagName("head")[0];
    r = o.createElement("script");
    r.async = 1;
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
})(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");

//---------------- statscounter ------------------//

var sc_project = 11924502;
var sc_invisible = 1;
var sc_security = "4056903b";

//---------------- Matomo ------------------//

var _paq = window._paq || [];
_paq.push(["trackPageView"]);
_paq.push(["enableLinkTracking"]);
(function () {
    var u = "https://matomo.arash-hatami.ir/matomo/";
    _paq.push(["setTrackerUrl", u + "matomo.php"]);
    _paq.push(["setSiteId", "1"]);
    var d = document,
        g = d.createElement("script"),
        s = d.getElementsByTagName("script")[0];
    g.type = "text/javascript";
    g.async = true;
    g.defer = true;
    g.src = u + "matomo.js";
    s.parentNode.insertBefore(g, s);
})();

//---------------- Quantcast ------------------//

var _qevents = _qevents || [];
(function () {
    var elem = document.createElement("script");
    elem.src =
        (document.location.protocol == "https:"
            ? "https://secure"
            : "http://edge") + ".quantserve.com/quant.js";
    elem.async = true;
    elem.type = "text/javascript";
    var scpt = document.getElementsByTagName("script")[0];
    scpt.parentNode.insertBefore(elem, scpt);
})();
_qevents.push({
    qacct: "p-hCHbRjCVZdg7Z",
});
