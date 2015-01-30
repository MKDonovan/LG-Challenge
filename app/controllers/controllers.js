'use strict';

var threatControllers = angular.module('threatControllers', []);


threatControllers.controller('ThreatListCtrl', ['$scope',  'Threat', 'UtilityService', 
	function($scope, Threat, UtilityService) {

		var functionArray = ["web server", "mail server", "ftp server"]		

		$scope.threats = Threat.query(function(threats) {
			$scope.processData(threats);	
		});	

		$scope.processData = function(threats) {
			 var categoryCount = {
				'Spam' : 0,
				'Bots' : 0,
				'Trojans' : 0
			};
			for (var i=0; i<threats.length; i++) {
				for (var j=0; j<threats[i].virus.length; j++) {
					$scope.updateCategoryCount(categoryCount, threats[i].virus[j]);
				}
			}
			var categoryArray = []
			for (var key in categoryCount) {
				categoryArray.push({
					name: key,
					count: categoryCount[key]
				})
			}
			categoryArray.sort(function(a,b) { return b.count > a.count || (b.count == a.count && b.name > a.name )})
	 		$scope.categoryArray= categoryArray	
		};		
			

		$scope.updateCategoryCount = function(categoryCount, virus) {
			/spam/i.test(virus) ? 
				categoryCount['Spam'] ++ : /bot/i.test(virus) ?
					categoryCount['Bots'] ++ : categoryCount['Trojans'] ++
		};

		$scope.getRandomData = function(virus) {
			var n = 2;
			while (n--)	{
				$scope.threats.push({
					ip: UtilityService.generateRandomIpAddress(), 
					virus: UtilityService.generateRandomVirusArray(), 				
					function: functionArray[UtilityService.generateRandomNumber(3)] 
				});
			}
			$scope.processData($scope.threats);
		};					

		$scope.interval = setInterval(function() {

			$scope.$apply(function() {
				$scope.getRandomData();
			});

		}, 5000);		


		
}]);