(function(){
    'use strict';

    function mdDataTableColumnDirective(ColumnOptionProvider){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableColumn.html',
            transclude: true,
            replace: true,
            scope: {
                alignRule: '@'
            },
            link: function ($scope) {
                $scope.getColumnClass = getColumnClass;
                saveColumnSettings();

                function getColumnClass() {
                    if ($scope.alignRule === ColumnOptionProvider.ALIGN_RULE.ALIGN_RIGHT) {
                        return 'rightAlignedColumn';
                    } else {
                        return 'leftAlignedColumn';
                    }
                }

                //TODO: if alignRule not provided, try to analyse the values of the rows
                //then: if numeric: align right
                //            else: align left
                function saveColumnSettings() {
                    //TODO: rework
                    $scope.$parent.$parent.$parent.$parent.columnOptionsList.push({
                        alignRule: $scope.alignRule
                    });
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableColumn', mdDataTableColumnDirective);
}());