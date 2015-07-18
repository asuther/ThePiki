'use strict';

var pikiApp = angular.module('pikiApp', []).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/view/:pikiId/', {
            templateUrl: 'partials/view.html',
            controller: 'ViewCtrl',
            reloadOnSearch: false
        }).
        when('/catalogue', {
            templateUrl: 'partials/catalogue.html',
            controller: 'CatalogueCtrl'
        }).
        otherwise({redirectTo: '/view/1/?tabID=1'});
}]);

//Factor: loadPikiService
//Description:  Contacts a MySQL database in order to load data about the current
//              piki's tabs and children

pikiApp.factory('loadPikiService', function($http) {
   return {
        getPikiData: function(pikiID, tabID) {
             return $http({
                            method: 'GET',
                            url: 'ajax/getPikiData.php',
                            params: {
                                        pikiID: pikiID,
                                        tabID: tabID
                                    }
                        })
                       .then(function(pikiDataResult) {
                            return pikiDataResult.data;
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
                       .then(function(tabDataResult) {
                            return tabDataResult.data;
                        });
        }

   };
})

pikiApp.controller('ViewCtrl', function($scope, $routeParams, $compile, $q, loadPikiService) {
    console.log('Reloading controller');
    console.log($routeParams)
    //Get the piki ID and tab ID from the routing parameters
    $scope.model = {
      pikiId: $routeParams.pikiId,
      tabId: $routeParams.tabID
    };
    $scope.pikiChildren = [];

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

            //...get the coordinates of the child's region and convert them to a json object
            childrenData[child_index].coordinates = JSON.parse( childrenData[child_index].coordinates );

            //...create a piki object and store in the local scope, then draw it on screen
            $scope.pikiChildren[childrenData[child_index].id] = new Piki(child,$compile, $scope);
            $scope.pikiChildren[childrenData[child_index].id].draw($scope.context);
        }
    });



	//Create Canvas
	$scope.canvas = $('<canvas class="overlay" width="300" height="300"></canvas>');
	$scope.context = $scope.canvas[0].getContext("2d");

	$('#mouseover_image').after($scope.canvas);

    $scope.loadTabData = function(tabID) {

    };

});
