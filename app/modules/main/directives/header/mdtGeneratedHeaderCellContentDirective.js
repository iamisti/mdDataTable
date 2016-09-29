(function(){
    'use strict';

    function mdtGeneratedHeaderCellContentDirective(ColumnFilterFeature){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdtGeneratedHeaderCellContent.html',
            replace: true,
            scope: false,
            require: '^mdtTable',
            link: function($scope, element, attrs, ctrl){
                ColumnFilterFeature.initGeneratedHeaderCellContent($scope);

                $scope.columnClickHandler = function(){
                    ColumnFilterFeature.generatedHeaderCellClickHandler($scope, $scope.headerRowData);
                };

                $scope.bla = function(items){
                    $scope.headerRowData.columnFilterApplyFilterCallback(items);

                    if($scope.mdtRowPaginator){
                        ctrl.mdtPaginationHelper.fetchPage(1);
                    }else{
                        // no support for non-ajax yet
                    }
                }
            }
        };
    }

    angular
    .module('mdDataTable')
        .directive('mdtGeneratedHeaderCellContent', mdtGeneratedHeaderCellContentDirective);
}());
