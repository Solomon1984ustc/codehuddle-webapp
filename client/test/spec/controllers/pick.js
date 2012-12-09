'use strict';

describe('Controller: PickCtrl', function() {

  // load the controller's module
  beforeEach(module('clientApp'));

  var PickCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    PickCtrl = $controller('PickCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
