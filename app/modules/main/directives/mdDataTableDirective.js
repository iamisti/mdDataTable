(function(){
    'use strict';

    function mdDataTableDirective(ColumnOptionProvider, uuid4){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTable.html',
            transclude: true,
            scope: {
                tableCard: '=',
                selectableRows: '=',
                alternateHeaders: '=',
                sortableColumns: '='
            },
            controllerAs: 'mdDataTableCtrl',
            controller: function($scope){
                var columnOptionsList = [];
                var rowOptionsList = [];
                $scope.tableDataStorage = [];

                var sortedColumn = {
                    id: null,
                    orderBy: 'asc'
                };
                var vm = this;

                //internal
                vm.setAllRowsSelected = setAllRowsSelected;
                $scope.isAnyRowSelected = isAnyRowSelected;
                $scope.getNumberOfSelectedRows = getNumberOfSelectedRows;
                vm.addToTableDataStorage = addToTableDataStorage;
                vm.getTableDataStorageValue = getTableDataStorageValue;
                vm.sortByColumn = sortByColumn;

                //for rows
                vm.isSelectableRows = isSelectableRows;
                vm.initRowOptions = initRowOptions;

                //for columns
                vm.getColumnOptions = getColumnOptions;
                vm.addColumnOptions = addColumnOptions;
                vm.getColumnAlignClass = getColumnAlignClass;

                function isSelectableRows(){
                    return $scope.selectableRows;
                }

                function addColumnOptions(options){
                    var columnId = uuid4.generate();

                    var columnOptions = {
                        id: columnId,
                        alignRule: options.alignRule
                    };

                    columnOptionsList.push(columnOptions);

                    return columnOptions;
                }

                function getColumnOptions(index){
                    return columnOptionsList[index];
                }

                function getColumnAlignClass(alignRule) {
                    if (alignRule === ColumnOptionProvider.ALIGN_RULE.ALIGN_RIGHT) {
                        return 'rightAlignedColumn';
                    } else {
                        return 'leftAlignedColumn';
                    }
                }

                function initRowOptions(){
                    var rowId = uuid4.generate();

                    var rowOptions = {
                        id : rowId,
                        selected : false
                    };

                    rowOptionsList.push(rowOptions);

                    return rowOptions;
                }

                function setAllRowsSelected(allSelected){
                    _.each(rowOptionsList, function(rowOptions){
                        rowOptions.selected = allSelected;
                    });
                }

                function isAnyRowSelected(){
                    return _.some(rowOptionsList, function(rowOptions){
                        return rowOptions.selected === true;
                    });
                }

                function getNumberOfSelectedRows(){
                    return _.countBy(rowOptionsList, function(rowOptions){
                        return rowOptions.selected === true ? 'selected' : 'unselected';
                    });
                }

                function sortByColumn(columnIndex){

                    var res =_.sortBy($scope.tableDataStorage, function(rowArray){
                        return rowArray[columnIndex];
                    });

                    $scope.tableDataStorage = res;
/*
                    _.each(res, function(element, index){
                        _.each(element, function(element2, index2){
                            $scope.tableDataStorage[index][index2] = element2;
                        });
                    });
*/
                }

                function addToTableDataStorage(data){
                    $scope.tableDataStorage.push(data);
                }

                function getTableDataStorageValue(index){
                    return $scope.tableDataStorage[index];
                }

                initIndexHelperForTableRows();

                function initIndexHelperForTableRows(){
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
            },
            link: function($scope, element, attrs, ctrl, transclude){
                injectContentIntoTemplate();

                function injectContentIntoTemplate(){
                    transclude(function (clone) {
                        var headings = [];
                        var body = [];

                        _.each(clone, function (child) {
                            var $child = angular.element(child);

                            if ($child.hasClass('theadTrRow')) {
                                headings.push($child);
                            } else {
                                body.push($child);
                            }
                        });

                        element.find('table thead').append(headings);
                        element.find('table tbody').append(body);
                    });
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTable', mdDataTableDirective);
}());