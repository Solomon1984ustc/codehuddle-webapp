'use strict';

clientApp.controller('CreateCtrl', function($scope, $location, Huddle) {
  
  $scope.huddle = Huddle.get();

  $scope.showTip = false;

  $scope.focus = function(){
    $scope.showTip = true;
  }

  $scope.blur = function(){
    $scope.showTip = false;
  }

  $scope.create = function() {
    Huddle.create(function(huddleId){
      //console.log("id of new huddle: " + huddleId);
      //$location.path('edit/' + huddleId);
      $location.path('settings/' + huddleId);
    });
  }

});