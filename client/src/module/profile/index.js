cafeApp
  .component('profile', {
    templateUrl: 'src/module/profile/template/index.html',
    controller: ($scope, Session, ProfileService, AUTH_EVENTS, socket) => {
      const getUser = () => {
        $scope.user = Session.user;
      };

      $scope.$on(AUTH_EVENTS.loginSuccess, getUser);

      $scope.topup = () => {
        ProfileService.topup();
      }

      socket.on('update-balance', () => {
        Session.getUser().then((response) => {
          Session.user = response.data;
          
          getUser();
        });
      })

      getUser();
    }
  })
  .factory('ProfileService', ($http, $rootScope, Session) => {
    return {
      topup: (data) => {
        return $http({
          method: 'POST',
          url: 'http://localhost:3000/v1/balance',
          data: {
            id: Session.user._id
          }
        })
      }
    }
  })