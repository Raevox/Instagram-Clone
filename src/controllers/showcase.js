(() => {
  angular
    .module('focaltome')
    .controller('ShowcaseController', [
      'InstacloneFactory',
      function ShowcaseController(InstacloneFactory) {
        const vm = this;

        InstacloneFactory.fetchImages(images => {
          vm.posts = images;
          console.log(vm.posts);
        });
      }
    ]);
})();
