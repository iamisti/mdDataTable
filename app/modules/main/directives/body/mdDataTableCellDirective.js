(function(){
    'use strict';

    function mdDataTableCellDirective(ColumnOptionProvider){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableCell.html',
            replace: true,
            transclude: true,
            scope: true,
            require: ['^mdDataTable','^mdDataTableRow'],
            link: function($scope, element, attrs, ctrl){
                var mdDataTableCtrl = ctrl[0];
                var mdDataTableRowCtrl = ctrl[1];
                var columnIndex = mdDataTableRowCtrl.getIndex();

                $scope.getColumnClass = getColumnClass;
                $scope.clickHandler = clickHandler;

                mdDataTableRowCtrl.increaseIndex();

                function getColumnClass() {
                    if (getColumnOptions().alignRule === ColumnOptionProvider.ALIGN_RULE.ALIGN_RIGHT) {
                        return 'rightAlignedColumn';
                    } else {
                        return 'leftAlignedColumn';
                    }
                }

                function getColumnOptions(){
                    return mdDataTableCtrl.getColumnOptions(columnIndex);
                }

                function clickHandler(){
                    mdDataTableRowCtrl.rowClicked();
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableCell', mdDataTableCellDirective);
}());