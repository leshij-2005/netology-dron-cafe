const cafeApp = angular.module('CafeApp', ['ngRoute', 'ngMaterial', 'btford.socket-io']);

cafeApp
  .config(['$routeProvider', ($routeProvider) => {
      $routeProvider.
        when('/', {
          templateUrl: 'src/module/customer/template/index.html',
          controller: 'Customer'
        }).
        when('/kitchen', {
          templateUrl: 'src/module/kitchen/template/index.html',
          controller: 'Kitchen'
        }).
        otherwise({
          redirectTo: '/'
        });
    }
  ])
  .factory('socket', function(socketFactory) {
    socket = socketFactory({
      ioSocket: io.connect('http://localhost:3000/')
    });

    return socket;
  });