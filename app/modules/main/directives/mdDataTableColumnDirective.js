(function(){
    'use strict';

    function mdDataTableColumnDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableColumn.html',
            transclude: true,
            replace: true,
            scope: {
                alignRule: '@'
            },
            link: function(scope){
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