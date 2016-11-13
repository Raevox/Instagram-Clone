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
    var vm = this;
    var X_CSRF_TOKEN = 'mannie';

    vm.fetchImages = function (callback) {
      $http.get('http://instagramcloneclass.herokuapp.com/images', {
        headers: {
          X_CSRF_TOKEN: X_CSRF_TOKEN
        }
      }).then(function (result) {
        callback(result.data.images);
      });
    };

    return {
      fetchImages: vm.fetchImages
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
  angular.module('focaltome').controller('ShowcaseController', ['InstacloneFactory', function ShowcaseController(InstacloneFactory) {
    var vm = this;

    InstacloneFactory.fetchImages(function (images) {
      vm.images = images;
      console.log(vm.images);
    });
  }]);
})();

(function () {
  $(document).ready(function () {
    $('.button-collapse').sideNav();
  });
})();
//# sourceMappingURL=app.js.map
