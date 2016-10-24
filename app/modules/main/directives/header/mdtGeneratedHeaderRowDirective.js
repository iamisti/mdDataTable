(function(){
    'use strict';

    function mdtGeneratedHeaderRowDirective(){
        return {
            restrict: 'A',
            templateUrl: '/main/templates/mdtGeneratedHeaderRow.html'
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtGeneratedHeaderRow', mdtGeneratedHeaderRowDirective);
}());