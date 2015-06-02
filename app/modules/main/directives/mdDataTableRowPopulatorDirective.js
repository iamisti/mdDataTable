(function(){
    'use strict';

    function mdDataTableRowPopulatorDirective(ColumnAwareService, ColumnOptionProvider){
        return {
            restrict: 'A',
            templateUrl: '/main/templates/mdDataTableRowPopulator.html',
            scope:{
                data: '=mdDataTableRowPopulator'
            },
            link: function(scope/*, element, attrs*/){
                var columnOptionsList = ColumnAwareService.getAll();

                scope.columnClassesList = _.map(columnOptionsList, function(options){
                    if(options.alignRule === ColumnOptionProvider.ALIGN_RULE.ALIGN_RIGHT){
                        return 'rightAlignedColumn';
                    }

                    return 'leftAlignedColumn';
                });
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableRowPopulator', mdDataTableRowPopulatorDirective);
}());