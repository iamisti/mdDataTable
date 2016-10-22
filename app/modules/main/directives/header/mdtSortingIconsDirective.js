(function(){
    'use strict';

    function mdtSortingIconsDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/cells/generateSortingIcons.html',
            scope: {
                data: '=',
                size: '@'
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtSortingIcons', mdtSortingIconsDirective);
}());