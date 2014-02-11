(function (root) {
  var PT = root.PT = (root.PT || {});
  var Photo = PT.Photo;

  var PhotoListView = PT.PhotoListView = function PhotoListView(id) {
    this.$el = $(id);

    Photo.on("add", this.render.bind(this) );

    this.$el.on("click", "#photo-link", function (event) {
      event.preventDefault();
      var id = $(this).attr("data-id");

      // must use parseInt because the data-id returns a string!
      var photo = PT.Photo.find(parseInt(id));

      PT.showPhotoDetail(photo);
    });
  };

  PhotoListView.showDetail = function (event) {

  };

  PhotoListView.prototype.render = function () {
    this.$el.empty();
    this.$el.find("ul").remove();
    this.$el.prepend("<ul></ul");
    var ul = this.$el.find("ul");

    Photo.all.forEach(function (photo) {
      $(ul).prepend(
        "<li><a href=\"#\" data-id=\"" + photo.get('id') + "\" id=\"photo-link\">"  + photo.get("title") + "</a></li>"
      );
    });

    var photoFormView = new PT.PhotoFormView("#content");
    photoFormView.render();

    return this.$el;
  };

})(this);