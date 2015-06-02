(function(){
    'use strict';

    function mdDataTableColumnDirective(ColumnAwareService, ColumnOptionProvider){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableColumn.html',
            transclude: true,
            replace: true,
            scope: {
                alignRule: '@'
            },
            link: function(scope){

                scope.getColumnClass = getColumnClass;
                saveColumnSettings();

                function getColumnClass(){
                    if(scope.alignRule === ColumnOptionProvider.ALIGN_RULE.ALIGN_RIGHT){
                        return 'rightAlignedColumn';
                    }else{
                        return 'leftAlignedColumn';
                    }
                }

                function saveColumnSettings(){
                    ColumnAwareService.add({
                        alignRule: scope.alignRule
                    });
                }
            }
        };
    }
    mdDataTableColumnDirective.$inject = ['ColumnAwareService', 'ColumnOptionProvider'];

    angular
        .module('mdDataTable')
        .directive('mdDataTableColumn', mdDataTableColumnDirective);
}());