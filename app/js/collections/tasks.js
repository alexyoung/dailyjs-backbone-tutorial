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
    },

    move: function(id, previousId, list) {
      var model = this.get(id)
        , toModel = this.get(previousId)
        , index = this.indexOf(toModel) + 1
        ;

      this.remove(model, { silent: true });
      this.add(model, { at: index, silent: true });

      // Persist the change
      list.moveTask({ task: id, previous: previousId });
    }
  });

  return Tasks;
});
