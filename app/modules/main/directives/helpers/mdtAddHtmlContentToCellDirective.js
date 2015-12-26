(function(){
    'use strict';

    function mdtAddHtmlContentToCellDirective(){
        return {
            restrict: 'A',
            scope: {
                htmlContent: '=mdtAddHtmlContentToCell'
            },
            link: function($scope, element){
                element.append($scope.htmlContent);

                $scope.$watch('htmlContent', function(){
                    element.empty();
                    element.append($scope.htmlContent);
                });
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtAddHtmlContentToCell', mdtAddHtmlContentToCellDirective);
}());