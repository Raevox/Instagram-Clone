(() => {
  angular
    .module('focaltome')
    .controller('ShowcaseController', [
      '$scope',
      'InstacloneFactory',
      function ShowcaseController($scope, InstacloneFactory) {
        const vm = this;

        vm.posts = [];

        InstacloneFactory.fetchImages(images => {
          vm.posts = images;
          return vm.posts;
        });

        vm.handleImagePostLike = function(imagePost) {
          imagePost.liked = true;
          setTimeout(function() {
            imagePost.liked = false;
            $scope.$apply();
          }, 1000);

          InstacloneFactory.likeImagePost(imagePost._id, image => {
            imagePost.likes++;
            return imagePost;
          });
        };
      }
    ]);
})();
