(() => {
  angular
    .module('focaltome')
    .factory('InstacloneFactory', function InstacloneFactory($http) {
      const vm = this;
      const X_CSRF_TOKEN = 'mannie';

      vm.fetchImages = function(callback) {
        $http.get('http://instagramcloneclass.herokuapp.com/images', {
          headers: {
            X_CSRF_TOKEN
          }
        }).then(result => {
          callback(result.data.images);
        });
      };

      vm.postNewImage = function(image, callback) {
        $http.post(
          'http://instagramcloneclass.herokuapp.com/image/post',
          { ...image },
          {
            headers: {
              X_CSRF_TOKEN
            }
          }
        ).then(result => {
          callback(result);
        });
      };

      return {
        fetchImages: vm.fetchImages
      };
    });
})();
