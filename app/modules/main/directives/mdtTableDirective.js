(function(){
    'use strict';

    function mdtTableDirective(TableDataStorageFactory, mdtPaginationHelperFactory){
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
                mdtRow: '='
            },
            controller: function($scope){
                var vm = this;
                vm.addHeaderCell = addHeaderCell;

                initTableStorageServiceAndBindMethods();

                function initTableStorageServiceAndBindMethods(){
                    $scope.tableDataStorageService = TableDataStorageFactory.getInstance();
                    $scope.mdtPaginationHelper = mdtPaginationHelperFactory.getInstance($scope.tableDataStorageService, $scope.paginatedRows);

                    vm.addRowData = _.bind($scope.tableDataStorageService.addRowData, $scope.tableDataStorageService);
                }

                function addHeaderCell(ops){
                    $scope.tableDataStorageService.addHeaderCellData(ops);
                }
            },
            link: function($scope, element, attrs, ctrl, transclude){
                injectContentIntoTemplate();

                $scope.isAnyRowSelected = _.bind($scope.tableDataStorageService.isAnyRowSelected, $scope.tableDataStorageService);
                $scope.isPaginationEnabled = isPaginationEnabled;

                $scope.$watch('mdtRow', function(mdtRow){
                    if(typeof mdtRow === 'object'){
                        $scope.tableDataStorageService.storage = [];

                        var rowId;
                        var columnValues = [];
                        _.each(mdtRow['data'], function(row){
                            rowId = row[mdtRow['table-row-id-key']];
                            columnValues = [];

                            _.each(mdtRow['column-keys'], function(columnKey){
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