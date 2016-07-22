(function(){
    'use strict';

    angular.module('developmentAreaApp', ['ngMaterial', 'mdDataTable']);
    angular.module('developmentAreaApp').controller('DevelopmentAreaController', function($scope, $http){
        $scope.paginatorCallback = paginatorCallback;
        $scope.getLoadResultsCallback = getLoadResultsCallback;
        $scope.filterText = '';

        var loadPageCallbackWithDebounce;

        $scope.$watch('filterText', function(){
            loadPageCallbackWithDebounce();
        });

        function getLoadResultsCallback(loadPageCallback){
            loadPageCallbackWithDebounce = _.debounce(loadPageCallback, 1000);
        }
        function paginatorCallback(page, pageSize){
            return;
            var offset = (page-1) * pageSize;
            var query = $scope.filterText ? $scope.filterText : '';

            return $http.post('https://api.nutritionix.com/v1_1/search', {
                'appId':'a03ba45f',
                'appKey':'b4c78c1472425c13f9ce0e5e45aa1e16',
                'offset': offset,
                'limit':pageSize,
                'query': query+'*',
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