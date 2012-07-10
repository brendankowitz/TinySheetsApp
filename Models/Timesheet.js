define("model/Timesheet", ['jquery', 'spine/Local'], function ($) {

    var model = Spine.Model.sub();
    model.configure("Timesheet", "id", "Description", "Hours", "Tags", "Location", "Submitted");
    model.extend(Spine.Model.Local);

    model.extend({
        unsubmitted: function () {
            var records = this.all();
            var matching = [];
            for (var i = 0; i < records.length; i++) {
                var rec = records[i];
                if (!rec.Submitted)
                    matching.push(rec);
            }
            return matching;
        },
        
        complete: function () {
            var records = this.all();
            var matching = [];
            for (var i = 0; i < records.length; i++) {
                var rec = records[i];
                if (!!rec.Submitted)
                    matching.push(rec);
            }
            return matching;
        }
    });

    return model;

});