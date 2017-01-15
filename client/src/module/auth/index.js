angular
  .module('CafeApp')
  .component('auth', {
    templateUrl: 'src/module/auth/template/index.html',
    transclude: true,
    controller: ($scope, AuthService, Session) => {
      $scope.submit = (data) => {
        $scope.state = 'processing';

        if ($scope.auth.$valid) {
          Session.create({ 
            username: 'Alex', 
            email: 'test@test.ru', 
            balance: 100
          });

          /*AuthService
            .login({
              name: data.username,
              email: data.email
            })
            .then((user) => {
              $scope.state = 'ready';
            });*/
        }
      }
    }
  })
  .factory('AuthService', ($http) => {
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
  )
  .factory('Session', ($rootScope, AUTH_EVENTS) => {

    const scope = {
      authorized: !!localStorage.user,
      create(user) {
        this.user = user;
        this.authorized =  true;

        localStorage.user = user;

        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      },
      destroy() {
        this.user = null;
        this.authorized = null;
      }
    };

    return scope;
  })
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    logoutSuccess: 'auth-logout-success'
  });