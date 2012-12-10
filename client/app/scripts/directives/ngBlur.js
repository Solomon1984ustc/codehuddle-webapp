'use strict';

clientApp.directive('ngBlur', function() {
  return function postLink(scope, element, attrs) {
    element.bind('blur', function () {
      scope.$apply(attrs.ngBlur);
    });
  };
});
