(function(){
    'use strict';

    function mdDataTableRowDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableRow.html',
            replace: true,
            transclude: true,
            link: {
                pre: function($scope, element, attrs, ctrl, transclude){
                    appendColumns();

                    function appendColumns(){
                        angular.element(transclude()).appendTo(element.find('tr'));
                    }
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableRow', mdDataTableRowDirective);
}());