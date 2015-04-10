'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.bootstrap',
  'ngRoute',
  'myApp.view1'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

// The following two modules are needed to enable the functionality of accordion in ui-bootstrap.
angular.module("template/accordion/accordion-group.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/accordion/accordion-group.html",
            "<div class=\"panel panel-default\">\n" +
            "  <div class=\"panel-heading\" >\n" +
            "    <h4 class=\"panel-title\"><a data-toggle=\"collapse\" ng-click=\"isOpen = !isOpen\" accordion-transclude=\"heading\">{{heading}}</a></h4>\n" +
            "  </div>\n" +
            "  <div class=\"panel-collapse\" ng-hide=\"!isOpen\">\n" +
            "    <div class=\"panel-body\" ng-transclude></div>  </div>\n" +
            "</div>");
  }]);

angular.module("template/accordion/accordion.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/accordion/accordion.html",
            "<div class=\"panel-group\" ng-transclude></div>");
  }]);