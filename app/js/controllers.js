'use strict';

var threatControllers = angular.module('threatControllers', []);


threatControllers.controller('ThreatListCtrl', ['$scope', '$http',
	function($scope, $http) {

		$scope.categoryCount = {
			'Spam' : 0,
			'Bots' : 0,
			'Trojans' : 0
		};

		$scope.updateCategoryCount = function(virus) {
			/spam/i.test(virus) ? 
				$scope.categoryCount['Spam'] ++ : /bot/i.test(virus) ?
					$scope.categoryCount['Bots'] ++ : $scope.categoryCount['Trojans'] ++
		};

		// $http.get('json/data.json').success(function(data) {
	 //      $scope.threats = data.threatData;
	 //      for (var i=0; i<$scope.threats.length; i++) {
	 //      	for (var j=0; j<$scope.threats[i].virus.length; j++) {
  //           	if (!categoryCounter[$scope.threats[i].virus[j]]) { 
  //             		categoryCounter[$scope.threats[i].virus[j]]] = {count: 1}; 
  //           	}
  //           	categoryCounter[$scope.threats[i].virus[j]]].counter += 1;
	 //      	}
	 //      }
	 //      var categoryArray = []
	 //      for (key in categoryCounter) {
	 //        categoryArray.push({
	 //          name: key, 
	 //          count: categoryCounter[key]
	 //        });
	 //      }
	      
	 //      categoryArray.sort(function(a,b) {return b.count > a.count})
	 //      $scope.test= 'test'
	 //    });		

		

		$http.get('json/data.json').success(function(data) {
			var tempCounts = {}
	      $scope.threats = data.threatData;
	      for (var i=0; i<$scope.threats.length; i++) {
	      	for (var j=0; j<$scope.threats[i].virus.length; j++) {
	      		$scope.updateCategoryCount($scope.threats[i].virus[j]);
	      		if (!tempCounts[$scope.threats[i].virus[j]]) {
	      			tempCounts[$scope.threats[i].virus[j]] = {count: 0}
	      		}
	      		tempCounts[$scope.threats[i].virus[j]].count ++
	      	}
	      }
	      var categoryArray = []
	      for (var key in tempCounts) {
	      	categoryArray.push({
	      		name: key,
	      		count: tempCounts[key].count
	      	})
	      }
			categoryArray.sort(function(a,b) { return b.count > a.count || (b.count == a.count && b.name > a.name )})
	      $scope.categoryArray= categoryArray
	    });
		
}]);