angular.module('MasonryModule', ['ngResource'])


	.controller('MasonryController', ['$scope', 'MasonryFactory', '$ionicLoading', function($scope, MasonryFactory, $ionicLoading){
			// Calling Rest-> Getting data and closing ionicloading			
			MasonryFactory.query(function(data) {
  				$scope.masonrybricks = data; 
  				hideLoading();
  				
			});
			
	

			var showLoading = function() {
			    $ionicLoading.show({
			      template: 'Loading...'
			    });
			};
			var hideLoading = function(){
			    $ionicLoading.hide();
			};

			showLoading();


		}])

	.controller('TakeImageController', ['$scope', 'MasonryFactory', 'Camera', '$ionicLoading',  function ($scope, MasonryFactory, Camera, $ionicLoading) {

			$scope.image = null;
			$scope.takePicture = function () {
				Camera.getPicture().then(function(imageUri) {
					$scope.image = "data:image/jpeg;base64," + imageUri;
					
				});

			}
			$scope.update = function () {
				
				var newImage = new MasonryFactory({text: $scope.image}); 
				showLoading();
				newImage.$save().then(function() {
					hideLoading();
					$scope.image = null;
				});
			}

			var showLoading = function() {
			    $ionicLoading.show({
			      template: 'Loading...'
			    });
			};
			var hideLoading = function(){
			    $ionicLoading.hide();
			};

			


	}])

	.factory('MasonryFactory', ['$resource', function($resource) {
		return $resource('http://www.almmp.de/Andreas/Mayflower/Backend/public/api/masonrybrick');
	}])



	// Factory for takeing Pictures

	.factory('Camera', ['$q', 'MasonryFactory', function($q, MasonryFactory) {

	  return {
	    getPicture: function(options) {
	      var q = $q.defer();

	      navigator.camera.getPicture(function(result) {
	        // Do any magic you need

	        console.log(result);
	        q.resolve(result);
	      }, function(err) {
	        q.reject(err);
	      }, {
	      	quality: 100, 
	      	destinationType: 0,
	      	encodingType: 0, 
	      	allowEdit : true,
  			targetWidth: 512,
  			targetHeight: 512,

	      });

	      return q.promise;
	    }
	  }
	}]);




