(function (root) {
  var PT = root.PT = (root.PT || {});
  var Photo = PT.Photo;

  var PhotoDetailView = PT.PhotoDetailView = function PhotoDetailView(id) {
    this.$el = $(id);

    this.$el.on("click", "#back-to-list", function () {
      PT.showPhotosIndex();
    });
	
    var that = this;
    this.$el.on("click", "img", function(event) {
	  var $container = $(this).closest("div").css("position", "relative");
	  var tagSelectView = new PT.TagSelectView($container, event);

      tagSelectView.render();
    });

  };

  PhotoDetailView.prototype.render = function (photo) {
    // JST templates take an object as an argument,
    // where keys = variables inside the template,
    // and the values are what you pass in as their values

    var view = JST["photo_detail"]({photo: photo});

    this.$el.empty();
    this.$el.prepend(view);
  };

})(this);