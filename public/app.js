var cafeApp = angular.module('CafeApp', ['ngRoute', 'ngMaterial', 'btford.socket-io']);

cafeApp
  .config(['$routeProvider', function($routeProvider) {
      $routeProvider.
        when('/', {
          templateUrl: 'public/module/customer/template/index.html',
          controller: 'Customer'
        }).
        when('/kitchen', {
          templateUrl: 'public/module/kitchen/template/index.html',
          controller: 'Kitchen'
        }).
        otherwise({
          redirectTo: '/'
        });
    }
  ])
  .factory('socket', function(socketFactory) {
    socket = socketFactory({
      ioSocket: io.connect()
    });

    return socket;
  });