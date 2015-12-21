(function(){
    'use strict';

    function mdDataTableGeneratedHeaderCellContentDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableGeneratedHeaderCellContent.html',
            replace: true,
            scope: false,
            link: function($scope, element, attrs){

            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableGeneratedHeaderCellContentDirective', mdDataTableGeneratedHeaderCellContentDirective);
}());