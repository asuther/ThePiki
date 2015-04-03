'use strict';

var myApp = angular.module('myApp', []).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/view/:pikiId/:tabId', {
            templateUrl: 'partials/view.html',
            controller: 'ViewCtrl'
        }).
        when('/catalogue', {
            templateUrl: 'partials/catalogue.html',
            controller: 'CatalogueCtrl'
        }).
        otherwise({redirectTo: '/view/1/0'});
}]);

myApp.factory('loadPikiService', function($http) {
   return {
        getPikiData: function(pikiID, tabID) {
             //return the promise directly.
             return $http({
                            method: 'GET',
                            url: 'ajax/getPikiData.php',
                            params: {
                                        pikiID: pikiID,
                                        tabID: tabID
                                    }
                        })
                       .then(function(result) {
                            //resolve the promise as the data
                            return result.data;
                        });
        },

        getTabData: function(pikiID) {
             //return the promise directly.
             return $http({
                            method: 'GET',
                            url: 'ajax/getTabData.php',
                            params: {
                                        pikiID: pikiID
                                    }
                        })
                       .then(function(result) {
                            //resolve the promise as the data
                            return result.data;
                        });
        }

   };
})

myApp.controller('ViewCtrl', function($scope, $routeParams, $compile, $q, loadPikiService) {
    //console.log('ViewCtrl');
    //console.log($routeParams);
    $scope.model = {
      pikiId: $routeParams.pikiId,
      tabId: $routeParams.tabId
    };

    var pikiDataDelivered = $q.all([
                                loadPikiService.getPikiData($scope.model.pikiId, 1),
                                loadPikiService.getTabData($scope.model.pikiId)
                            ]);

    pikiDataDelivered.then(function(response) {
      console.log("Response Object from getPikiData()")
      console.log(response);

      $scope.tabData = response[1];

      $scope.piki_data =  response[0];
      //Generate Piki Objects
      var childrenData = $scope.piki_data.childrenData;
      for(var child_index = 0 ; child_index < childrenData.length ; child_index++) {
        var child = childrenData[child_index];
        childrenData[child_index].coordinates = JSON.parse( childrenData[child_index].coordinates );  //Convert coordinates to json
        $scope.pikiChildren[childrenData[child_index].id] = new Piki(child,$compile, $scope);
        $scope.pikiChildren[childrenData[child_index].id].draw($scope.context);
       }
    });
    $scope.pikiChildren = [];
	// $scope.piki_data = {
	// 	name: "beer",
 //        imageType: 'jpg',
 //        imagePath: 'images/',
	// 	tabs: [
	// 		{
	// 			name: "Default",
	// 			children: [
	// 				{
	// 					id: 0,
	// 					name: "Foam",
	// 					coordinates: [[0,0,50,50],[100,0,150,50]],
	// 					link: "cell.html"
	// 				},
	// 				{
	// 					id: 1,
	// 					name: "Hops",
	// 					coordinates: [[50,50,100,100]],
	// 					link: "nucleus.html"
	// 				}
	// 			]
	// 		},
	// 		{
	// 			name: "Chemicals",
	// 			children: [
	// 				{
	// 					id: 0,
	// 					name: "Ethanol",
	// 					coordinates: [[100,50,150,100]],
	// 					link: "cell.html"
	// 				},
	// 				{
	// 					id: 1,
	// 					name: "Water",
	// 					coordinates: [[50,100,100,150]],
	// 					link: "nucleus.html"
	// 				}
	// 			]
	// 		}
	// 	]
	// };



	//Create Canvas
	$scope.canvas = $('<canvas class="overlay" width="300" height="300"></canvas>');
	$scope.context = $scope.canvas[0].getContext("2d");

	$('#mouseover_image').after($scope.canvas);


});
myApp.controller('CatalogueCtrl', function($scope, $routeParams) {
    console.log('CatalogueCtrl');
});
