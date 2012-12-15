'use strict';

clientApp.controller('MainCtrl', function($scope, $resource, Huddle, Mongo) {

  $scope.result = { text: "loading" };

  $scope.sitemap = [
    {title:'Browse',view:''},
    {title:'Create',view:'create'},
    {title:'Edit',view:'edit/123'},
    {title:'Preview',view:'preview/123'},
    {title:'Pick',view:''}
  ];

  $scope.test = function() {

    if ( $scope.result.text == "loading" ) {
      Mongo.get({huddleId: 'test'}, function(result) {
        $scope.result = result;
      });
    }else{
      Mongo.get({huddleId: 'again'}, function(result) {
        $scope.result = result;
      });
    }

  }

});
