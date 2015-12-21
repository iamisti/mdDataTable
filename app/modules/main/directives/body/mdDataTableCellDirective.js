(function(){
    'use strict';

    function mdDataTableCellDirective($parse){
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                htmlContent: '@'
            },
            require: ['^mdDataTable','^mdDataTableRow'],
            link: function($scope, element, attrs, ctrl, transclude){
                var mdDataTableRowCtrl = ctrl[1];
                var columnIndex = mdDataTableRowCtrl.getIndex();

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

                mdDataTableRowCtrl.increaseIndex();
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableCell', mdDataTableCellDirective);
}());