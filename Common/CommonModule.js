angular.module('CommonModule', [])
	.controller('CommonTesterController', [function () {
		alert("TEST");
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
	      	quality: 50, 
	      	destinationType: 0,
	      	encodingType: 0, 
	      	allowEdit : true,
  			targetWidth: 512,
  			targetHeight: 512,

	      });

	      return q.promise;
	    }
	  }
	}])
	.controller(function($scope, $ionicActionSheet, $timeout) {

	 // Triggered on a button click, or some other target
	 $scope.show = function() {

	   // Show the action sheet
	   var hideSheet = $ionicActionSheet.show({
	     buttons: [
	       { text: '<b>Share</b> This' },
	       { text: 'Move' }
	     ],
	     destructiveText: 'Delete',
	     titleText: 'Modify your album',
	     cancelText: 'Cancel',
	     cancel: function() {
	          // add cancel code..
	        },
	     buttonClicked: function(index) {
	       return true;
	     }
	   });

	   // For example's sake, hide the sheet after two seconds
	   $timeout(function() {
	     hideSheet();
	   }, 2000);

	 };
	});

