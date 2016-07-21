(function(){
    'use strict';

    angular.module('developmentAreaApp', ['ngMaterial', 'mdDataTable']);
    angular.module('developmentAreaApp').controller('DevelopmentAreaController', function($scope, $http){
        $scope.paginatorCallback = paginatorCallback;
        $scope.manuallyTriggered = manuallyTriggered;
        $scope.abcd = function(){
            loadPageCallback(1);
        };

        var loadPageCallback;

        function manuallyTriggered(loadPage){
            loadPageCallback = loadPage;
        }
        function paginatorCallback(page, pageSize){
            var offset = (page-1) * pageSize;

            return $http.post('https://api.nutritionix.com/v1_1/search', {
                'appId':'a03ba45f',
                'appKey':'b4c78c1472425c13f9ce0e5e45aa1e16',
                'offset': offset,
                'limit':pageSize,
                'query': '*',
                'fields': ['*'],
                'sort':{
                    'field':'nf_iron_dv',
                    'order':'desc'
                }
            }).then(function(result){
                return {
                    results: result.data.hits,
                    totalResultCount: result.data.total
                }
            });
        }
    });
}());