cafeApp
  .component('auth', {
    templateUrl: 'public/module/auth/template/index.html',
    controller: function($scope, AuthService, Session) {
      $scope.submit = function(data) {
        $scope.state = 'processing';

        if ($scope.auth.$valid) {
          AuthService
            .login({
              name: data.username,
              email: data.email
            })
            .then(function(response) {
              $scope.state = 'ready';
              Session.create(response.data);
            });
        }
      }
    }
  })
  .factory('AuthService', function($http) {
      return {
        login: function(data) {
          return $http({
            method: 'POST',
            url: '/api/v1/auth',
            data: data
          });
        }
      }
    }
  )
  .factory('Session', function($rootScope, $http, AUTH_EVENTS, socket) {

    var scope = {
      user: localStorage.user ? JSON.parse(localStorage.user) : null,
      authorized: !!localStorage.user,

      create: function(user) {
        this.user = user;
        this.authorized =  true;

        localStorage.user = JSON.stringify(user);

        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        
        this.sendToSocket();
      },

      getUser: function() {
        return $http.get('/api/v1/profile/' + this.user._id);
      },

      destroy: function() {
        this.user = null;
        this.authorized = null;

        localStorage.user = null;

        $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
      },

      sendToSocket: function() {
        if (this.authorized) {
          socket.emit('signin-user', this.user);
        }
      }
    };

    if (scope.user) {
      scope
        .getUser()
        .then(function(response) {
          scope.create(response.data);
        });
    }

    return scope;
  })
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    logoutSuccess: 'auth-logout-success'
  });