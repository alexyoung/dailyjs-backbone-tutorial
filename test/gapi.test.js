suite('Backbone.Sync for gapi', function() {
  var model;

  setup(function() {
    model = { id: 1, title: 'Test', url: 'tasks', get: function() {} };
    model.toJSON = function() { return JSON.stringify({ id: 1, title: 'Test' }); };
  });

  test('gapiRequest is called by Backbone.sync', function() {
    var mock = sinon.mock(Backbone);
    mock.expects('gapiRequest').once();
    Backbone.sync('update', model, {});
    mock.verify();
    mock.restore();
  });

  test('Ensure Task.prototype.get is called twice', function() {
    var mock = sinon.mock(model);

    mock.expects('get').twice().returns(model.id);
    Backbone.sync('update', model);
    mock.verify();
    mock.restore();
  });

  test('Errors get called', function() {
    var spy = sinon.spy()
      , options = { error: spy }
      ;

    // Stub the internal update method that would usually come from Google
    sinon.stub(gapi.client.tasks.tasks, 'update').returns({
      execute: sinon.stub().yields(options)
    });

    // Invoke a sync with a fake model and the options with the error callback
    Backbone.sync('update', model, options);

    assert.ok(spy.calledOnce);
    gapi.client.tasks.tasks.update.restore();
  });

  test('gapiRequest causes the execute callback to fire', function() {
    var spy = sinon.spy();
    sinon.stub(Backbone, 'gapiRequest').yieldsTo('execute', spy);
    Backbone.sync('update', model);

    assert.ok(spy.calledOnce);
    Backbone.gapiRequest.restore();
  });
});
