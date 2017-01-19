const MenuController = ($scope, $rootScope, $http, $mdDialog, Session, socket, OrdersService, ProfileService, ORDERS_EVENTS) => {
  const getBalance = () => {
    $scope.balance = Session.user.balance;
  }

  $http
    .get('./src/module/menu/data.json')
    .then((response) => {
      $scope.items = response.data;
    });

  $scope.cancel = () => {
    $mdDialog.cancel();
  };

  $scope.select = (dish) => {
    OrdersService
      .create(dish)
      .then(() => {
        $mdDialog.cancel();

        $rootScope.$broadcast(ORDERS_EVENTS.orderCreated);
      });
  }

  $scope.topup = () => {
    $mdDialog.cancel();

    ProfileService.topup();
  }

  socket.on('update-balance', () => {
    getBalance();
  });

  getBalance();
}