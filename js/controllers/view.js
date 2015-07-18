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

    //Get the piki ID and tab ID from the routing parameters
    $scope.model = {
      pikiId: $routeParams.pikiId,
      tabId: $routeParams.tabId
    };

    //Load the Piki Data and Tab Data
    var pikiDataDelivered = $q.all([
                                loadPikiService.getPikiData($scope.model.pikiId, 1),
                                loadPikiService.getTabData($scope.model.pikiId)
                            ]);

    //When the promise of piki and tab data has been fulfilled
    pikiDataDelivered.then(function(response) {
        console.log("Response Object from getPikiData()")
        console.log(response);

        //...store the tab and piki data in the scope
        $scope.piki_data =  response[0];
        $scope.tabData = response[1];

        //Generate piki children
        var childrenData = $scope.piki_data.childrenData;

        //For all children within the current piki...
        for(var child_index = 0 ; child_index < childrenData.length ; child_index++) {
        var child = childrenData[child_index];
        childrenData[child_index].coordinates = JSON.parse( childrenData[child_index].coordinates );  //Convert coordinates to json
        $scope.pikiChildren[childrenData[child_index].id] = new Piki(child,$compile, $scope);
        $scope.pikiChildren[childrenData[child_index].id].draw($scope.context);
        }
    });

    $scope.pikiChildren = [];

	//Create Canvas
	$scope.canvas = $('<canvas class="overlay" width="300" height="300"></canvas>');
	$scope.context = $scope.canvas[0].getContext("2d");

	$('#mouseover_image').after($scope.canvas);


});
myApp.controller('CatalogueCtrl', function($scope, $routeParams) {
    console.log('CatalogueCtrl');
});
