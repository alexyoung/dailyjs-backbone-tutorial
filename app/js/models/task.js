define(function() {
  var Task = Backbone.Model.extend({
    url: 'tasks'
  });

  return Task;
});
