(function(){
    'use strict';

    function mdtSortHandlerDirective(){
        return {
            restrict: 'A',
            scope: false,
            require: '^mdtTable',
            link: function($scope, element, attrs, ctrl){
                var columnIndex = $scope.$index;
                $scope.isSorted = isSorted;
                $scope.direction = 1;

                element.on('click', sortHandler);

                function sortHandler(){
                    if($scope.sortableColumns){
                        $scope.$apply(function(){
                            $scope.direction = ctrl.tableDataStorageService.sortByColumn(columnIndex, $scope.headerRowData.sortBy);
                        });
                    }
                }

                function isSorted(){
                    return ctrl.tableDataStorageService.sortByColumnLastIndex === columnIndex;
                }

                $scope.$on('$destroy', function(){
                    element.off('click', sortHandler);
                });
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtSortHandler', mdtSortHandlerDirective);
}());