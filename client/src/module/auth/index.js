cafeApp
  .component('auth', {
    templateUrl: 'src/module/auth/template/index.html',
    controller: ($scope, AuthService, Session) => {
      $scope.submit = (data) => {
        $scope.state = 'processing';

        if ($scope.auth.$valid) {
          AuthService
            .login({
              name: data.username,
              email: data.email
            })
            .then((response) => {
              $scope.state = 'ready';
              Session.create(response.data);
            });
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
  .factory('Session', ($rootScope, $http, AUTH_EVENTS) => {

    const scope = {
      user: localStorage.user ? JSON.parse(localStorage.user) : null,
      authorized: !!localStorage.user,

      create(user) {
        this.user = user;
        this.authorized =  true;

        localStorage.user = JSON.stringify(user);

        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      },

      getUser() {
        return $http.get(`http://localhost:3000/v1/profile/${this.user._id}`);
      },

      destroy() {
        this.user = null;
        this.authorized = null;

        localStorage.user = null;

        $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
      }
    };

    if (scope.user) {
      scope
        .getUser()
        .then((response) => {
          scope.create(response.data)
        })
    }

    return scope;
  })
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    logoutSuccess: 'auth-logout-success'
  });