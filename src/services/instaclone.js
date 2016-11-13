(() => {
  angular
    .module('focaltome')
    .factory('InstacloneFactory', function InstacloneFactory($http) {
      return {
        hw: 'Hello, world!'
      };
    });
})();
