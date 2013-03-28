define(['text!templates/tasks/task.html', 'views/tasks/edit'], function(template, TaskEditView) {
  var TaskView = Backbone.View.extend({
    tagName: 'li',
    className: 'controls well task row',

    template: _.template(template),

    events: {
      'click': 'open'
    , 'change .check-task': 'toggle'
    },

    initialize: function(options) {
      this.parentView = options.parentView;
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.remove, this);
      this.model.on('remove', this.remove, this);
    },

    render: function(e) {
      var $el = $(this.el);
      $el.html(this.template(this.model.toJSON()));
      $el.find('.check-task').attr('checked', this.model.get('status') === 'completed');

      return this;
    },

    open: function(e) {
      if (this.parentView.activeTaskView) {
        this.parentView.activeTaskView.close();
      }
      this.$el.addClass('active');
      this.parentView.activeTaskView = this;
      this.parentView.editTask(this.model);
    },

    close: function(e) {
      this.$el.removeClass('active');
    },

    toggle: function() {
      var id = this.model.get('id')
        , $el = this.$el.find('.check-task')
        ;

      this.model.set('status', $el.attr('checked') ? 'completed' : 'needsAction');
      if (this.model.get('status') === 'needsAction') {
        this.model.set('completed', null);
      }

      this.model.save();
      return false;
    }
  });

  return TaskView;
});
