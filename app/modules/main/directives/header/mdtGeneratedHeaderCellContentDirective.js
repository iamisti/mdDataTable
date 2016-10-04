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
                ColumnFilterFeature.initGeneratedHeaderCellContent($scope, $scope.headerRowData, ctrl);

                $scope.columnClickHandler = function(){
                    ColumnFilterFeature.generatedHeaderCellClickHandler($scope, $scope.headerRowData, element);
                };
            }
        };
    }

    angular
    .module('mdDataTable')
        .directive('mdtGeneratedHeaderCellContent', mdtGeneratedHeaderCellContentDirective);
}());
