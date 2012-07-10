define("EntryDetailsController", ['jquery', 'model/Timesheet', 'text!Views/TimeSheets/AddEntry.htm'],
    function ($, Timesheet) {
        var controller = Spine.Controller.create({
            elements: {
                "#edit-timesheet-item-message": "validationMessage",
                "form": "form",
                "#edit-timesheet-details-area": "details",
                "#timesheet-entry-template": "detailsTemplate"
            },
            events: {
                "pagebeforeshow": "render",
                "pagehide": "navigatedFrom",
                "click a:jqmData(action='cancel')": "cancel",
                "click a:jqmData(action='submit')": "submitForm",
                "submit form": "submit",
                "loadItem": "loadItem"
            },

            detailsTemplateCompiled: null,
            init: function () {
                this.routes({
                    "entry-details": function () {
                        this.render();
                        this.el.activate();
                    }
                });
            },
            
            loadItem: function (e) {
                var item = e.item;
                this.details.html(this.detailsTemplateCompiled.render(item));
                this.details.find("input[type='text'],input[type='number']").textinput();
            },

            submitForm: function (e) {
                e.preventDefault();
                this.form.submit();
            },
            
            submit: function (e) {
                e.preventDefault();
                var newTimesheet = Timesheet.fromForm(this.form);
                newTimesheet.save();
                App.navigate("time-sheets-page", { reverse: true });
            },

            cancel: function (e) {
                e.preventDefault();
                App.navigate("time-sheets-page", { reverse: true });
            },

            render: function () {
                var view = require("text!Views/TimeSheets/AddEntry.htm");
                this.el.render(view);
                this.refreshElements();
                if(this.detailsTemplateCompiled == null) {
                    this.detailsTemplateCompiled = Hogan.compile(this.detailsTemplate.html());
                }
                this.details.html(this.detailsTemplateCompiled.render());
                this.details.find("input[type='text'],input[type='number']").textinput();
            },

            navigatedFrom: function () {
                this.el.html("");
            }
        });
        return controller;
    });
