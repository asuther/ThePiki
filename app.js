var pikiApp = angular.module('pikiApp', ['ui.router']).
  config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .state('view', {
            url: '/view?pikiId&tabID',
            templateUrl: 'partials/view.html',
            controller: 'ViewCtrl',
            reloadOnSearch: false
        })
            .state('view.general',{
                url: '/general',
                reloadOnSearch: false,
                views: {
                    'imageOverlay@view': {
                        templateUrl: 'partials/view-general.html',
                        controller: 'GeneralViewCtrl'
                    },
                    'sidebarControls@view': {
                        templateUrl: 'partials/view-general_SidebarControls.html',
                        controller: 'GeneralViewCtrl'
                    }
                }
            })
            .state('view.link',{
                url: '/link',
                reloadOnSearch: false,
                views: {
                    'imageOverlay@view': {
                        templateUrl: 'partials/view-link.html',
                        controller: 'LinkCtrl'
                    },
                    'sidebarControls@view': {
                        templateUrl: 'partials/view-link_SidebarControls.html',
                        controller: 'LinkCtrl'
                    }
                }
            });
    $urlRouterProvider.otherwise('/');
    //view/general?pikiId=1&tabID=1
});
