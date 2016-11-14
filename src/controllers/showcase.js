(() => {
  angular
    .module('focaltome')
    .controller('ShowcaseController', [
      'InstacloneFactory',
      function ShowcaseController(InstacloneFactory) {
        const vm = this;

        vm.posts = [];

        InstacloneFactory.fetchImages(images => {
          vm.posts = images;

          return vm.posts;
        });

        vm.handleImagePostLike = function(imageid, imagePost) {
          InstacloneFactory.likeImagePost(imageid, image => {
            const postId = vm.posts.findIndex(imagePost => {
              return imagePost._id == imageid;
            });

            imagePost.likes++;
          });

          return vm.posts;
        };
      }
    ]);
})();
