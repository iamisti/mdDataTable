(function(){
    'use strict';

    angular.module('developmentAreaApp', ['ngMaterial', 'mdDataTable']);
    angular.module('developmentAreaApp').controller('DevelopmentAreaController', function($scope, $http, $mdToast){
        $scope.nutritionList = [];

        $scope.deleteRowCallback = deleteRowCallback;
        $scope.paginatorCallback = paginatorCallback;

        function deleteRowCallback(rows){
            $mdToast.show(
                $mdToast.simple()
                    .content('Deleted row id(s): '+rows)
                    .hideDelay(3000)
            );
        }


        function paginatorCallback(page, pageSize){

            var rangeStart = (page-1) * pageSize;
            var rangeEnd = page * pageSize;

            return $http
                .get('https://api.nutritionix.com/v1_1/search/*?results='+rangeStart+'%3A'+rangeEnd+'&fields=*&appId=a03ba45f&appKey=b4c78c1472425c13f9ce0e5e45aa1e16')
                .then(function(result){
                    return {
                        results: result.data.hits,
                        totalResultCount: result.data.total_hits
                    }
                });
        }

    });
}());