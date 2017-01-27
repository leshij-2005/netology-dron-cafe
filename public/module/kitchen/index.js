cafeApp
  .controller('Kitchen', function($scope, KitchenService, socket) {

    var getCreatedOrders = function() {
      KitchenService
        .getOrders('created')
        .then(function(response) {
          $scope.createdOrders = response.data;
        });
    }

    var getOrdersInProcess = function() {
      KitchenService
        .getOrders('process')
        .then(function(response) {
          $scope.processOrders = response.data;
        });
    }

    var getOrders = function() {
      getOrdersInProcess();
      getCreatedOrders();
    }

    $scope.toProcess = function(order) {
      KitchenService
        .toProcess(order._id)
        .then(function() {
          getOrders();
        });
    }

    $scope.delivery = function(order) {
      KitchenService
        .delivery(order._id)
        .then(function() {
          getOrders();
        });
    }

    socket.on('new-order', getOrders);

    getOrders();
  })
  .factory('KitchenService', function($http) {
    return {
      getOrders: function(state) {
        return $http.get('/api/v1/kitchen/orders/' + state);
      },
      toProcess: function(id) {
        return $http.post('/api/v1/kitchen/process/' + id);
      },
      delivery: function(id) {
        return $http.post('/api/v1/kitchen/delivery/' + id);
      }
    }
  });