(function(){
  var app = angular.module('app', ['ngResource']);

  app.service('DeviceService', ['$resource', function($resource){
    const API_ENDPOINT = 'http://localhost:9900/devices';
    return $resource(API_ENDPOINT);
  }]);

  app.controller('DevicesController', ['$scope', 'DeviceService',
      function($scope, DeviceService){
          $scope.hello = "Hello from Angular!";
      }
  ]);

})();
