'use strict';

clientApp.controller('SettingsCtrl', function($scope, $routeParams, Huddle) {

  // if ( typeof $routeParams.huddleId !== "undefined" ) {
  //   console.log($routeParams.huddleId);
  //   $scope.huddleId = $routeParams.huddleId;
  //   $scope.huddle = Huddle; //TODO: query db for this id
  // }else{
    $scope.huddle = Huddle.getDummyData();
  // }

  $scope.isEditingName = false;

  $scope.editName = function() {
    $scope.isEditingName = true;
  }

  $scope.finishEditName = function() {
    $scope.isEditingName = false;
  }

  $scope.save = function() {
    Huddle.save(function(huddleName, techMain){
      //console.log("saved!", huddleName, techMain, $scope.huddle);
    });
  }

});