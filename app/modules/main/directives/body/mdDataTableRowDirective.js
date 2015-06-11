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
                var vm = this;
                vm.addToRowDataStorage = addToRowDataStorage;
                vm.getRowDataStorageValue = getRowDataStorageValue;
                $scope.rowDataStorage = [];

                initIndexHelperForTableCells();

                function initIndexHelperForTableCells(){
                    $scope.cellIndex = 0;

                    vm.increaseIndex = increaseIndex;
                    vm.getIndex = getIndex;

                    function increaseIndex(){
                        $scope.cellIndex++;
                    }

                    function getIndex(){
                        return $scope.cellIndex;
                    }
                }

                function addToRowDataStorage(value){
                    $scope.rowDataStorage.push(value);
                }

                function getRowDataStorageValue(columnIndex){
                    return $scope.rowDataStorage[columnIndex];
                }
            },
            link: function($scope, element, attrs, ctrl, transclude){
                appendColumns();
                $scope.rowOptions = ctrl.initRowOptions();
                $scope.isSelectableRows = ctrl.isSelectableRows;
                var columnIndex = ctrl.getIndex();

                ctrl.addToTableDataStorage($scope.rowDataStorage);

                $scope.rowDataStorage = ctrl.getTableDataStorageValue(columnIndex);

                ctrl.increaseIndex();

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