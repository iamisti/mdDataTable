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
            require: '^mdDataTable',
            link: function ($scope, element, attrs, mdDataTableCtrl) {
                $scope.getColumnClass = getColumnClass;
                addColumnSettings();

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
                function addColumnSettings() {
                    mdDataTableCtrl.addColumnOptions({
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