(function(){
    'use strict';

    function mdtCardFooterDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdtCardFooter.html',
            transclude: true,
            replace: true,
            scope: true,
            require: ['^mdtTable'],
            link: function($scope){
                
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtCardFooter', mdtCardFooterDirective);
}());