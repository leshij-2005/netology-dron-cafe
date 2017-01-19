var MenuController = function($scope, $rootScope, $http, $mdDialog, Session, socket, OrdersService, ProfileService, ORDERS_EVENTS) {
  var getBalance = function() {
    $scope.balance = Session.user.balance;
  }

  $http
    .get('./src/module/menu/data.json')
    .then(function(response) {
      $scope.items = response.data;
    });

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.select = function(dish) {
    OrdersService
      .create(dish)
      .then(function() {
        $mdDialog.cancel();

        $rootScope.$broadcast(ORDERS_EVENTS.orderCreated);
      });
  }

  $scope.topup = function() {
    $mdDialog.cancel();

    ProfileService.topup();
  }

  socket.on('update-balance', function() {
    getBalance();
  });

  getBalance();
}