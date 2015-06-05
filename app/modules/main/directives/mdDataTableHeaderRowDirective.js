(function(){
    'use strict';

    function mdDataTableHeaderRowDirective(){
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: '/main/templates/mdDataTableHeaderRow.html'/*,
            link: {
                pre: function($scope, element, attrs, ctrl, transclude){
                    appendColumns();

                    function appendColumns(){
                        angular.element(transclude()).appendTo(element.find('.theadTrRow'));
                    }
                }
            }*/
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableHeaderRow', mdDataTableHeaderRowDirective);
}());