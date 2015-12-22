(function(){
    'use strict';

    function mdDataTableSortHandlerDirective(){
        return {
            restrict: 'A',
            scope: false,
            link: function($scope, element){
                var columnIndex = $scope.$index;
                $scope.isSorted = isSorted;
                $scope.direction = 1;

                element.on('click',sortHandler);

                function sortHandler(){
                    $scope.direction = $scope.tableDataStorageService.sortByColumn(columnIndex, $scope.headerRowData.sortBy);
                }

                function isSorted(){
                    return $scope.tableDataStorageService.sortByColumnLastIndex === columnIndex;
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableSortHandler', mdDataTableSortHandlerDirective);
}());