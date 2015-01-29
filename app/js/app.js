'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'threatControllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/threats', {
        templateUrl: 'partials/threat-list.html',
        controller: 'ThreatListCtrl'
      }).otherwise({redirectTo: '/threats'});
}]);