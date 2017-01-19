const cafeApp = angular.module('CafeApp', ['ngRoute', 'ngMaterial', 'btford.socket-io']);

angular
  .module('CafeApp')
  .config(['$routeProvider', ($routeProvider) => {
      $routeProvider.
        when('/', {
          templateUrl: 'src/module/customer/template/index.html',
          controller: 'Customer'
        }).
        when('/kitchen', {
          templateUrl: 'src/module/kitchen/template/index.html',
          controller: 'Kitchen'
        }).
        otherwise({
          redirectTo: '/'
        });
    }
  ]);
