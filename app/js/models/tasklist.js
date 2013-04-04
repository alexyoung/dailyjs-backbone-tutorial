define(function() {
  var TaskList = Backbone.Model.extend({
    url: 'tasklists',

    moveTask: function(options) {
      options['tasklist'] = this.get('id');
      var request = gapi.client.tasks.tasks.move(options);

      Backbone.gapiRequest(request, 'update', this, options);
    }
  });

  return TaskList;
});
