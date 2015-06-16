(function(){
    'use strict';

    function mdDataTableCellDirective(ColumnAlignmentHelper, $parse){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableCell.html',
            replace: true,
            transclude: true,
            scope: {
                htmlContent: '@'
            },
            require: ['^mdDataTable','^mdDataTableRow'],
            link: function($scope, element, attrs, ctrl, transclude){
                var mdDataTableCtrl = ctrl[0];
                var mdDataTableRowCtrl = ctrl[1];
                var columnIndex = mdDataTableRowCtrl.getIndex();

                //TODO: refactor as the columnDirective
                $scope.getColumnAlignClass = ColumnAlignmentHelper.getColumnAlignClass(getColumnOptions().alignRule);

                transclude(function (clone) {

                    //TODO: rework, figure out something for including html content
                    if($scope.htmlContent){
                        mdDataTableRowCtrl.addToRowDataStorage(columnIndex);
                    }else{
                        //TODO: better idea?
                        var cellValue = $parse(clone.html().replace('{{', '').replace('}}', ''))($scope.$parent);
                        mdDataTableRowCtrl.addToRowDataStorage(cellValue);
                    }
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