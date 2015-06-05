(function(){
    'use strict';

    function mdDataTableCellDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableCell.html',
            replace: true,
            transclude: true
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableCell', mdDataTableCellDirective);
}());