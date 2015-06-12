(function(){
    'use strict';

    angular.module('mdDataTable', ['templates', 'ngMaterial', 'uuid4', 'ngMdIcons']);
}());
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
                $scope.tableDataStorage = [];

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
                vm.getSortedColumnIndex = getSortedColumnIndex;
                vm.isSortableColumns = isSortableColumns;

                function isSelectableRows(){
                    return $scope.selectableRows;
                }

                function isSortableColumns(){
                    return $scope.sortableColumns;
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

                var sortByColumnLastIndex = null;
                var orderByAscending = true;
                function sortByColumn(columnIndex){
                    if(sortByColumnLastIndex === columnIndex){
                        $scope.tableDataStorage.reverse();

                        orderByAscending = !orderByAscending;
                    }else{
                        var res =_.sortBy($scope.tableDataStorage, function(rowData){
                            return rowData.data[columnIndex];
                        });

                        $scope.tableDataStorage = res;

                        sortByColumnLastIndex = columnIndex;
                    }

                    return orderByAscending ? -1 : 1;
                }

                function getSortedColumnIndex(){
                    return sortByColumnLastIndex;
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
(function(){
    'use strict';

    var ColumnOptionProvider = {
        ALIGN_RULE : {
            ALIGN_LEFT: 'left',
            ALIGN_RIGHT: 'right'
        }
    };

    angular.module('mdDataTable')
        .value('ColumnOptionProvider', ColumnOptionProvider);
})();
(function(){
    'use strict';

    function mdDataTableColumnDirective(ColumnOptionProvider){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableColumn.html',
            transclude: true,
            replace: true,
            scope: {
                alignRule: '@'
            },
            require: ['^mdDataTable', '^mdDataTableHeaderRow'],
            link: function ($scope, element, attrs, ctrl) {
                var mdDataTableCtrl = ctrl[0];
                var mdDataTableHeaderRowCtrl = ctrl[1];

                var columnIndex = mdDataTableHeaderRowCtrl.getIndex();

                $scope.getColumnAlignClass = mdDataTableCtrl.getColumnAlignClass($scope.alignRule);
                $scope.ColumnOptionProvider = ColumnOptionProvider;
                $scope.columnOptions = mdDataTableCtrl.addColumnOptions({
                    alignRule: $scope.alignRule
                });
                $scope.direction = 1;
                $scope.isSorted = isSorted;
                $scope.clickHandler = clickHandler;
                $scope.isSortableColumns = mdDataTableCtrl.isSortableColumns;

                mdDataTableHeaderRowCtrl.increaseIndex();

                function clickHandler(){
                    if($scope.isSortableColumns()) {
                        $scope.direction = mdDataTableCtrl.sortByColumn(columnIndex);
                    }
                }

                function isSorted(){
                    return mdDataTableCtrl.getSortedColumnIndex() === columnIndex;
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableColumn', mdDataTableColumnDirective);
}());
(function(){
    'use strict';

    function mdDataTableHeaderRowDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableHeaderRow.html',
            replace: true,
            transclude: true,
            require: '^mdDataTable',
            scope: true,
            controller: function($scope){
                var vm = this;

                initIndexHelperForTableColumns();

                function initIndexHelperForTableColumns(){
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
            link: function($scope, element, attrs, mdDataTableCtrl, transclude){
                $scope.isSelectableRows = mdDataTableCtrl.isSelectableRows;
                $scope.selectAllRows = false;

                appendColumns();
                setupWatchers();

                function appendColumns(){
                    transclude(function (clone) {
                        element.append(clone);
                    });
                }

                function setupWatchers() {
                    $scope.$watch('selectAllRows', function(newVal){
                        mdDataTableCtrl.setAllRowsSelected(newVal);
                    });
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableHeaderRow', mdDataTableHeaderRowDirective);
}());
(function(){
    'use strict';

    function mdDataTableCellDirective($parse){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableCell.html',
            replace: true,
            transclude: true,
            scope: true,
            require: ['^mdDataTable','^mdDataTableRow'],
            link: function($scope, element, attrs, ctrl, transclude){
                var mdDataTableCtrl = ctrl[0];
                var mdDataTableRowCtrl = ctrl[1];
                var columnIndex = mdDataTableRowCtrl.getIndex();

                $scope.getColumnAlignClass = mdDataTableCtrl.getColumnAlignClass(getColumnOptions().alignRule);

                transclude(function (clone) {
                    //TODO: better idea?
                    var cellValue = $parse(clone.html().replace('{{', '').replace('}}', ''))($scope);
                    mdDataTableRowCtrl.addToRowDataStorage(cellValue);
                });

                $scope.getCellValue = getCellValue;

                mdDataTableRowCtrl.increaseIndex();

                function getColumnOptions(){
                    return mdDataTableCtrl.getColumnOptions(columnIndex);
                }

                function getCellValue(){
                    return mdDataTableRowCtrl.getRowDataStorageValue(columnIndex);
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableCell', mdDataTableCellDirective);
}());
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
                    return $scope.getRowDataStorage()[columnIndex];
                }
            },
            link: function($scope, element, attrs, ctrl, transclude){
                appendColumns();

                var rowIndex = ctrl.getIndex();
                $scope.getRowOptions = getRowOptions;
                $scope.isSelectableRows = ctrl.isSelectableRows;

                ctrl.addToTableDataStorage($scope.rowDataStorage);

                $scope.getRowDataStorage = function(){
                    return ctrl.getTableDataStorageValue(rowIndex);
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