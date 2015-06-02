(function(){
    'use strict';

    function mdDataTableRowPopulatorDirective(ColumnAwareService){
        return {
            restrict: 'A',
            templateUrl: '/main/templates/mdDataTableRowPopulator.html',
            scope:{
                data: '=mdDataTableRowPopulator'
            },
            link: function(scope/*, element, attrs*/){
                var columnOptionsList = ColumnAwareService.getAll();

                scope.columnClassesList = _.map(columnOptionsList, function(options){
                    if(options.alignRule === 'left'){
                        return 'leftAlignedColumn';
                    }

                    return 'rightAlignedColumn';
                });
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableRowPopulator', mdDataTableRowPopulatorDirective);
}());