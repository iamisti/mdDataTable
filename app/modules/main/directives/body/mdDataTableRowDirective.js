(function(){
    'use strict';

    function mdDataTableRowDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableRow.html',
            replace: true,
            transclude: true,
            require: '^mdDataTable',
            scope: true,
            controller: function($scope){
                $scope.cellIndex = 0;
                $scope.rowSelected = false;

                var vm = this;
                vm.increaseIndex = increaseIndex;
                vm.getIndex = getIndex;
                vm.rowClicked = rowClicked;


                function increaseIndex(){
                    $scope.cellIndex++;
                }

                function getIndex(){
                    return $scope.cellIndex;
                }

                function rowClicked(){
                    $scope.rowSelected = !$scope.rowSelected;
                }

            },
            link: function($scope, element, attrs, ctrl, transclude){
                $scope.isSelectableRows = ctrl.isSelectableRows;
                //$scope.isAllRowsSelected = ctrl.isAllRowsSelected;
                //$scope.rowSelected = !ctrl.isAllRowsSelected();

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