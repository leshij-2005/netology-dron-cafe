cafeApp
  .controller('Customer', function($scope, Session, AUTH_EVENTS) {
    var isAuthorized = function() {
      $scope.authorized = Session.authorized;
    };

    $scope.$on(AUTH_EVENTS.loginSuccess, isAuthorized);
    $scope.$on(AUTH_EVENTS.logoutSuccess, isAuthorized);
    $scope.$on(AUTH_EVENTS.getProfileSuccess, isAuthorized);

    isAuthorized();
  });