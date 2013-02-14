suite('Tasks', function() {
  var spyUpdate
    , spyCreate
    , spyDelete
    , $listItem
    , $editView
    , $input
    , $el
    , $form
    ;

  setup(function() {
    $el = bTask.views.app.$el;
    $listItem = $el.find('li.task:first')
    $form = $el.find('form')
    $listItem.click();

    spyUpdate = sinon.spy(gapi.client.tasks.tasks, 'update')
    spyCreate = sinon.spy(gapi.client.tasks.tasks, 'insert')
    spyDelete = sinon.spy(gapi.client.tasks.tasks, 'delete')
  });

  teardown(function() {
    gapi.client.tasks.tasks.update.restore();
    gapi.client.tasks.tasks.insert.restore();
    gapi.client.tasks.tasks.delete.restore();
  });

  test('Creating a task', function() {
    // Fill out the task's name
    $form.find('input[name="title"]').val('Example task');

    // Save the new task
    $form.submit();

    // The update method should have been called
    assert.equal(1, spyCreate.callCount);
  });

  test('Checking a task calls update() and updates the edit view', function() {
    // Click the state checkbox
    $listItem.find('input:first').click();

    // Click the item itself to select it and show the edit task form
    $editView = $el.find('.edit-task:first');
    $input = $editView.find('input[value="completed"]');

    assert.ok($input.attr('checked'));
    assert.equal(1, spyUpdate.callCount);
  });

  test('Editing a task', function() {
    // Get the edit form and notes field, then save the changes
    $editView = $el.find('.edit-task:first');
    $input = $editView.find('textarea[notes="notes"]');
    $input.val('Example notes');
    $editView.submit();

    // The update method should have been called
    assert.equal(1, spyUpdate.callCount);
  });

  test('Deleting a task', function() {
    // Click the delete icon
    $editView = $el.find('.edit-task:first');
    $editView.find('.delete-task').click();

    assert.equal(1, spyDelete.callCount);
  });
});
