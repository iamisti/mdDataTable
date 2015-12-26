(function(){
    'use strict';

    function mdtCardHeaderDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdtCardHeader.html',
            transclude: true,
            replace: true,
            scope: true,
            require: ['^mdtTable']
        };
    }

    angular
        .module('md-data-table')
        .directive('mdtCardHeader', mdtCardHeaderDirective);
}());