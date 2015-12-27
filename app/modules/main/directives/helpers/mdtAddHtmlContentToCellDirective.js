(function(){
    'use strict';

    function mdtAddHtmlContentToCellDirective(){
        return {
            restrict: 'A',
            link: function($scope, element, attr){
                $scope.$watch('htmlContent', function(){
                    element.empty();
                    element.append($scope.$eval(attr.mdtAddHtmlContentToCell));
                });
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtAddHtmlContentToCell', mdtAddHtmlContentToCellDirective);
}());