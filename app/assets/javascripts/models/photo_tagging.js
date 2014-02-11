(function (root) {

  var PT = root.PT = (root.PT || {});
  var Photo = PT.Photo
  
  var PhotoTagging = PT.PhotoTagging = function PhotoTagging(attributes) {
    this.attributes = _.extend({}, attributes);
  };

  PhotoTagging.all = [];

  PhotoTagging._events = {};

  PhotoTagging.find = function (id) {
    return _.find(Photo.all, function (photo) {
      return photo.get('id') === id;
    });
  };

  PhotoTagging.on = function (eventName, callback) {
    Photo._events[eventName] = (this._events[eventName] || [])
    Photo._events[eventName].push(callback);
  };

  PhotoTagging.trigger = function (eventName) {
    Photo._events[eventName].forEach(function (func) {
      func();
    });
  }

  PhotoTagging.fetchByPhotoId = function (photoId, callback) {
    $.ajax({
      url: ("/api/photos/" + photoId + "/photo_taggings"),
      type: "GET",
      dataType: "json",
      success: function (data) {
        var photo_taggings = _.map(data, function(pt) {
          return new PhotoTagging(pt);
        });

        PhotoTagging.all = photo_taggings;

        if (callback) {
          callback(photo_taggings);
        }
      }
    });
  };

  PhotoTagging.prototype.get = function (attr_name) {
    return this.attributes[attr_name];
  };

  PhotoTagging.prototype.set = function(attr_name, val) {
    this.attributes[attr_name] = val;
    return val;
  };

  PhotoTagging.prototype.create = function(photoId, callback) {
    if (this.get("id")) {
      throw "already has an id!"
    }
	
	this.set("id", photoId)

    // format POJO post data to be within :photo
    var photo_tagging_attrs = {
      photo_tagging: this.attributes
    };

    var photo = this;

    $.ajax({
      url: "/api/photo_taggings",
      dataType: "json",
      type: "POST",
      data: photo_tagging_attrs,
      success: function (data) {
        if (callback) {
          callback(data);
        }

        photo.set("id", data.id)

        PhotoTagging.all.push(photo);

        PhotoTagging.trigger("add");
      }
    });

  };

})(this);