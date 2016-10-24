(function(){
    'use strict';

    function mdtGeneratedHeaderCellContentDirective(ColumnFilterFeature, ColumnSortFeature){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdtGeneratedHeaderCellContent.html',
            replace: true,
            scope: false,
            require: '^mdtTable',
            link: function($scope, element, attrs, ctrl){
                ColumnFilterFeature.initGeneratedHeaderCellContent($scope, $scope.headerRowData, ctrl.mdtPaginationHelper, ctrl.dataStorage);

                $scope.columnClickHandler = function(){
                    ColumnFilterFeature.generatedHeaderCellClickHandler($scope, $scope.headerRowData, element);
                    ColumnSortFeature.columnClickHandler($scope.headerRowData, ctrl.dataStorage, ctrl.mdtPaginationHelper, attrs.index);
                };
            }
        };
    }

    angular
    .module('mdDataTable')
        .directive('mdtGeneratedHeaderCellContent', mdtGeneratedHeaderCellContentDirective);
}());
