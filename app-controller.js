pikiApp.factory('pikiAutosearch', function ($http) {


    return {
        search: function(queryString) {
            return $http({
                method: 'GET',
                url: 'ajax/searchPikis.php',
                params: {
                            'queryString': queryString
                        }
            })
            .then(function(pikiSearchResults) {
                return pikiSearchResults.data;
            });
        }
    };
});


pikiApp.controller('HomeCtrl', function($scope, $state, $stateParams, $compile, $q, pikiAutosearch) {
    $scope.searchResults = [];
    $scope.searchBarChanged = function(searchTerm) {
        console.log(searchTerm);
        pikiAutosearch.search(searchTerm).then(function(searchResultData) {
            console.log(searchResultData);
            $scope.searchResults = searchResultData;
        });
    };

});
