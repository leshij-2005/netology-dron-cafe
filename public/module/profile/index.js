cafeApp
  .component('profile', {
    templateUrl: 'public/module/profile/template/index.html',
    controller: function($scope, Session, ProfileService, AUTH_EVENTS, socket) {
      var getUser = function() {
        $scope.user = Session.user;
      };

      $scope.$on(AUTH_EVENTS.loginSuccess, getUser);

      $scope.topup = function() {
        ProfileService.topup();
      }

      socket.on('update-balance', function() {
        Session.getUser().then(function(response) {
          Session.user = response.data;
          
          getUser();
        });
      })

      getUser();
    }
  })
  .factory('ProfileService', function($http, $rootScope, Session) {
    return {
      topup: function(data) {
        return $http({
          method: 'POST',
          url: '/api/v1/balance',
          data: {
            id: Session.user._id
          }
        })
      }
    }
  })