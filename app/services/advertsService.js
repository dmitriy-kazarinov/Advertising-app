/**
 * Created by Dima on 12.08.2016.
 */

;(function(){
    advertising.factory('advertsService', [
        '$http',
        function($http){
            return {
                get: function(callback){
                    $http.get('/api/adverts').success(function(res) {
                        callback(res);
                    });
                },
                post: function(advert, callback){
                    $http.post('/api/advert', advert).success(function(res) {
                        callback(res);
                    });
                },
                del: function(id, callback){
                    $http.delete('/api/advert/' + id).success(function(res) {
                        callback(res);
                    });
                },
                getAdvert: function(id, callback){
                    $http.get('/api/advert/' + id).success(function(res) {
                        callback(res);
                    });
                },
                updateAdvert: function(advert, callback){
                    $http.put('/api/advert/' + advert._id, advert).success(function(res) {
                        callback(res);
                    });
                }
            }
        }
    ]);
})();