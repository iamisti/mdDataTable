(function(){
    'use strict';

    function mdDataTableSelectAllRowsHandlerDirective(){
        return {
            restrict: 'A',
            scope: false,
            link: function($scope){
                $scope.selectAllRows = false;

                $scope.$watch('selectAllRows', function(val){
                    $scope.tableDataStorageService.setAllRowsSelected(val, $scope.paginatedRows);
                });
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableSelectAllRowsHandler', mdDataTableSelectAllRowsHandlerDirective);
}());