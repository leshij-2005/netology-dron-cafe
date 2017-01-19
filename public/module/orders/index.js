cafeApp
  .component('orders', {
    templateUrl: 'public/module/orders/template/index.html',
    controller: function($scope, $mdDialog, OrdersService, ORDERS_EVENTS, AUTH_EVENTS, socket, Session) {
      $scope.items = [];

      var getItems = function() {
        OrdersService
          .get()
          .then(function(response) {
            $scope.items = response.data;
          });
      };

      $scope.add = function(ev) {
        $mdDialog.show({
          controller: MenuController,
          templateUrl: 'public/module/menu/template/index.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true
        })
      }

      $scope.$on(ORDERS_EVENTS.orderCreated, getItems);
      $scope.$on(AUTH_EVENTS.loginSuccess, getItems);

      socket.on('order-changed', function() {
        getItems();
      });

      socket.on('order-removed', function() {
        getItems();
      });

      if (Session.authorized) {
        getItems();
      }
    }
  })
  .factory('OrdersService', function($http, Session) {
    return {
      get: function() { 
        return $http.get('/api/v1/orders/' + Session.user._id);
      },
      create: function(dish) {
        return $http({
          method: 'POST',
          url: '/api/v1/orders',
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