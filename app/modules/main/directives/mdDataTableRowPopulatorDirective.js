(function(){
    'use strict';

    function mdDataTableRowPopulatorDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableRowPopulator.html',
            replace: true,
            scope: {
                columnData: '='
            },
            link: function(scope, element, attrs){
                //console.log('mdDataTableRowPopulatorDirective');
                console.log('tableRowPopulator: ', scope.columnData);
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableRowPopulator', mdDataTableRowPopulatorDirective);
}());