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
                vm.getRowOptions = getRowOptions;

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

                function getRowOptions(index){
                    return $scope.tableDataStorage[index].optionList;
                }

                function setAllRowsSelected(allSelected){
                    _.each($scope.tableDataStorage, function(rowData){
                        rowData.optionList.selected = allSelected;
                    });
                }

                function isAnyRowSelected(){
                    return _.some($scope.tableDataStorage, function(rowData){
                        return rowData.optionList.selected === true;
                    });
                }

                function getNumberOfSelectedRows(){
                    return _.countBy($scope.tableDataStorage, function(rowData){
                        return rowData.optionList.selected === true ? 'selected' : 'unselected';
                    });
                }

                function sortByColumn(columnIndex){

                    var res =_.sortBy($scope.tableDataStorage, function(rowData){
                        return rowData.data[columnIndex];
                    });

                    $scope.tableDataStorage = res;
                }

                function addToTableDataStorage(data){
                    var rowId = uuid4.generate();

                    $scope.tableDataStorage.push({
                        rowId: rowId,
                        optionList: {
                            selected: false
                        },
                        data: data
                    });
                }

                function getTableDataStorageValue(index){
                    return $scope.tableDataStorage[index].data;
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