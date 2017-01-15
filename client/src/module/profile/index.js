angular
  .module('CafeApp')
  .component('profile', {
    templateUrl: 'src/module/profile/template/index.html',
    transclude: true,
    controller: ($scope, Session, ProfileService, AUTH_EVENTS, PROFILE_EVENTS) => {
      const getUser = () => {
        $scope.user = Session.user;
      };

      $scope.$on(AUTH_EVENTS.loginSuccess, getUser);
      $scope.$on(PROFILE_EVENTS.balanceChanged, getUser);

      $scope.topup = () => {
        ProfileService.topup();
      }

      getUser();
    }
  })
  .factory('ProfileService', ($http, $rootScope, Session, PROFILE_EVENTS) => {
    return {
      topup: (data) => {
        return $http({
          method: 'POST',
          url: 'http://localhost:3000/v1/balance',
          data: {
            id: Session.user._id
          }
        })
        .then((response) => {
          Session.user = response.data;
          
          $rootScope.$broadcast(PROFILE_EVENTS.balanceChanged);
        });
      }
    }
  })
  .constant('PROFILE_EVENTS', () => {
    return {
      balanceChanged: 'balance-changed'
    }
  })