'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
              templateUrl: 'app/view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

        .controller('View1Ctrl', ['$scope', '$http', '$interval', function (scope, http, interval) {
            scope.counter = 1;
            scope.showIngredients = false;
            scope.timer = 0;
            scope.timeRemaining = "0:00";

            http.jsonp("https://api.forage.co/v1/recipe/view?recipe_id=109121&callback=JSON_CALLBACK")
                    .success(function (response) {
                      scope.recipe = response.data;
                      scope.length = scope.recipe.recipe.meta.length;
                    });

            scope.$watch('counter', function (newvalue, oldvalue, scope) {
              scope.stepNumber = "" + newvalue;
            });

            scope.$watch('timer', function (newvalue, oldvalue, scope) {
              var convert = function (time) {
                var result, seconds;
                seconds = time % 60;
                result = Math.floor(time / 60) + ":" + ((seconds < 10) ? "0" + seconds : seconds);
                return result;
              };
              scope.timeRemaining = convert(newvalue);
            });

            scope.decrementCounter = function (e) {
              e.stopPropagation();
              scope.counter -= 1;
            };

            scope.incrementCounter = function () {
              if (scope.counter < scope.length + 1) {
                scope.counter += 1;
              }
            };

            scope.startTimer = function (e) {
              e.stopPropagation();
              interval(function () {
                if (scope.timer > 0) {
                  scope.timer -= 1;
                }
              }, 1000, scope.timer);
            };

            scope.displayIngredients = function (e) {
              e.stopPropagation();
              scope.showIngredients = !scope.showIngredients;
            };

            scope.status = {
              isItemOpen: new Array(scope.length),
              isFirstDisabled: false
            };

            scope.status.isItemOpen[0] = true;

            scope.findMinutes = function (e) {
              var index, directions, minutesIndex;
              e.stopPropagation();
              index = e.srcElement.childNodes[0].nodeValue.split(' ')[1] - 1;
              directions = scope.recipe.recipe.meta[index].value.replace(/\,/g, "").replace(/\./g, "").split(" ");
              minutesIndex = directions.indexOf("minutes");
              if (minutesIndex > 0) {
                scope.timer = directions[minutesIndex - 1] * 60;
              }
            };
          }]);
