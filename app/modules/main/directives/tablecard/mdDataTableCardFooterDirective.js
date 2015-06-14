(function(){
    'use strict';

    function mdDataTableCardFooterDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableCardFooter.html',
            transclude: true,
            replace: true,
            scope: true,
            require: ['^mdDataTable']
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableCardFooter', mdDataTableCardFooterDirective);
}());