'use strict';

clientApp.controller('PreviewCtrl', function($scope, $routeParams, Huddle) {
  $scope.huddleId = $routeParams.huddleId;

  $scope.huddle = Huddle.getDummyData();
  
});
