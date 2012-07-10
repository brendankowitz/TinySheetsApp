define("model/Tag", ['jquery', 'spine/ajax'], function ($) {

    var model = Spine.Model.sub();
    model.configure("Tag", "id", "Name");
    model.extend(Spine.Model.Ajax);

    return model;

});