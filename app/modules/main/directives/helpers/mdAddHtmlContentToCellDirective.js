(function(){
    'use strict';

    function mdAddHtmlContentToCellDirective(){
        return {
            restrict: 'A',
            scope: {
                htmlContent: '=mdAddHtmlContentToCell'
            },
            link: function($scope, element){
                element.append($scope.htmlContent);
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdAddHtmlContentToCell', mdAddHtmlContentToCellDirective);
}());