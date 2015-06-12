(function(){
    'use strict';

    function mdDataTableColumnDirective(ColumnOptionProvider, ColumnAlignmentHelper){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableColumn.html',
            transclude: true,
            replace: true,
            scope: {
                alignRule: '@'
            },
            require: ['^mdDataTable', '^mdDataTableHeaderRow'],
            link: function ($scope, element, attrs, ctrl) {
                var mdDataTableCtrl = ctrl[0];
                var mdDataTableHeaderRowCtrl = ctrl[1];

                var columnIndex = mdDataTableHeaderRowCtrl.getIndex();

                $scope.getColumnAlignClass = ColumnAlignmentHelper.getColumnAlignClass($scope.alignRule);
                $scope.ColumnOptionProvider = ColumnOptionProvider;
                $scope.columnOptions = mdDataTableCtrl.addColumnOptions({
                    alignRule: $scope.alignRule
                });
                $scope.direction = 1;
                $scope.isSorted = isSorted;
                $scope.clickHandler = clickHandler;
                $scope.isSortableColumns = mdDataTableCtrl.isSortableColumns;

                mdDataTableHeaderRowCtrl.increaseIndex();

                function clickHandler(){
                    if($scope.isSortableColumns()) {
                        $scope.direction = mdDataTableCtrl.sortByColumn(columnIndex);
                    }
                }

                function isSorted(){
                    return mdDataTableCtrl.getSortedColumnIndex() === columnIndex;
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableColumn', mdDataTableColumnDirective);
}());