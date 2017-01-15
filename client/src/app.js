const cafeApp = angular.module('CafeApp', ['ngRoute', 'ngMaterial']);

angular
  .module('CafeApp')

  .controller('App', ($scope, Session, AUTH_EVENTS) => {
    $scope.authorized = Session.authorized;

    const isAuthorized = () => {
      $scope.authorized = Session.authorized;
    };

    $scope.$on(AUTH_EVENTS.loginSuccess, isAuthorized);
    $scope.$on(AUTH_EVENTS.logoutSuccess, isAuthorized)
  })

  .config(['$routeProvider', ($routeProvider) => {
      $routeProvider.
      otherwise({
        redirectTo: '/'
      });
    }
  ]);
