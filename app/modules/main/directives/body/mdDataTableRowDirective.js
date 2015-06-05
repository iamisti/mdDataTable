(function(){
    'use strict';

    function mdDataTableRowDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableRow.html',
            replace: true,
            transclude: true,
            controller: function($scope){
                $scope.cellIndex = 0;
            },
            link: function($scope, element, attrs, ctrl, transclude){
                appendColumns();

                function appendColumns(){
                    angular.element(transclude()).appendTo(element);
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableRow', mdDataTableRowDirective);
}());