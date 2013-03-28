define(['models/task'], function(Task) {
  var Tasks = Backbone.Collection.extend({
    model: Task,
    url: 'tasks',

    clear: function(tasklist, options) {
      var success = options.success || function() {}
        , request
        , self = this
        ;

      options.success = function() {
        self.remove(self.filter(function(task) {
          return task.get('status') === 'completed';
        }));

        success();
      };

      request = gapi.client.tasks.tasks.clear({ tasklist: tasklist });
      Backbone.gapiRequest(request, 'update', this, options);
    }
  });

  return Tasks;
});
