(function(){
    'use strict';

    function mdDataTableCellDirective(ColumnAwareService, ColumnOptionProvider, $timeout){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableCell.html',
            replace: true,
            transclude: true,
            link: function($scope){
                $scope.columnIndex = _.clone($scope.$parent.cellIndex);
console.log('assigned value: ', $scope.columnIndex);
                ColumnAwareService.subscribeToOptionListChange(function(value){
                    $scope.alignRule = value[$scope.columnIndex].alignRule;
console.log('change detected: ', $scope.columnIndex, value[$scope.columnIndex].alignRule);
                    $scope.columnClass = getColumnClass($scope.alignRule);
                });

                $scope.$parent.cellIndex++;

                function getColumnClass(a) {
                    if (a === ColumnOptionProvider.ALIGN_RULE.ALIGN_RIGHT) {
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