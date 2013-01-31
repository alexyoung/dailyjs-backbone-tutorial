define([
  'gapi'
, 'views/app'
, 'views/auth'
, 'views/lists/menu'
, 'collections/tasklists'
, 'collections/tasks'
],

function(ApiManager, AppView, AuthView, ListMenuView, TaskLists, Tasks) {
  var App = function() {
    this.collections.lists = new TaskLists();
    this.views.app = new AppView();
    this.views.app.render();
    this.views.auth = new AuthView(this);
    this.views.auth.render();
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
        self.collections.lists.fetch({ data: { userId: '@me' }, success: function(collection, res, req) {
          self.views.listMenu.render();
        }});
      });
    }
  };

  return App;
});
