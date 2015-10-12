var pikiApp = angular.module('pikiApp', ['ui.router'], function($httpProvider) {
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

  /**
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   */
  var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

    for(name in obj) {
      value = obj[name];

      if(value instanceof Array) {
        for(i=0; i<value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }

    return query.length ? query.substr(0, query.length - 1) : query;
  };

  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .state('create', {
          url: '/create',
          templateUrl: 'pikiCreate/create.html',
          controller: 'CreateCtrl'
        })
        .state('view', {
            url: '/view?pikiId&tabID',
            templateUrl: 'pikiView/view.html',
            controller: 'ViewCtrl',
            reloadOnSearch: false
        })
            .state('view.general',{
                url: '/general',
                reloadOnSearch: false,
                views: {
                    'imageOverlay@view': {
                        templateUrl: 'pikiView/general/view-general.html',
                        controller: 'GeneralViewCtrl'
                    },
                    'sidebarControls@view': {
                        templateUrl: 'pikiView/general/view-general_SidebarControls.html',
                        controller: 'GeneralViewCtrl'
                    }
                }
            })
            .state('view.link',{
                url: '/link',
                reloadOnSearch: false,
                views: {
                    'imageOverlay@view': {
                        templateUrl: 'pikiView/link/view-link.html',
                        controller: 'LinkCtrl'
                    },
                    'sidebarControls@view': {
                        templateUrl: 'pikiView/link/view-link_SidebarControls.html',
                        controller: 'LinkCtrl'
                    }
                }
            });
    $urlRouterProvider.otherwise('/');
    //view/general?pikiId=1&tabID=1
});
