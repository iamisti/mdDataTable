(function(){
    'use strict';

    function mdDataTableRowDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableRow.html',
            replace: true,
            transclude: true,
            require: '^mdDataTable',
            link: function($scope, element, attrs, ctrl, transclude){
                $scope.cellIndex = 0;
                $scope.selectableRows = ctrl.isRowsSelectable();

                console.log($scope.selectableRows);

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