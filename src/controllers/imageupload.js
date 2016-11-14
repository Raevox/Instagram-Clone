(() => {
  angular
    .module('focaltome')
    .controller('ImageUploadController', [
      'InstacloneFactory',
      function ImageUploadController(InstacloneFactory) {
        const vm = this;

        vm.newImage = {};

        vm.handleImageUpload = function(isValid) {
          if (!isValid) return;
        };
      }
    ]);
})();
