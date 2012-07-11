({
    baseUrl: ".",
    paths: {
        "model/Timesheet": "Models/TimeSheet",
        "model/Tag": "Models/Tag",
        "MapController": "Controllers/MapController",
        "TimeSheetsController": "Controllers/TimeSheetsController",
        "EntryDetailsController": "Controllers/EntryDetailsController",
        "spine": "Scripts/spine/spine",
        "spine/route": "Scripts/spine/route",
        "spine/manager": "Scripts/spine/manager",
        "spine/local": "Scripts/spine/local",
        "spine/ajax": "Scripts/spine/ajax",
        "jquery/mobile": "Scripts/jquery.mobile-1.1.0",
        "hogan": "Scripts/hogan-2.0.0",
        "text": "Scripts/text",
        "jquery/extensions": "Scripts/_extensions",
		"jquery": "Scripts/jquery-1.7.2.min"
    },
    shim: {
        "jquery/mobile": ["jquery"],
        "spine": ["jquery"],
        "spine/manager": ["spine"],
        "spine/route": ["spine"],
        "spine/local": ["spine"],
        "spine/ajax": ["spine"],
        "jquery/extensions": ["jquery", "hogan"]
    },
    name: "main",
    out: "main-built.js"
})