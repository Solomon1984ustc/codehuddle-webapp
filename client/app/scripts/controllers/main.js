'use strict';

clientApp.controller('MainCtrl', function($scope, $resource, Huddle, Mongo) {

  $scope.sitemap = [
    {title:'Browse',view:'browse'},
    {title:'Create',view:'create'},
    {title:'Edit',view:'edit/50bb7d197a22ba50e2000001'},
    {title:'Preview',view:'preview/50bb7d197a22ba50e2000001'},
    {title:'Pick',view:'pick/50bb7d197a22ba50e2000001'}
  ];

});
