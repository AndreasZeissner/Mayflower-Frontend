angular.module('ServerLogsModule', ['ngResource'])
	.controller('ServerLogsController', ['$scope','ServerLogs', function($scope, ServerLogs) {
		$scope.logs = ServerLogs.query();
		

	}])
	.factory('ServerLogs', ['$resource', function ($resource) {
		// local test Api
		return $resource('http://localhost:8000/api/serverlogs');

	}]);










