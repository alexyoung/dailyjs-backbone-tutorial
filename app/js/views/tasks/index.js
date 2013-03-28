define(['text!templates/tasks/index.html', 'views/tasks/task', 'views/tasks/edit', 'collections/tasks'], function(template, TaskView, TaskEditView, Tasks) {
  var TasksIndexView = Backbone.View.extend({
    tagName: 'div',
    className: 'row-fluid',

    template: _.template(template),

    events: {
      'submit .add-task': 'addTask'
    },

    initialize: function() {
      this.children = [];
      this.collection.on('add', this.renderTask, this);
    },

    addTask: function() {
      var $input = this.$el.find('input[name="title"]')
        , task = new this.collection.model({ tasklist: this.model.get('id') })
        , self = this
        ;

      task.save({ title: $input.val() }, {
        success: function() {
          self.collection.add(task, { at: 0 });
        }
      });
      $input.val('');

      return false;
    },

    renderTask: function(task, list, options) {
      if (!task.get('id')) {
        // Ignore unsaved tasks
        return;
      }

      var item = new TaskView({ model: task, parentView: this })
        , $el = this.$el.find('#task-list');
      if (options && options.at === 0) {
        $el.prepend(item.render().el);
      } else {
        $el.append(item.render().el);
      }
      this.children.push(item);
    },

    render: function() {
      this.$el.html(this.template());

      var $el = this.$el.find('#task-list')
        , self = this;

      this.collection.fetch({ reset: true, data: { tasklist: this.model.get('id') }, success: function() {
        self.collection.each(function(task) {
          task.set('tasklist', self.model.get('id'));
          self.renderTask(task);
        });
      }});

      return this;
    },

    editTask: function(task) {
      if (this.taskEditView) {
        this.taskEditView.remove();
      }
      this.taskEditView = new TaskEditView({ model: task });
      this.$el.find('#selected-task').append(this.taskEditView.render().el);
    }
  });

  return TasksIndexView;
});
