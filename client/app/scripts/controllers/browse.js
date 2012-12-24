'use strict';

clientApp.controller('BrowseCtrl', function($scope, Mongo) {

  $scope.path = 'http://localhost:8000/huddles/';
  $scope.huddles = [];
  $scope.orderByFilter = "-creationDate";
  $scope.query = {}; //for filtering

  $scope.huddles = Mongo.listAllHuddles(
    {},
    function(){
      console.log("get success", $scope.huddles);
    },
    function(err){
      console.log("get error", err);
    }
  );

  $scope.setOrderFilter = function(filter) {
    if ( filter === 'date') {
      $scope.orderByFilter = "-creationDate";
    }else{
      $scope.orderByFilter = "studentRank";
    }
  }

  $scope.orderedByDate = function() {
    if ( $scope.orderByFilter.indexOf('creationDate') > -1 ) {
      return true;
    }else{
      return false;
    }
  }

  $scope.init = function() {
    $(window).load(function() {
      //enable the filter by tech section
      $('#tech-tags').tagsInput({ 
          autocomplete_url: '/technologies.html', //TODO: not working?
          onChange: $scope.filterTech,
          width: '100%', 
          height: '16px'
        });
    });
  }

  $scope.filterTech = function() {
    var technologies = $('#tech-tags').val().split(',');
    $scope.query.techMain = technologies;
    $scope.query.techSupporting = technologies;
    //if a scope digestion is already going on then it will get picked up and you won't
    //have to call the $scope.$apply() method
    if(!$scope.$$phase) { //this is used to prevent an overlap of scope digestion
      $scope.$apply(); //this will kickstart angular to recognize the change
    }
  }

  $scope.split = function(tagArray) {
    return tagArray.split(',');
  }

});
