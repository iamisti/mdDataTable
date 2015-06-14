(function(){
    'use strict';

    function mdDataTableCardHeaderDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableCardHeader.html',
            transclude: true,
            replace: true,
            scope: true,
            require: ['^mdDataTable']
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableCardHeader', mdDataTableCardHeaderDirective);
}());