cafeApp
  .controller('Kitchen', function($scope, KitchenService, socket) {

    const getCreatedOrders = () => {
      KitchenService
        .getOrders('created')
        .then((response) => {
          $scope.createdOrders = response.data;
        });
    }

    const getOrdersInProcess = () => {
      KitchenService
        .getOrders('process')
        .then((response) => {
          $scope.processOrders = response.data;
        });
    }

    const getOrders = () => {
      getOrdersInProcess();
      getCreatedOrders();
    }

    $scope.toProcess = (order) => {
      KitchenService
        .toProcess(order._id)
        .then(() => {
          getOrders();
        })
    }

    $scope.delivery = (order) => {
      KitchenService
        .delivery(order._id)
        .then(() => {
          getOrders();
        })
    }

    socket.on('new-order', getOrders);

    getOrders();
  })
  .factory('KitchenService', ($http) => {
    return {
      getOrders: (state) => {
        return $http.get(`http://localhost:3000/v1/kitchen/orders/${state}`)
      },
      toProcess: (id) => {
        return $http.post(`http://localhost:3000/v1/kitchen/process/${id}`)
      },
      delivery: (id) => {
        return $http.post(`http://localhost:3000/v1/kitchen/delivery/${id}`)
      }
    }
  });