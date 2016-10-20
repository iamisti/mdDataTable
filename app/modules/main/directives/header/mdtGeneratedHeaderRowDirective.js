(function(){
    'use strict';

    function mdtGeneratedHeaderRowDirective(ColumnSortFeature){
        return {
            restrict: 'A',
            templateUrl: '/main/templates/mdtGeneratedHeaderRow.html',
            scope: true,
            require: '^mdtTable',
            link: function($scope, element, attrs, ctrl){
                $scope.clickHandler = clickHandler;

                function clickHandler(columnIndex, headerRowData){
                    // if column filter is enabled, we should not sort the column, because the sorting indicator is build inside the column filter panel
                    if(!headerRowData.columnFilter.isEnabled){
                        ColumnSortFeature.sortHeader(headerRowData, ctrl.dataStorage, ctrl.mdtPaginationHelper, columnIndex);
                    }
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtGeneratedHeaderRow', mdtGeneratedHeaderRowDirective);
}());