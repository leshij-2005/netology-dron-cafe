angular
  .module('CafeApp')
  .component('orders', {
    templateUrl: 'src/module/orders/template/index.html',
    transclude: true,
    controller: ($scope, $mdDialog, OrdersService, ORDERS_EVENTS) => {
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
          clickOutsideToClose: true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
      }

      $scope.$on(ORDERS_EVENTS.orderCreated, getItems);

      getItems();
    }
  })
  .factory('OrdersService', ($http, Session) => {
    return {
      get: () => $http.get('http://localhost:3000/v1/orders/' +  Session.user._id),
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