(() => {
  angular
    .module('focaltome')
    .controller('ShowcaseController', [
      'InstacloneFactory',
      function ShowcaseController(InstacloneFactory) {
        const vm = this;

        InstacloneFactory.fetchImages(images => {
          vm.images = images;
          console.log(vm.images);
        });
      }
    ]);
})();
