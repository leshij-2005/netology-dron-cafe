angular
  .module('CafeApp')
  .component('auth', {
    templateUrl: 'src/module/auth/template/index.html',
    transclude: true,
    controller: ($scope, authService) => {
      $scope.submit = (data) => {
        $scope.state = 'processing';

        if ($scope.auth.$valid) {
          debugger;

          authService
            .login({
              name: data.name,
              email: data.email
            })
            .then((user) => {
              $scope.state = 'ready';
            });
        }
      }
    }
  })
  .factory('authService', ($http) => {
      return {
        login: (data) => {
          return $http({
            method: 'POST',
            url: 'http://localhost:3000/v1/auth',
            data: data
          });
        }
      }
    }
  );