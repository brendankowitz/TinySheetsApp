define("model/Product", ['jquery', 'spine/ajax'], function ($) {

    var model = Spine.Model.sub();
    model.configure("Product", "id", "Name", "Category", "Price");
    model.extend(Spine.Model.Ajax);

    model.include({

    });

    //model.extend({
    //    fetch: function (params) {
    //        if (!params && model.last())
    //            params = { data: { index: this.last().Id } };
    //        this.constructor.__super__.fetch.call(this, { id: par });
    //    }
    //});
    

    return model;

});