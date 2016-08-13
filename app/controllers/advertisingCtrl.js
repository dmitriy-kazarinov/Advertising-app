/**
 * Created by Dima on 12.08.2016.
 */
;(function(){
    advertising.controller('advertisingCtrl', [
        '$scope',
        'advertsService',
        function($scope, advertsService){
            $scope.isAdvert = false;
            advertsService.get(function(data){
                $scope.adverts = data;
            });
            $scope.sendAdvert = function(advert){
                advertsService.post(advert, function(data){
                    $scope.adverts.push(data);
                    $scope.isAdvert = false;
                    $scope.advert = '';
                });
            };
            $scope.addAdvert = function(){
                $scope.isAdvert = true;
            };
            $scope.deleteAdvert = function(advert){
                advertsService.del(advert._id, function(){
                    $scope.adverts.splice($scope.adverts.indexOf(advert), 1);
                });
            };
            $scope.openAdvert = function(advert){
                advertsService.getAdvert(advert._id, function(data){
                    $scope.advertForEdit = data;
                });
            };
            $scope.updateAdvert = function(advertForEdit){
                advertsService.updateAdvert(advertForEdit, function(newData){
                    console.log(newData);
                    //todo
                    advertsService.get(function(data){
                        $scope.adverts = data;
                    });
                });
            };
        }
    ]);
})();
