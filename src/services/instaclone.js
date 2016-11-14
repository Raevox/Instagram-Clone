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

      vm.postNewImage = function(image) {
        $http.post(
          'http://instagramcloneclass.herokuapp.com/image/post',
          { ...image },
          {
            headers: {
              X_CSRF_TOKEN
            }
          }
        );
      };

      vm.likeImagePost = function(imageid, callback) {
        $http.post('http://instagramcloneclass.herokuapp.com/images/vote', { imageid })
          .then(result => {
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
