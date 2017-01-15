angular
  .module('CafeApp')
  .component('profile', {
    templateUrl: 'src/module/profile/template/index.html',
    transclude: true,
    controller: ($scope, Session, AUTH_EVENTS) => {
      const getUser = () => {
        $scope.user = Session.user;
      };

      $scope.$on(AUTH_EVENTS.loginSuccess, getUser);

      getUser();
    }
  })