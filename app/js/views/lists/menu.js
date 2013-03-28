define(['views/lists/menuitem'], function(ListMenuItemView) {
  var ListMenuView = Backbone.View.extend({
    el: '.left-nav',
    tagName: 'ul',
    className: 'nav nav-list lists-nav',

    events: {
    },

    initialize: function() {
      this.collection.on('add', this.renderMenuItem, this);
    },

    renderMenuItem: function(model) {
      var item = new ListMenuItemView({ model: model });
      this.$el.append(item.render().el);

      if (!bTask.views.activeListMenuItem) {
        bTask.views.activeListMenuItem = item;
      }

      if (model.get('id') === bTask.views.activeListMenuItem.model.get('id')) {
        item.open();
      }
    },

    render: function() {
      var $el = $(this.el)
        , self = this;

      return this;
    }
  });

  return ListMenuView;
});
