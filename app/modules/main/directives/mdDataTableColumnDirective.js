(function(){
    'use strict';

    function mdDataTableColumnDirective(ColumnAwareService){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableColumn.html',
            transclude: true,
            replace: true,
            scope: {
                alignRule: '@'
            },
            link: function(scope){

                ColumnAwareService.add({
                    alignRule: scope.alignRule
                });

                scope.getColumnClass = function(){
                    if(scope.alignRule === 'right'){
                        return 'rightAlignedColumn';
                    }else{
                        return 'leftAlignedColumn';
                    }
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableColumn', mdDataTableColumnDirective);
}());