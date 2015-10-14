(function(){
    'use strict';

    function mdDataTableDirective(ColumnOptionsFactory, TableDataStorageFactory, IndexTrackerFactory){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTable.html',
            transclude: true,
            scope: {
                tableCard: '=',
                selectableRows: '=',
                alternateHeaders: '=',
                sortableColumns: '=',
                deleteRowCallback: '&'
            },
            controller: function($scope){
                var vm = this;

                initColumnOptionsFactoryAndBindMethods();
                initTableStorageServiceAndBindMethods();
                initIndexTrackerServiceAndBindMethods();

                vm.isSelectableRows = isSelectableRows;
                vm.isSortingEnabled = isSortingEnabled;

                vm.sortByColumn = sortByColumn;
                vm.getSortedColumnIndex = getSortedColumnIndex;

                function initTableStorageServiceAndBindMethods(){
                    $scope.tableDataStorageService = TableDataStorageFactory.getInstance();

                    vm.addRowData = _.bind($scope.tableDataStorageService.addRowData, $scope.tableDataStorageService);
                    vm.getRowData = _.bind($scope.tableDataStorageService.getRowData, $scope.tableDataStorageService);
                    vm.getRowOptions = _.bind($scope.tableDataStorageService.getRowOptions, $scope.tableDataStorageService);
                    vm.setAllRowsSelected = _.bind($scope.tableDataStorageService.setAllRowsSelected, $scope.tableDataStorageService);
                }

                function initIndexTrackerServiceAndBindMethods(){
                    var indexHelperService = IndexTrackerFactory.getInstance();

                    vm.increaseIndex = _.bind(indexHelperService.increaseIndex, indexHelperService);
                    vm.getIndex = _.bind(indexHelperService.getIndex, indexHelperService);
                }

                function initColumnOptionsFactoryAndBindMethods(){
                    var columnOptionsService = ColumnOptionsFactory.getInstance();

                    vm.addColumnOptions = _.bind(columnOptionsService.addColumnOptions, columnOptionsService);
                    vm.getColumnOptions = _.bind(columnOptionsService.getColumnOptions, columnOptionsService);
                }

                function isSelectableRows(){
                    return $scope.selectableRows;
                }

                function isSortingEnabled(){
                    return $scope.sortableColumns;
                }

                var sortByColumnLastIndex = null;
                var orderByAscending = true;
                function sortByColumn(columnIndex, iteratee){
                    if(sortByColumnLastIndex === columnIndex){
                        $scope.tableDataStorageService.reverseRows();

                        orderByAscending = !orderByAscending;
                    }else{
                        $scope.tableDataStorageService.sortByColumnIndex(columnIndex, iteratee);

                        sortByColumnLastIndex = columnIndex;
                        
                        orderByAscending = true;
                    }

                    return orderByAscending ? -1 : 1;
                }

                function getSortedColumnIndex(){
                    return sortByColumnLastIndex;
                }
            },
            link: function($scope, element, attrs, ctrl, transclude){
                injectContentIntoTemplate();

                $scope.isAnyRowSelected = _.bind($scope.tableDataStorageService.isAnyRowSelected, $scope.tableDataStorageService);

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