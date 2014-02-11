(function (root) {
  var PT = root.PT = (root.PT || {});
  var Photo = PT.Photo;

  var PhotoFormView = PT.PhotoFormView = function PhotoFormView(id) {
    this.$el = $(id);

    var that = this;

    $(this.$el).on("submit", "form", function (event) {
      event.preventDefault();

      var attrs = $(this).serializeJSON().photo;

      var photo = new Photo(attrs);

      this.reset();

      photo.create();
    });
  };

  PhotoFormView.prototype.render = function () {
    var form = JST["photo_form"]();
    this.$el.append(form);
    return this.$el;
  }

})(this);