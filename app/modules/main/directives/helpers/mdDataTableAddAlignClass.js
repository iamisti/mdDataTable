(function(){
    'use strict';

    function mdDataTableAddAlignClass(ColumnAlignmentHelper){
        return {
            restrict: 'A',
            scope: {
                mdDataTableAddAlignClass: '='
            },
            link: function($scope, element){
                var classToAdd = ColumnAlignmentHelper.getColumnAlignClass($scope.mdDataTableAddAlignClass);

                element.addClass(classToAdd);
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableAddAlignClass', mdDataTableAddAlignClass);
}());