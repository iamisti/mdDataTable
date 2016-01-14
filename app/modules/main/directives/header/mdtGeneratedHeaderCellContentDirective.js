(function(){
    'use strict';

    function mdtGeneratedHeaderCellContentDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdtGeneratedHeaderCellContent.html',
            replace: true,
            scope: false,
            link: function(){}
        };
    }

    angular
    .module('mdDataTable')
        .directive('mdtGeneratedHeaderCellContent', mdtGeneratedHeaderCellContentDirective);
}());
