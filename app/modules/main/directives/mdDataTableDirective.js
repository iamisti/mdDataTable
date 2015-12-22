(function(){
    'use strict';

    function mdDataTableDirective(TableDataStorageFactory, IndexTrackerFactory){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTable.html',
            transclude: true,
            scope: {
                tableCard: '=',
                selectableRows: '=',
                alternateHeaders: '=',
                sortableColumns: '=',
                deleteRowCallback: '&',
                animateSortIcon: '='
            },
            controller: function($scope){
                var vm = this;

                initTableStorageServiceAndBindMethods();
                initIndexTrackerServiceAndBindMethods();

                vm.addHeaderCell = addHeaderCell;

                function initTableStorageServiceAndBindMethods(){
                    $scope.tableDataStorageService = TableDataStorageFactory.getInstance();

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
        .directive('mdDataTable', mdDataTableDirective);
}());