(function(){
    'use strict';

    function mdtAddHtmlContentToCellDirective(){
        return {
            restrict: 'A',
            link: function($scope, element, attr){
                $scope.$watch(attr.mdtAddHtmlContentToCell, function(val){
                    element.empty();

                    if(val.type === 'html'){
                        element.append(val.value);
                    }else{
                        element.append(val);
                    }
                });
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtAddHtmlContentToCell', mdtAddHtmlContentToCellDirective);
}());