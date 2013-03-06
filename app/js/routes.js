define(function() {
  return Backbone.Router.extend({
    routes: {
      'lists/:id': 'openList'
    },

    initialize: function() {
    },

    openList: function(id) {
      if (bTask.collections.lists && bTask.collections.lists.length) {
        var list = bTask.collections.lists.get(id);
        if (list) {
          list.trigger('select');
        } else {
          console.error('List not found:', id);
        }
      }
    }
  });
});
