'use strict';

clientApp.controller('MainCtrl', function($scope) {
  $scope.sitemap = [
    {title:'Browse',view:''},
    {title:'Create',view:'create'},
    {title:'View',view:''},
    {title:'Pick',view:''}
  ];
});
