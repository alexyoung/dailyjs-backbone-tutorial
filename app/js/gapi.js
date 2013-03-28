define(['config'], function(config) {
  var app;

  function ApiManager(_app) {
    app = _app;
    this.loadGapi();
  }

  _.extend(ApiManager.prototype, Backbone.Events);

  ApiManager.prototype.init = function() {
    var self = this;

    gapi.client.load('tasks', 'v1', function() { /* Loaded */ });

    function handleClientLoad() {
      gapi.client.setApiKey(config.apiKey);
      window.setTimeout(checkAuth, 100);
    }

    function checkAuth() {
      gapi.auth.authorize({ client_id: config.clientId, scope: config.scopes, immediate: true }, handleAuthResult);
    }

    function handleAuthResult(authResult) {
      var authTimeout;

      if (authResult && !authResult.error) {
        // Schedule a check when the authentication token expires
        if (authResult.expires_in) {
          authTimeout = (authResult.expires_in - 5 * 60) * 1000;
          setTimeout(checkAuth, authTimeout);
        }

        app.views.auth.$el.hide();
        $('#signed-in-container').show();
        self.trigger('ready');
      } else {
        if (authResult && authResult.error) {
          // TODO: Show error
          console.error('Unable to sign in:', authResult.error);
        }

        app.views.auth.$el.show();
      }
    }

    this.checkAuth = function() {
      gapi.auth.authorize({ client_id: config.clientId, scope: config.scopes, immediate: false }, handleAuthResult);
    };

    handleClientLoad();
  };

  ApiManager.prototype.loadGapi = function() {
    var self = this;

    // Don't load gapi if it's already present
    if (typeof gapi !== 'undefined') {
      return this.init();
    }

    require(['https://apis.google.com/js/client.js?onload=define'], function() {
      // Poll until gapi is ready
      function checkGAPI() {
        if (gapi && gapi.client) {
          self.init();
        } else {
          setTimeout(checkGAPI, 100);
        }
      }
      
      checkGAPI();
    });
  };

  Backbone.sync = function(method, model, options) {
    var requestContent = {}, request;
    options || (options = {});

    switch (model.url) {
      case 'tasks':
        requestContent.task = model.get('id');
        requestContent.tasklist = model.get('tasklist');
      break;

      case 'tasklists':
        requestContent.tasklist = model.get('id');
      break;
    }

    switch (method) {
      case 'create':
        requestContent['resource'] = model.toJSON();
        request = gapi.client.tasks[model.url].insert(requestContent);
        Backbone.gapiRequest(request, method, model, options);
      break;

      case 'update':
        requestContent['resource'] = model.toJSON();
        request = gapi.client.tasks[model.url].update(requestContent);
        Backbone.gapiRequest(request, method, model, options);
      break;

      case 'delete':
        requestContent['resource'] = model.toJSON();
        request = gapi.client.tasks[model.url].delete(requestContent);
        Backbone.gapiRequest(request, method, model, options);
      break;

      case 'read':
        request = gapi.client.tasks[model.url].list(options.data);
        Backbone.gapiRequest(request, method, model, options);
      break;
    }
  };

  Backbone.gapiRequest = function(request, method, model, options) {
    var result;
    request.execute(function(res) {
      if (res.error) {
        if (options.error) options.error(res);
      } else if (options.success) {
        if (res.items) {
          result = res.items;
        } else {
          result = res;
        }
        options.success(result);
      }
    });
  };

  return ApiManager;
});
