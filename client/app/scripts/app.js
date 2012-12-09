'use strict';

var clientApp = angular.module('clientApp', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/create', {
        templateUrl: 'views/create.html',
        controller: 'CreateCtrl'
      })
      .when('/edit', {
        templateUrl: 'views/edit.html',
        controller: 'EditCtrl'
      })
      .when('/view', {
        templateUrl: 'views/view.html',
        controller: 'ViewCtrl'
      })
      .when('/pick', {
        templateUrl: 'views/pick.html',
        controller: 'PickCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
