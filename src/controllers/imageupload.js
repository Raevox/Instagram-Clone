(() => {
  angular
    .module('focaltome')
    .controller('ImageUploadController', [
      'InstacloneFactory',
      function ImageUploadController(InstacloneFactory) {
        const vm = this;

        vm.handleImageUpload = function(isValid) {
          console.log(isValid);
        };
      }
    ]);
})();
