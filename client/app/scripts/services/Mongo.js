'use strict';

clientApp.factory('Mongo', function($resource) {

  // $resource(url[, paramDefaults][, actions]);
  return $resource('json/:huddleId.json', {}, {});

  /*
  return {
    get: function() {
      console.log("get");
      return $resource('json/:huddleId.json');
    }
  }
  */

});
