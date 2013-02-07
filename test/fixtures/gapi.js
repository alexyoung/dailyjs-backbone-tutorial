gapi = {};
gapi.client = {
  load: function(path, version, cb) {
    cb();
  },
  oauth2: {
    userinfo: {
      get: function() {
        return {
          execute: function(cb) {
            return cb({"id":"1","name":"Sergey Brin","given_name":"Sergey","family_name":"Brin","link":"https://plus.google.com/1","picture":"","gender":"male","locale":"en","result":{"id":"1","name":"Sergey Brin","given_name":"Sergey","family_name":"Brin","link":"https://plus.google.com/1","picture":"","gender":"male","locale":"en"}});
          }
        };
      }
    }
  },
  setApiKey: function() {
  },
  tasks: {
    tasks: {
      update: function() {
        return {
          execute: function(cb) {
            cb({});
          }
        };
      },
      delete: function() {
        return {
          execute: function(cb) {
            cb();
          }
        };
      },
      insert: function() {
        return {
          execute: function(cb) {
          }
        };
      },
      list: function() {
        return {
          execute: function(cb) {
            return cb({
              "kind": "tasks#tasks",
              "items": [
                {
                  "kind": "tasks#task",
                  "id": "MDE5MzU2Njg4NDcyNjMxOTE4MzE6Njk1MzUzOTY2OjQ3NTg4MjQyMg",
                  "title": "x1",
                  "updated": "2012-08-10T22:07:22.000Z",
                  "position": "00000000000000410311",
                  "status": "needsAction"
                },
                {
                  "kind": "tasks#task",
                  "id": "MDE5MzU2Njg4NDcyNjMxOTE4MzE6Njk1MzUzOTY2OjE0ODU0NTE1NDc",
                  "title": "x2",
                  "updated": "2012-08-10T22:07:25.000Z",
                  "position": "00000000000000615467",
                  "status": "needsAction"
                },
                {
                  "kind": "tasks#task",
                  "id": "MDE5MzU2Njg4NDcyNjMxOTE4MzE6Njk1MzUzOTY2OjgxNTQ5MTA3Nw",
                  "title": "x3",
                  "updated": "2012-08-12T14:30:49.000Z",
                  "position": "00000000000000820623",
                  "status": "completed",
                  "completed": "2012-08-12T14:30:49.000Z"
                }
              ],
              "result": {
                "kind": "tasks#tasks",
                "items": [
                  {
                    "kind": "tasks#task",
                    "id": "MDE5MzU2Njg4NDcyNjMxOTE4MzE6Njk1MzUzOTY2OjQ3NTg4MjQyMg",
                    "title": "x1",
                    "updated": "2012-08-10T22:07:22.000Z",
                    "position": "00000000000000410311",
                    "status": "needsAction"
                  },
                  {
                    "kind": "tasks#task",
                    "id": "MDE5MzU2Njg4NDcyNjMxOTE4MzE6Njk1MzUzOTY2OjE0ODU0NTE1NDc",
                    "title": "x2",
                    "updated": "2012-08-10T22:07:25.000Z",
                    "position": "00000000000000615467",
                    "status": "needsAction"
                  },
                  {
                    "kind": "tasks#task",
                    "id": "MDE5MzU2Njg4NDcyNjMxOTE4MzE6Njk1MzUzOTY2OjgxNTQ5MTA3Nw",
                    "title": "x3",
                    "updated": "2012-08-12T14:30:49.000Z",
                    "position": "00000000000000820623",
                    "status": "completed",
                    "completed": "2012-08-12T14:30:49.000Z"
                  }
                ]
              }
            });
          }
        };
      }
    },
    tasklists: {
      update: function() {
        return {
          execute: function(cb) {
            cb({});
          }
        };
      },
      delete: function() {
        return {
          execute: function(cb) {
            cb({});
          }
        };
      },
      insert: function() {
        return {
          execute: function(cb) {
            // Used for the 'Creating a list' test
            cb({
              "id": "1",
              "kind": "tasks#taskList",
              "title": "Example list",
              "updated": "2013-01-14T13:58:48.000Z"
            });
          }
        };
      },
      list: function() {
        return {
          execute: function(cb) {
            cb({
              "kind": "tasks#taskLists",
              "items": [
                {
                  "kind": "tasks#taskList",
                  "id": "MDE5MzU2Njg4NDcyNjMxOTE4MzE6MDow",
                  "title": "Default List",
                  "updated": "2012-08-14T13:58:48.000Z",
                },
                {
                  "kind": "tasks#taskList",
                  "id": "MDE5MzU2Njg4NDcyNjMxOTE4MzE6NDg3ODA5MzA2OjA",
                  "title": "Writing",
                  "updated": "2012-07-22T17:58:19.000Z",
                }
              ],
              "result": {
                "kind": "tasks#taskLists",
                "items": [
                  {
                    "kind": "tasks#taskList",
                    "id": "MDE5MzU2Njg4NDcyNjMxOTE4MzE6MDow",
                    "title": "Default List",
                    "updated": "2012-08-14T13:58:48.000Z",
                  },
                  {
                    "kind": "tasks#taskList",
                    "id": "MDE5MzU2Njg4NDcyNjMxOTE4MzE6NDg3ODA5MzA2OjA",
                    "title": "Writing",
                    "updated": "2012-07-22T17:58:19.000Z",
                  }
                ]
              }
            });
          }
        };
      }
    }
  }
};
gapi.auth = {
  authorize: function(options, cb) {
    cb({});
  }
};
