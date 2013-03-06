define(['text!templates/lists/menuitem.html', 'views/tasks/index', 'collections/tasks'], function(template, TasksIndexView, Tasks) {
  var ListMenuItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'list-menu-item',

    template: _.template(template),

    events: {
      'click': 'open'
    },

    initialize: function() {
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.remove, this);
      this.model.on('select', this.open, this);
    },

    render: function() {
      var $el = $(this.el);
      $el.html(this.template(this.model.toJSON()));
      return this;
    },

    open: function() {
      if (bTask.views.activeListMenuItem) {
        bTask.views.activeListMenuItem.$el.removeClass('active');
      }

      bTask.views.activeListMenuItem = this;
      this.$el.addClass('active');

      // Render the tasks
      if (bTask.views.tasksIndexView) {
        bTask.views.tasksIndexView.remove();
      }

      bTask.views.tasksIndexView = new TasksIndexView({ collection: new Tasks({ tasklist: this.model.get('id') }), model: this.model });
      bTask.views.app.$el.find('#tasks-container').html(bTask.views.tasksIndexView.render().el);

      bTask.routes.navigate('lists/' + this.model.get('id'));

      return false;
    }
  });

  return ListMenuItemView;
});
