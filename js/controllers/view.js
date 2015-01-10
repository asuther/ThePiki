'use strict';

var myApp = angular.module('myApp', []).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/view/:tab_id', {
            templateUrl: 'partials/view.html',
            controller: 'ViewCtrl'
        }).
        when('/catalogue', {
            templateUrl: 'partials/catalogue.html',
            controller: 'CatalogueCtrl'
        }).
        otherwise({redirectTo: '/view/0'});
}]);

myApp.controller('ViewCtrl', function($scope, $routeParams, $compile) {
    console.log('ViewCtrl');
    $scope.model = {tab_id: $routeParams.tab_id};
    $scope.pikiChildren = [];
	$scope.piki_data = {
		name: "Beer",
		tabs: [
			{
				name: "Default",
				children: [
					{
						id: 0,
						name: "Foam",
						coordinates: [[0,0,50,50],[100,0,150,50]],
						link: "cell.html"
					},
					{
						id: 1,
						name: "Hops",
						coordinates: [[50,50,100,100]],
						link: "nucleus.html"
					}
				]
			},
			{
				name: "Chemicals",
				children: [
					{
						id: 0,
						name: "Ethanol",
						coordinates: [[100,50,150,100]],
						link: "cell.html"
					},
					{
						id: 1,
						name: "Water",
						coordinates: [[50,100,100,150]],
						link: "nucleus.html"
					}
				]
			}
		]
	};


	//Create Canvas
	$scope.canvas = $('<canvas class="overlay" width="300" height="300"></canvas>');
	$scope.context = $scope.canvas[0].getContext("2d");

	$('#mouseover_image').after($scope.canvas);

	//Generate Piki Objects
	var currentTabData = $scope.piki_data.tabs[$scope.model.tab_id];
	for(var child_index=0;child_index<currentTabData.children.length;child_index++) {
		var child = currentTabData.children[child_index];
		$scope.pikiChildren.push(new Piki(child,$compile, $scope));
		$scope.pikiChildren[child_index].draw($scope.context);
	}

});
myApp.controller('CatalogueCtrl', function($scope, $routeParams) {
    console.log('CatalogueCtrl');
});
