define("MapController", ['jquery', 'text!Views/Map/WhereAmI.htm'],
    function ($) {
        var controller = Spine.Controller.create({
            elements: {

            },
            events: {
                "pagebeforeshow": "render",
                "pagehide": "navigatedFrom",
                "click a:jqmData(action='cancel')": "cancel"
            },


            init: function () {
            },
            
            cancel: function (e) {
                e.preventDefault();
                App.navigate("index-page", { reverse: true });
            },

            render: function () {
                var view = require("text!Views/Map/WhereAmI.htm");
                this.el.render(view);
                this.refreshElements();
            },

            navigatedFrom: function () {
                this.el.html("");
            }
        });
        return controller;
    });
