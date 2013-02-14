suite('Lists', function() {
  var spyUpdate
    , spyCreate
    , spyDelete
    ;

  setup(function() {
    spyUpdate = sinon.spy(gapi.client.tasks.tasklists, 'update')
    spyCreate = sinon.spy(gapi.client.tasks.tasklists, 'insert')
    spyDelete = sinon.spy(gapi.client.tasks.tasklists, 'delete')
  });

  teardown(function() {
    gapi.client.tasks.tasklists.update.restore();
    gapi.client.tasks.tasklists.insert.restore();
    gapi.client.tasks.tasklists.delete.restore();
  });

  test('Creating a list', function() {
    var $el = bTask.views.app.$el
      , listName = 'Example list';

    // Show the add list form
    $el.find('#add-list-button').click();

    // Fill out a value for the new list's title
    $el.find('#list_title').val(listName);
    $el.find('#list_title').parents('form').first().submit();

    // Make sure the spy has seen a call for a list being created
    assert.equal(1, spyCreate.callCount);

    // Ensure the expected UI element has been added
    assert.equal(listName, $('.list-menu-item:last').text().trim());
  });

  test('Editing a list', function() {
    var $el = bTask.views.app.$el;

    // Show the edit list form
    $el.find('.list-menu-item:first').click();
    $el.find('#edit-list-button').click();

    $el.find('#list_title').val('Edited list');
    $el.find('#list_title').parents('form').first().submit();

    assert.equal(1, spyUpdate.callCount);
    assert.equal('Edited list', $('.list-menu-item:first').text().trim());
  });

  test('Deleting a list', function() {
    var $el = bTask.views.app.$el;

    // Automatically accept the confirmation
    window.confirm = function() { return true; };

    // Show the edit list form
    $el.find('#edit-list-button').click();

    // Click the list delete button
    $el.find('.delete-list').click();

    assert.equal(1, spyDelete.callCount);
  });
});
