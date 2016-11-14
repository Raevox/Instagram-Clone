(() => {
  angular
    .module('focaltome')
    .controller('SingleImageController', [
      '$stateParams',
      'InstacloneFactory',
      function SingleImageController($stateParams, InstacloneFactory) {
        const vm = this;

        InstacloneFactory.fetchSingleImage($stateParams.imageid, image => vm.post = image);

        vm.handleImagePostLike = function() {
          InstacloneFactory.likeImagePost(vm.post._id, image => {
            vm.post.likes++;
            return vm.post;
          });
        }
      }
    ]);
})();
