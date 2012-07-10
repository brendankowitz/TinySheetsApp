define("TimeSheetsController", ['jquery', 'model/Timesheet', 'text!Views/TimeSheets/TimeSheets.htm'],
    function ($, Timesheet) {
        var controller = Spine.Controller.create({
            elements: {
                "#pending-timesheet-table": "pendingList",
                "#completed-timesheet-table": "completedList",
                "#time-sheet-details-template": "itemTemplate"
            },
            events: {
                "pagebeforeshow": "navigatedTo",
                "pagehide": "navigatedFrom",
                "click a:jqmData(action='cancel')": "cancel",
                "click a:jqmData(action='new')": "create",
                "tap a:jqmData(action='edit')": "viewTimesheet",
                "tap a:jqmData(action='submit')": "submitTimesheet"
                
            },
            
            active: false,
            itemTemplateCompiled: null,
            init: function () {
                Timesheet.bind('refresh change', this.proxy(this.updatePending));
                this.routes({
                    "time-sheets": function () {
                        this.render();
                        this.el.activate();
                    }
                });
            },

            submitTimesheet: function (e) {
                e.preventDefault();
                var li = $(e.target).closest("li");
                var itemId = li.attr("data-id");
                var item = Timesheet.find(itemId);
                item.Id = itemId;
                item.Submitted = true;
                item.save();
            },
            
            viewTimesheet: function (e) {
                e.preventDefault();
                var li = $(e.target).closest("li");
                var itemId = li.attr("data-id");
                var item = Timesheet.find(itemId);

                App.navigate("entry-details-page")
                    .trigger({ type: 'loadItem', item: item });
            },

            cancel: function (e) {
                e.preventDefault();
                App.navigate("index-page", { reverse: true });
            },
            
            create: function (e) {
                e.preventDefault();
                App.navigate("entry-details-page");
            },

            render: function () {
                var view = require("text!Views/TimeSheets/TimeSheets.htm");
                this.el.render(view);
                this.refreshElements();
                if(this.itemTemplateCompiled == null) {
                    this.itemTemplateCompiled = Hogan.compile(this.itemTemplate.html());
                }
            },
            
            updatePending: function (data) {
                App.log('data fetched');
                if (this.active == false) return;
                var items = this.itemTemplateCompiled.render({ Items: Timesheet.unsubmitted() });
                this.pendingList.html(items);
                this.pendingList.listview('refresh');
                
                items = this.itemTemplateCompiled.render({ Items: Timesheet.complete() });
                this.completedList.html(items);
                this.completedList.listview('refresh');
            },

            navigatedTo: function () {
                this.render();
                Timesheet.fetch();
                this.active = true;
            },

            navigatedFrom: function () {
                this.active = false;
                this.el.html("");
            }
        });
        return controller;
    });
