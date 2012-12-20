define(function() {
  var TaskList = Backbone.Model.extend({
    url: 'tasklists'
  });

  return TaskList;
});
