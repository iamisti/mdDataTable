(function(){
    'use strict';

    function mdDataTableRowPopulatorDirective($parse, $compile){
        return {
            restrict: 'A',
            templateUrl: '/main/templates/mdDataTableRowPopulator.html',
            scope:{
                data: '=mdDataTableRowPopulator'
            },
            link: function(scope, element, attrs){
                //TODO: classes should be defined by column definitions
                scope.columnClasses = function(columnValue){
                    if(isNaN(parseInt(columnValue))){
                        return 'leftAlignedColumn';
                    }

                    return 'rightAlignedColumn';
                };
            }
        };
    }
    mdDataTableRowPopulatorDirective.$inject = ['$parse', '$compile'];

    angular
        .module('mdDataTable')
        .directive('mdDataTableRowPopulator', mdDataTableRowPopulatorDirective);
}());