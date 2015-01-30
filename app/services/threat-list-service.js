'use strict';

/* Services */

var threatServices = angular.module('threatServices', ['ngResource']);

threatServices.factory('Threat', ['$resource',
  function($resource){
    return $resource('json/:threatId.json', {}, {
      query: {method:'GET', params:{threatId:'threats'}, isArray:true}
    });
  }]);