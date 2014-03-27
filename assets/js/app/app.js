'use strict';

// need for facebook callback
if (window.location.hash == '#_=_') {
    window.location.hash = '';
}
console.log("URL INIT -> " + document.URL);

angular.module('angular-client-side-auth', ['ngCookies', 'ngRoute'])

    .config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

    var access = routingConfig.accessLevels;

    $routeProvider.when('/',
        {
            templateUrl:    'home',
            controller:     'HomeCtrl',
            access:         access.user
        });
    $routeProvider.when('/login',
        {
            templateUrl:    'login',
            controller:     'LoginCtrl',
            access:         access.anon
        });
    $routeProvider.when('/register',
        {
            templateUrl:    'register',
            controller:     'RegisterCtrl',
            access:         access.anon
        });
    $routeProvider.when('/private',
        {
            templateUrl:    'private',
            controller:     'PrivateCtrl',
            access:         access.user
        });
    $routeProvider.when('/admin',
        {
            templateUrl:    'admin',
            controller:     'AdminCtrl',
            access:         access.admin
        });
    $routeProvider.when('/404',
        {
            controller:     '404Ctrl',
            templateUrl:    '404',
            access:         access.public
        });
    $routeProvider.otherwise({redirectTo:'/404'});

    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push(['$rootScope','$q', '$location', function($rootScope, $q, $location) {
        return {
            'responseError': function(response) {

                if(response.status === 401 || response.status === 403) {
                    $location.path('/login');
                } else if(response.status === 500){
                    $rootScope.error = "Internal server error";
                } else {
                    if (typeof response.data.errors != 'undefined')
                    {
                        var result="";
                        for(var error in response.data.errors) {
                            result+=error;
                        }
                        $rootScope.error = result;
                    }

                }

                return $q.reject(response);
            }
        }
    }]);

}])

    .run(['$rootScope', '$location', '$http', 'Auth', function ($rootScope, $location, $http, Auth) {
        console.log($location);
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.error = null;
            if (!Auth.authorize(next.access)) {
                if(Auth.isLoggedIn())
                    $location.path('/');
                else
                    $location.path('/login');
            }
        });

    }]);