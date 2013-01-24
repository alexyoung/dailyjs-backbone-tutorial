requirejs.config({
  baseUrl: 'js',

  paths: {
    text: 'lib/text'
  },

  shim: {
    'lib/underscore-min': {
      exports: '_'
    },
    'lib/backbone': {
      deps: ['lib/underscore-min']
    , exports: 'Backbone'
    },
    'app': {
      deps: ['lib/underscore-min', 'lib/backbone']
    }
  }
});

require([
  'app'
],

function(App) {
  window.bTask = new App();
});
