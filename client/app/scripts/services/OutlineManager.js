'use strict';

clientApp.factory('OutlineManager', function($resource) {

  // $resource(url[, paramDefaults][, actions]);
  return $resource('http://localhost\\:8000/api/:action/:huddleId', 
    {
      action: '@action',
      huddleId: '@huddleId'
    },
    {
      listFilesForHuddle: {
        method: 'GET',
        params: {action:'listFilesForHuddle'}
      },
      updateHuddleOutline: {
        method: 'POST',
        params: {action:'updateHuddleOutline'}
      },
      updateOrder: {
        method: 'POST',
        params: {action:'updateOrder'}
      }
  });

});

// api/
//x listFilesForHuddle/:huddleId
//x updateHuddleOutline/:huddleId
//x updateOrder