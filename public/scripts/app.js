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
  $(document).ready(function () {
    $(".button-collapse").sideNav();
  });
})();
//# sourceMappingURL=app.js.map
