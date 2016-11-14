(() => {
  angular
    .module('focaltome', [ 'ui.router' ])
    .config(($stateProvider, $urlRouterProvider, $locationProvider) => {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'partials/home.html'
        })
        .state('new', {
          url: '/new',
          templateUrl: 'partials/new.html'
        })
        .state('singleimage', {
          url: '/image/{imageid}',
          templateUrl: 'partials/singleimage.html'
        });

      $urlRouterProvider.otherwise('/');
      $locationProvider.html5Mode(true);
    });
})();
