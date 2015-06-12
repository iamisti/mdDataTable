(function(){
    'use strict';

    function mdDataTableCellDirective($parse){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableCell.html',
            replace: true,
            transclude: true,
            scope: true,
            require: ['^mdDataTable','^mdDataTableRow'],
            link: function($scope, element, attrs, ctrl, transclude){
                var mdDataTableCtrl = ctrl[0];
                var mdDataTableRowCtrl = ctrl[1];
                var columnIndex = mdDataTableRowCtrl.getIndex();

                $scope.getColumnAlignClass = mdDataTableCtrl.getColumnAlignClass(getColumnOptions().alignRule);

                transclude(function (clone) {
                    //TODO: better idea?
                    var cellValue = $parse(clone.html().replace('{{', '').replace('}}', ''))($scope);
                    mdDataTableRowCtrl.addToRowDataStorage(cellValue);
                });

                $scope.getCellValue = getCellValue;

                mdDataTableRowCtrl.increaseIndex();

                function getColumnOptions(){
                    return mdDataTableCtrl.getColumnOptions(columnIndex);
                }

                function getCellValue(){
                    return mdDataTableRowCtrl.getRowDataStorageValue(columnIndex);
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableCell', mdDataTableCellDirective);
}());