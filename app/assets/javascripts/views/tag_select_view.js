(function (root) {
  var PT = root.PT = (root.PT || {});
  var Photo = PT.Photo;

  var TagSelectView = PT.TagSelectView = function ($container, event) {
      this.$container = $($container);
	  this.event = event;

  };

  TagSelectView.prototype.render = function (photo) {
	  var tagDiv = "<div id=\"photo-tag\"></div>";
      
  	  var $tagDiv = $(tagDiv).css({"position": "absolute", 
  	  "height": "100px", "width": "100px", "border": "5px solid red", 
  	  "left": event.offsetX-50, "top": event.offsetY-50});
	  
       $(this.$container).css("position", "relative");
       $(this.$container).closest("div").css("position", "relative");

       $(this.$container).closest("div").append($tagDiv);
	   
	   var tagDiv2 = "<div id=\"photo-tag-options\"><ul></ul></div>";
	   
   	  var $tagDiv2 = $(tagDiv2).css({"position": "absolute",
	   "width": "100px", "border": "5px solid blue", 
   	  "left": 100, "background-color": "black", "color": "white"});
	   
	   $($tagDiv).append($tagDiv2);
	   
	   USERS.forEach(function (user) { 
		   $($tagDiv2).find("ul").append("<li>" + user.username + "</li><br>");
	   }); 
  };

})(this);