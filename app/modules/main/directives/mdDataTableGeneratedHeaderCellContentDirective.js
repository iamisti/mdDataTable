(function(){
    'use strict';

    function mdDataTableGeneratedHeaderCellContentDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableGeneratedHeaderCellContent.html',
            replace: true,
            scope: {
                sortableColumns: '=',
                headerRowData: '='
            },
            link: function($scope, element, attrs){

            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableGeneratedHeaderCellContentDirective', mdDataTableGeneratedHeaderCellContentDirective);
}());