(function(){
    'use strict';

    function mdtTableDirective(TableDataStorageFactory, mdtPaginationHelperFactory, IndexTrackerFactory){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdtTable.html',
            transclude: true,
            scope: {
                tableCard: '=',
                selectableRows: '=',
                alternateHeaders: '=',
                sortableColumns: '=',
                deleteRowCallback: '&',
                animateSortIcon: '=',
                rippleEffect: '=',
                paginatedRows: '=',
                mdDataTableRow: '='
            },
            controller: function($scope){
                var vm = this;

                initTableStorageServiceAndBindMethods();
                initIndexTrackerServiceAndBindMethods();

                vm.addHeaderCell = addHeaderCell;

                function initTableStorageServiceAndBindMethods(){
                    $scope.tableDataStorageService = TableDataStorageFactory.getInstance();
                    $scope.mdtPaginationHelper = mdtPaginationHelperFactory.getInstance($scope.tableDataStorageService, $scope.paginatedRows);

                    vm.addRowData = _.bind($scope.tableDataStorageService.addRowData, $scope.tableDataStorageService);
                }

                function initIndexTrackerServiceAndBindMethods(){
                    var indexHelperService = IndexTrackerFactory.getInstance();

                    vm.increaseIndex = _.bind(indexHelperService.increaseIndex, indexHelperService);
                    vm.getIndex = _.bind(indexHelperService.getIndex, indexHelperService);
                }

                function addHeaderCell(ops){
                    $scope.tableDataStorageService.addHeaderCellData(ops);
                }
            },
            link: function($scope, element, attrs, ctrl, transclude){
                injectContentIntoTemplate();

                $scope.isAnyRowSelected = _.bind($scope.tableDataStorageService.isAnyRowSelected, $scope.tableDataStorageService);
                $scope.isPaginationEnabled = isPaginationEnabled;

                $scope.$watch('mdDataTableRow', function(mdDataTableRow){
                    if(typeof mdDataTableRow === 'object'){
                        $scope.tableDataStorageService.storage = [];

                        var rowId;
                        var columnValues = [];
                        _.each(mdDataTableRow['data'], function(row){
                            rowId = row[mdDataTableRow['table-row-id-key']];
                            columnValues = [];

                            _.each(mdDataTableRow['column-keys'], function(columnKey){
                                columnValues.push(row[columnKey]);
                            });

                            $scope.tableDataStorageService.addRowData(rowId, columnValues);
                        });
                    }
                }, true);

                function isPaginationEnabled(){
                    if($scope.paginatedRows === true || ($scope.paginatedRows && $scope.paginatedRows.hasOwnProperty('isEnabled') && $scope.paginatedRows.isEnabled === true)){
                        return true;
                    }

                    return false;
                }

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

                        element.find('#reader').append(headings).append(body);
                    });
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtTable', mdtTableDirective);
}());