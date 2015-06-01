(function(){
    'use strict';

    function mdDataTableDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTable.html'
        }
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTable', mdDataTableDirective);
}());