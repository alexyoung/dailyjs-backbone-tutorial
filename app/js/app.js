define([
  'gapi'
, 'views/app'
, 'views/auth'
, 'views/lists/menu'
, 'collections/tasklists'
],

function(ApiManager, AppView, AuthView, ListMenuView, TaskLists) {
  var App = function() {
    this.views.app = new AppView();
    this.views.app.render();
    this.views.auth = new AuthView(this);
    this.views.auth.render();
    this.collections.lists = new TaskLists();
    this.views.listMenu = new ListMenuView({ collection: this.collections.lists });

    this.connectGapi();
  };

  App.prototype = {
    views: {},
    collections: {},
    connectGapi: function() {
      var self = this;
      this.apiManager = new ApiManager(this);
      this.apiManager.on('ready', function() {
        self.collections.lists.fetch({ data: { userId: '@me' }, success: function(res) {
          self.views.listMenu.render();
        }});
      });
    }
  };

  return App;
});
