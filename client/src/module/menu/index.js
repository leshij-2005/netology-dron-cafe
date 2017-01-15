const MenuController = ($scope, $rootScope, $http, $mdDialog, OrdersService, ORDERS_EVENTS) => {
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
}