cafeApp
  .component('orders', {
    templateUrl: 'src/module/orders/template/index.html',
    controller: ($scope, $mdDialog, OrdersService, ORDERS_EVENTS, AUTH_EVENTS, socket, Session) => {
      const getItems = () => {
        OrdersService
          .get()
          .then((response) => {
            $scope.items = response.data;
          });
      };

      $scope.add = (ev) => {
        $mdDialog.show({
          controller: MenuController,
          templateUrl: 'src/module/menu/template/index.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true
        })
      }

      $scope.$on(ORDERS_EVENTS.orderCreated, getItems);
      $scope.$on(AUTH_EVENTS.loginSuccess, getItems);

      socket.on('order-changed', () => {
        getItems();
      });

      socket.on('order-removed', () => {
        getItems();
      });

      getItems();
    }
  })
  .factory('OrdersService', ($http, Session) => {
    return {
      get: () => $http.get(`http://localhost:3000/v1/orders/${Session.user._id}`),
      create: (dish) => {
        return $http({
          method: 'POST',
          url: 'http://localhost:3000/v1/orders',
          data: {
            dish: dish,
            user_id: Session.user._id
          }
        })
      }
    }
  })
  .constant('ORDERS_EVENTS', {
    orderCreated: 'order-created'
  });