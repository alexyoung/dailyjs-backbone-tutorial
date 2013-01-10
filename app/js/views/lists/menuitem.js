define(['text!templates/lists/menuitem.html'], function(template) {
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

      return false;
    }
  });

  return ListMenuItemView;
});
