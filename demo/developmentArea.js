(function(){
    'use strict';

    angular.module('developmentAreaApp', ['ngMaterial', 'mdDataTable']);
    angular.module('developmentAreaApp').controller('DevelopmentAreaController', function($scope, $http, $mdToast){
        $scope.nutritionList = [];

        $scope.deleteRowCallback = function(rows){
            $mdToast.show(
                $mdToast.simple()
                    .content('Deleted row id(s): '+rows)
                    .hideDelay(3000)
            );
        };

        $http.get('https://api.nutritionix.com/v1_1/search/*?results=0%3A20&fields=*&appId=a03ba45f&appKey=b4c78c1472425c13f9ce0e5e45aa1e16')
            .then(function(result){
                console.log(result);
                $scope.nutritionList = result.data.hits;
            }
        );
    });
}());