var cafeApp = angular.module('CafeApp', ['ngRoute', 'ngMaterial']);

angular
  .module('CafeApp')

  .config(['$routeProvider', ($routeProvider) => {
      $routeProvider.
      otherwise({
        redirectTo: '/'
      });
    }
  ]);
