'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

    vm.postNewImage = function (image) {
      $http.post('http://instagramcloneclass.herokuapp.com/image/post', _extends({}, image), {
        headers: {
          X_CSRF_TOKEN: X_CSRF_TOKEN
        }
      });
    };

    vm.likeImagePost = function (imageid, callback) {
      $http.post('http://instagramcloneclass.herokuapp.com/images/vote', { imageid: imageid }).then(function (result) {
        callback(result.data.data);
      });
    };

    return {
      fetchImages: vm.fetchImages,
      postNewImage: vm.postNewImage,
      likeImagePost: vm.likeImagePost
    };
  });
})();

(function () {
  angular.module('focaltome').controller('ImageUploadController', ['InstacloneFactory', function ImageUploadController(InstacloneFactory) {
    var vm = this;

    vm.newImage = {};

    vm.handleImageUpload = function (isValid) {
      if (!isValid) return;

      InstacloneFactory.postNewImage(vm.newImage);
    };
  }]);
})();

(function () {
  angular.module('focaltome').controller('ShowcaseController', ['$scope', 'InstacloneFactory', function ShowcaseController($scope, InstacloneFactory) {
    var vm = this;

    vm.posts = [];

    InstacloneFactory.fetchImages(function (images) {
      vm.posts = images;

      return vm.posts;
    });

    vm.handleImagePostLike = function (imageid, imagePost) {
      InstacloneFactory.likeImagePost(imageid, function (image) {
        var postId = vm.posts.findIndex(function (imagePost) {
          return imagePost._id == imageid;
        });

        imagePost.likes++;
      });

      return vm.posts;
    };

    vm.goToImagePost = function (imageid) {
      // TODO: Implement single image display
      console.log(imageid);
    };
  }]);
})();

(function () {
  $(document).ready(function () {
    $('.button-collapse').sideNav();
  });
})();
//# sourceMappingURL=app.js.map
