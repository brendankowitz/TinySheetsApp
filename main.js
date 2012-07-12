
require.config({
    //baseUrl: "/m",
    paths: {
        'model/Timesheet': 'Models/TimeSheet',
        'model/Tag': 'Models/Tag',
        'MapController': 'Controllers/MapController',
        'TimeSheetsController': 'Controllers/TimeSheetsController',
        'EntryDetailsController': 'Controllers/EntryDetailsController',
        'spine': 'Scripts/spine/spine',
        'spine/route': 'Scripts/spine/route',
        'spine/manager': 'Scripts/spine/manager',
        'spine/local': 'Scripts/spine/local',
        'spine/ajax': 'Scripts/spine/ajax',
        'jquery/mobile': 'Scripts/jquery.mobile-1.1.0',
        'hogan': 'Scripts/hogan-2.0.0',
        'text': 'Scripts/text',
        'jquery/extensions': 'Scripts/_extensions',
        'jquery': 'Scripts/jquery-1.7.2.min'
    },
    shim: {
        'jquery/mobile': ['jquery'],
        'spine': ['jquery'],
        'spine/manager': ['spine'],
        'spine/route': ['spine'],
        'spine/local': ['spine'],
        'spine/ajax': ['spine'],
        "jquery/extensions": ["jquery", "hogan"]
    }
});

/*
if(Modernizr.applicationcache) {
    var appCache = window.applicationCache;
    if(appCache.status == appCache.IDLE) {
        try{
            appCache.update(); 
        }
        catch(e){}
    }   

    appCache.addEventListener('updateready', function(e) {
        if (appCache.status == appCache.UPDATEREADY) {
          appCache.swapCache();
          alert('A new version of this site is available. Press ok to refresh');
          window.location.reload();
        }
      }, false);
}*/

require(['jquery',
    'TimeSheetsController',
    'MapController',
    'EntryDetailsController',
    'model/Timesheet',
    'model/Tag',
    'jquery/mobile',
    'jquery/extensions',
    'hogan',
    'spine',
    'spine/manager',
    'spine/route',
    'spine/ajax',
    'spine/local'],
    function ($) {

        $(function(){
            Spine.Model.host = "/api";
            
            App.turnOffjQueryMobileFeatures();
            App.enableHrefNavigation();

            App.registerController("TimeSheetsController", "time-sheets");
            App.registerController("MapController", "maps");
            App.registerController("EntryDetailsController", "entry-details");

            Spine.Route.add("", function () {
                App.log("Route for /");
                App.navigate("index-page");
            });
            Spine.Route.add("offline", function () {
                App.navigate("offline-page");
            });
            Spine.Route.add("about", function () {
                App.navigate("about-page");
            });
            Spine.Route.setup();

            //prefetch categories
            //var categoryClass = require("model/Tag");
            //categoryClass.fetch();
            
            function setActiveStyleSheet(title) { //http://www.scottlogic.co.uk/blog/colin/2012/04/introducing-the-jquery-mobile-metro-theme/
                var i, a, main;
                for (i = 0; (a = document.getElementsByTagName("link")[i]) ; i++) {
                    if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
                        a.disabled = true;
                        if (a.getAttribute("title") == title) a.disabled = false;
                    }
                }
            }
            
            var isWindowsPhone = navigator.userAgent.indexOf("MSIE") != -1;
            if (isWindowsPhone) {
                setActiveStyleSheet("metro");
            }

            if ($("html").is(".ui-mobile") === false) {
                location.reload(true); //? sometimes jquery mobile doesn't finish initializing...
            }
        });
    });