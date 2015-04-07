angular.module('DiscogsModule', [])
	.controller('DiscogsController', ['$scope', '$http', function($scope, $http) {
		$scope.data = "";


		 $http({method: 'GET', url: 'https://api.discogs.com/artists/' + 1}).
        success(function(data, status) {
          $scope.status = status;
          console.log("test");
          $scope.data = data;
        }).
        error(function(data, status) {
          $scope.data = data || "Request failed";
          $scope.status = status;
      });

	}]);







