(function(){
    'use strict';

    function mdDataTableRowDirective(IndexTrackerFactory){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableRow.html',
            replace: true,
            transclude: true,
            require: '^mdDataTable',
            scope: {
                tableRowId: '='
            },
            controller: function($scope){
                var vm = this;

                initIndexTrackerServiceAndBindMethods();

                vm.addToRowDataStorage = addToRowDataStorage;
                vm.getRowDataStorageValue = getRowDataStorageValue;
                $scope.rowDataStorage = [];

                function initIndexTrackerServiceAndBindMethods(){
                    var indexHelperService = IndexTrackerFactory.getInstance();

                    vm.increaseIndex = _.bind(indexHelperService.increaseIndex, indexHelperService);
                    vm.getIndex = _.bind(indexHelperService.getIndex, indexHelperService);
                }

                function addToRowDataStorage(value){
                    $scope.rowDataStorage.push(value);
                }

                function getRowDataStorageValue(columnIndex){
                    return $scope.getRowDataStorage()[columnIndex];
                }
            },
            link: function($scope, element, attrs, ctrl, transclude){
                appendColumns();

                var rowIndex = ctrl.getIndex();
                $scope.getRowOptions = getRowOptions;
                $scope.isSelectableRows = ctrl.isSelectableRows;

                ctrl.addRowData($scope.tableRowId, $scope.rowDataStorage);

                $scope.getRowDataStorage = function(){
                    return ctrl.getRowData(rowIndex);
                };

                ctrl.increaseIndex();

                function appendColumns(){
                    //TODO: question: the commented out code is not working properly when data-table-row has an ng-repeat. Why?
                    //angular.element(transclude()).appendTo(element);

                    transclude(function (clone) {
                        element.append(clone);
                    });
                }

                function getRowOptions(){
                    return ctrl.getRowOptions(rowIndex);
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableRow', mdDataTableRowDirective);
}());