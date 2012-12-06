define([
  'gapi'
],

function(ApiManager) {
  var App = function() {
    this.connectGapi();
  };

  App.prototype = {
    connectGapi: function() {
      this.apiManager = new ApiManager();
    }
  };

  return App;
});
