define(['models/tasklist'], function(TaskList) {
  var TaskLists = Backbone.Collection.extend({
    model: TaskList
  , url: 'tasklists'
  });

  return TaskLists;
});
