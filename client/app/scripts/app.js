'use strict';

var clientApp = angular.module('clientApp', ['ngResource','ui'])
  .config(['$routeProvider', function($routeProvider,$locationProvider) {
    //$locationProvider.html5mode = true;
    //console.log($locationProvider);

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/create', {
        templateUrl: 'views/create.html',
        controller: 'CreateCtrl'
      })
      .when('/edit/:huddleId', {
        templateUrl: 'views/edit.html',
        controller: 'EditCtrl'
      })
      .when('/preview/:huddleId', {
        templateUrl: 'views/preview.html',
        controller: 'PreviewCtrl'
      })
      .when('/pick/:huddleId', {
        templateUrl: 'views/pick.html',
        controller: 'PickCtrl'
      })
      .when('/settings/:huddleId', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .otherwise({
        redirectTo: '/create'
      });
  }]);
