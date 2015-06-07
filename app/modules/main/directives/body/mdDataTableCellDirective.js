(function(){
    'use strict';

    function mdDataTableCellDirective(ColumnOptionProvider){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableCell.html',
            replace: true,
            transclude: true,
            scope: {},
            link: function($scope){
                $scope.getColumnClass = getColumnClass;
                $scope.columnIndex = $scope.$parent.cellIndex;

                //TODO: rework
                $scope.alignRule = $scope.$parent.$parent.$parent.$parent.columnOptionsList[$scope.columnIndex].alignRule;

                $scope.$parent.cellIndex++;

                function getColumnClass() {
                    if ($scope.alignRule === ColumnOptionProvider.ALIGN_RULE.ALIGN_RIGHT) {
                        return 'rightAlignedColumn';
                    } else {
                        return 'leftAlignedColumn';
                    }
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableCell', mdDataTableCellDirective);
}());