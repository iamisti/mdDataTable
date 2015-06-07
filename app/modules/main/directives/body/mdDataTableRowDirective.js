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
                console.log('row-directive start');

                $scope.cellIndex = 0;
                $scope.selectableRows = ctrl.isRowsSelectable();

                appendColumns();

                function appendColumns(){
                    //TODO: question: the commented out code is not working properly when data-table-row has an ng-repeat. Why?
                    //angular.element(transclude()).appendTo(element);

                    transclude(function (clone) {
                        element.append(clone);
                    });
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableRow', mdDataTableRowDirective);
}());