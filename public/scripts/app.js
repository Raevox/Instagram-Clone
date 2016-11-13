'use strict';

(function () {
  angular.module('focaltome', ['ui.router']).config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'partials/home.html'
    }).state('new', {
      url: '/new',
      templateUrl: 'partials/new.html'
    });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  });
})();

(function () {
  angular.module('focaltome').factory('InstacloneFactory', function InstacloneFactory($http) {
    return {
      hw: 'Hello, world!'
    };
  });
})();

(function () {
  angular.module('focaltome').controller('ImageUploadController', ['InstacloneFactory', function ImageUploadController(InstacloneFactory) {
    var vm = this;

    vm.handleImageUpload = function (isValid) {
      console.log(isValid);
    };
  }]);
})();

(function () {
  $(document).ready(function () {
    $('.button-collapse').sideNav();
  });
})();
//# sourceMappingURL=app.js.map
