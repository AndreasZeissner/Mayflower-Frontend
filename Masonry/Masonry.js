	/*
		Module used for all interaction with the Masonry Model wich is defined in the MasonryFactory

		MasonryController -> View: main 
		Loads all masonrybricks from the server 

		TakeImageController -> View: takePicture
		Used for makeing images and uploading them 

	*/
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

	.controller('TakeImageController', ['$scope', 'MasonryFactory', 'Camera', '$ionicLoading',   function ($scope, MasonryFactory, Camera, $ionicLoading) {
			$scope.masonry = {

				"text" : "http://images.gofreedownload.net/tango-camera-photo-5741.jpg",
				"name" : null
			};
			
			
				
			$scope.takePicture = function () {
				Camera.getPicture().then(function(imageUri) {
					$scope.masonry.text = "data:image/jpeg;base64," + imageUri;
				});
			}

			$scope.update = function () {
				if($scope.masonry.text == "http://images.gofreedownload.net/tango-camera-photo-5741.jpg") {
					alert('Take image first');
				}else{
				var newImage = new MasonryFactory($scope.masonry); 
				console.log(newImage);
				showLoading();
				newImage.$save().then(function() {
					hideLoading();
					$scope.masonry.text = "http://images.gofreedownload.net/tango-camera-photo-5741.jpg";
					$scope.masonry.name = null;
				});
				}
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
	}]);




