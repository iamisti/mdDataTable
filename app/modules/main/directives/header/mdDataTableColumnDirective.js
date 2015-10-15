(function(){
    'use strict';

    function mdDataTableColumnDirective(ColumnOptionProvider, ColumnAlignmentHelper){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableColumn.html',
            transclude: true,
            replace: true,
            scope: {
                alignRule: '@',
                sortBy: '=',
                columnDefinition: '@'
            },
            require: ['^mdDataTable', '^mdDataTableHeaderRow'],
            link: function ($scope, element, attrs, ctrl) {
                var mdDataTableCtrl = ctrl[0];
                var mdDataTableHeaderRowCtrl = ctrl[1];
                var columnIndex;

                getCurrentRowIndex();
                setColumnOptionsForMainController();
                setColumnAlignClass();

                $scope.isSorted = isSorted;
                $scope.clickHandler = clickHandler;
                $scope.isColumnLeftAligned = isColumnLeftAligned;
                $scope.isColumnRightAligned = isColumnRightAligned;
                $scope.isSortingEnabled = isSortingEnabled;

                increaseRowIndex();

                function clickHandler(){
                    if($scope.isSortingEnabled()) {
                        $scope.direction = mdDataTableCtrl.sortByColumn(columnIndex, $scope.sortBy);
                    }
                }

                function isSorted(){
                    return mdDataTableCtrl.getSortedColumnIndex() === columnIndex;
                }

                function setColumnOptionsForMainController(){
                    mdDataTableCtrl.addColumnOptions({
                        alignRule: $scope.alignRule,
                        sortBy: $scope.sortBy,
                        columnDefinition: $scope.columnDefinition
                    });
                }

                function setColumnAlignClass(){
                    $scope.columnAlignClass = ColumnAlignmentHelper.getColumnAlignClass($scope.alignRule);
                }

                function isColumnLeftAligned(){
                    return ColumnOptionProvider.ALIGN_RULE.ALIGN_LEFT === $scope.alignRule;
                }

                function isColumnRightAligned(){
                    return ColumnOptionProvider.ALIGN_RULE.ALIGN_RIGHT === $scope.alignRule;
                }

                function isSortingEnabled(){
                    return mdDataTableCtrl.isSortingEnabled();
                }

                function increaseRowIndex(){
                    mdDataTableHeaderRowCtrl.increaseIndex();
                }

                function getCurrentRowIndex(){
                    columnIndex = mdDataTableHeaderRowCtrl.getIndex();
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableColumn', mdDataTableColumnDirective);
}());