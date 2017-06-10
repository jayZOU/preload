var cssLoad = function(url, local, media) {
    function ready(e) {
        return doc.body ? e() : setTimeout(function() {
            ready(e);
        })
    }

    var onloadcssdefined = function(e) {
        for (var n = link.href, local = sheets.length; local--;)
            if (sheets[local].href === n) return e()
        setTimeout(function() {
            onloadcssdefined(e);
        });
    };

    var doc = window.document,
        sheets = doc.styleSheets,
        link = doc.createElement( "link" ),
        media = media || "all";
    link.rel = "stylesheet";
    link.href = url;
    link.media = media;

    // console.log(navigator.userAgent.toLowerCase().match(/firefox/));

    if(!local){
        var loa = ( doc.getElementsByTagName( "head" )[ 0 ] || doc.body ).childNodes;
        local = loa[loa.length - 1];
    }

    ready(function() {
        local.parentNode.insertBefore(link, local ? local : local.nextSibling);
    });

    link.addEventListener && link.addEventListener("load", function(e) {
        if(navigator.userAgent.toLowerCase().match(/firefox/)){
            var script = doc.createElement("script");
            local.parentNode.insertBefore(script, local ? local : local.nextSibling);
        }
    });

    link.onloadcssdefined = onloadcssdefined;

    onloadcssdefined(function() {
        link.media !== media && (link.media = media);
    });
};

// typeof module == 'object' ? module.exports = cssLoad : window.cssLoad = cssLoad;

export default cssLoad;
