'use strict';

clientApp.factory('Huddle', function($resource, Mongo) {

  var _huddle = {};

  // Public API here
  return {
    get: function(){
      return _huddle;
    },
    create: function(callback) {
      _huddle.huddleId = 333; //TODO: Should be created in Mongo then returned
      callback(_huddle.huddleId);
    },
    save: function(callback) {
      // TODO: Should be saved to Mongo
      // Maybe not important but _huddle doesn't reflect undated info
      // unless exact property is debugged.
      console.log("SAVED!", _huddle.huddleName, _huddle.techMain, _huddle);
      callback(_huddle.huddleName, _huddle.techMain);
    }, 
    getDummyData: function(){
      // for testing or when Mongo is not available
      var id = ( _huddle && _huddle.huddleId ? _huddle.huddleId : 123 );
      var name = ( _huddle && _huddle.huddleName ? _huddle.huddleName : "Test Huddle" );
      _huddle = { huddleId: id,
                  huddleName: name,
                  techMain: "main tech",
                  techSupporting: "supporting tech",
                  experience: 1,
                  duration: 3 }
      return _huddle;
    }
  };


});
