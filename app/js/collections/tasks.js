define(['models/task'], function(Task) {
  var Tasks = Backbone.Collection.extend({
    model: Task,
    url: 'tasks'
  });

  return Tasks;
});
