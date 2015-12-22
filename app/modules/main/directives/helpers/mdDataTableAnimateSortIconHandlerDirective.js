(function(){
    'use strict';

    function mdDataTableAnimateSortIconHandlerDirective(){
        return {
            restrict: 'A',
            scope: false,
            link: function($scope, element){
                if($scope.animateSortIcon){
                    element.addClass('animate-sort-icon');
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableAnimateSortIconHandler', mdDataTableAnimateSortIconHandlerDirective);
}());