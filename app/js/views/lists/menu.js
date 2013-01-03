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
    },

    render: function() {
      var $el = $(this.el)
        , self = this;

      this.collection.each(function(list) {
        self.renderMenuItem(list);
      });

      return this;
    }
  });

  return ListMenuView;
});
