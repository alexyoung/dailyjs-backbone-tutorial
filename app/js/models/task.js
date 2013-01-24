define(function() {
  var Task = Backbone.Model.extend({
    url: 'tasks',
    defaults: { title: '', notes: '' }
  });

  return Task;
});
