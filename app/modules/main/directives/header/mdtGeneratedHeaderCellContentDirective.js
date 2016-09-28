(function(){
    'use strict';

    function mdtGeneratedHeaderCellContentDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdtGeneratedHeaderCellContent.html',
            replace: true,
            scope: false,
            link: function($scope){
                //ColumnFilterFeature.initHeaderCellDirective($scope, cellDataToStore);
                $scope.isColumnFilterVisible = false;

                $scope.columnClickHandler = function(){
                    //ColumnFilterFeature.columnClickHandler($scope);
                    if($scope.headerRowData.columnFilterIsEnabled === true) {
                        $scope.isColumnFilterVisible = true;
                    }
                }
            }
        };
    }

    angular
    .module('mdDataTable')
        .directive('mdtGeneratedHeaderCellContent', mdtGeneratedHeaderCellContentDirective);
}());
