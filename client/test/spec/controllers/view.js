'use strict';

describe('Controller: ViewCtrl', function() {

  // load the controller's module
  beforeEach(module('clientApp'));

  var ViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    ViewCtrl = $controller('ViewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
