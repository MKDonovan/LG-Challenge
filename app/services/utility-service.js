'use strict';

/* App Module */

var myApp = angular.module('myApp');
   
myApp.factory("UtilityService", function($rootScope) {
    return {
      generateRandomNumber: function(maxCount) {
        return Math.floor(Math.random() * maxCount); 
      },
      generateRandomIpAddress: function(max) {
        return this.generateRandomNumber(256) + '.' + this.generateRandomNumber(256) + '.' + this.generateRandomNumber(256) + '.' + this.generateRandomNumber(256);
      },
      generateRandomVirusArray: function() {
      	var virusArray = ["APT1", "Botnet", "Spam", "StealCreds"];
      	var randomVirusArray = [];
      	var virusCount = this.generateRandomNumber(3) + 1;
      	for (var i=0; i < virusCount; i++) {
      		var newVirus = virusArray[this.generateRandomNumber(4)];
      		if (randomVirusArray.indexOf(newVirus) < 0) {
      			randomVirusArray.push(newVirus)
      		}
      	}
        return randomVirusArray;
      }          
    };
});