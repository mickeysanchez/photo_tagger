(function (root) {

  var PT = root.PT = (root.PT || {});

  var Photo = PT.Photo = function Photo(attributes) {
    this.attributes = _.extend({}, attributes);
  };

  Photo.all = [];

  Photo._events = {};

  Photo.find = function (id) {
    return _.find(Photo.all, function (photo) {
      return photo.get('id') === id;
    });
  };

  Photo.on = function (eventName, callback) {
    Photo._events[eventName] = (this._events[eventName] || [])
    Photo._events[eventName].push(callback);
  };

  Photo.trigger = function (eventName) {
    Photo._events[eventName].forEach(function (func) {
      func();
    });
  }

  Photo.fetchByUserId = function (userId, callback) {
    $.ajax({
      url: ("/api/users/" + userId + "/photos"),
      type: "GET",
      dataType: "json",
      success: function (data) {
        var photos = _.map(data, function(photo) {
          return new Photo(photo);
        });

        Photo.all = photos;

        if (callback) {
          callback(photos);
        }
      }
    });
  };

  // figure out this so Photo.all never has duplicates
  // Photo.addOrReplace = function (arr) {
  //   arr.forEach(photo) {
  //     var id = photo["id"];
  //     var match = _.findWhere(Photo.all, {id: id});
  //   }
  // };

  Photo.prototype.get = function (attr_name) {
    return this.attributes[attr_name];
  };

  Photo.prototype.set = function(attr_name, val) {
    this.attributes[attr_name] = val;
    return val;
  };

  Photo.prototype.create = function(callback) {
    if (this.get("id")) {
      throw "already has an id!"
    }

    // format POJO post data to be within :photo
    var photo_attrs = {
      photo: this.attributes
    };

    var photo = this;

    $.ajax({
      url: "/api/photos",
      dataType: "json",
      type: "POST",
      data: photo_attrs,
      success: function (data) {
        if (callback) {
          callback(data);
        }

        photo.set("id", data.id)

        Photo.all.push(photo);

        Photo.trigger("add");
      }
    });

  };

  Photo.prototype.save = function(callback) {
    // format POJO to nest attributes under :photo
    var photo_attrs = {
      photo: this.attributes
    };

    if (this.get("id")) {

      $.ajax({
        url: "/api/photos/" + this.get("id"),
        type: "PUT",
        data: photo_attrs,
        success: function (data) {
          if (callback) {
            callback(data);
          }

          photo.set("title", data.title);
          photo.set("url", data.url);
          Photo.all.push(photo);
          }
      });

    } else {

      $.ajax({
        url: "/api/photos",
        type: "POST",
        data: photo_attrs,
        success: function (data) {
          if (callback) {
            callback(data);
          }

          photo.set("id", data.id);
          Photo.all.push(photo);
          }
      });

    };
  };

})(this);