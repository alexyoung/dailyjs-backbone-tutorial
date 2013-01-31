define(['text!templates/tasks/edit.html'], function(template) {
  var TaskEditView = Backbone.View.extend({
    tagName: 'form',
    className: 'well edit-task',
    template: _.template(template),

    events: {
      'submit': 'submit'
    , 'click .cancel': 'cancel'
    , 'click .delete-task': 'destroy'
    },

    initialize: function() {
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.remove, this);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    submit: function() {
      var title = this.$el.find('input[name="title"]').val()
        , notes = this.$el.find('textarea[name="notes"]').val()
        , status = this.$el.find('input[name="status"]:checked').val()
        ;

      this.model.set('title', title);
      this.model.set('notes', notes);

      if (status !== this.model.get('status')) {
        this.model.set('status', status);
        if (status === 'needsAction') {
          this.model.set('completed', null);
        }
      }

      this.model.save(null, {
        success: function() {
          // TODO: Show feedback
        }
      });
     
      return false;
    },

    cancel: function() {
      this.remove();
      return false;
    },

    destroy: function() {
      this.model.destroy();
      return false;
    }
  });

  return TaskEditView;
});
