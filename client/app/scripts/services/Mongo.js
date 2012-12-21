'use strict';

clientApp.factory('Mongo', function($resource) {

  // $resource(url[, paramDefaults][, actions]);
  return $resource('http://localhost\\:8000/api/:action/:huddleId', 
    {
      action: '@action',
      huddleId: '@huddleId'
    },
    {
      createHuddle: {
        method: 'POST',
        params: {action:'createHuddle'}
      },
      getHuddle: {
        method: 'POST',
        params: {action:'getHuddle'}
      },
      updateHuddle: {
        method: 'POST',
        params: {action:'updateHuddle'}
      }
  });

});

//listAllHuddles

// api/
//x createHuddle
//x updateHuddle/:huddleId
//generate/:huddleId
//listFilesForHuddle/:huddleId
//updateHuddleOutline/:huddleId

//cherryPick
//updateOrder

//updateFile
//viewFile/:filename/:huddleID
//viewFileFromIndividual/:filename/:huddleID
//viewFileFromPresentation/:filename/:huddleID

//huddles/:huddleId

