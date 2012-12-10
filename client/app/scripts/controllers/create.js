'use strict';

clientApp.controller('CreateCtrl', function($scope) {
  $scope.hideTip = true;

  $scope.focus = function(){
    $scope.hideTip = false;
  }

  $scope.blur = function(){
    $scope.hideTip = true;
  }

  $scope.create = function() {
    console.log("create new huddle: ", $scope.huddleName);
    //clientApp.save($scope.project, function(project) {
      $location.path('edit');
    //});
  }

});