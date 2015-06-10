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
                alternateHeaders: '='
            },
            controllerAs: 'mdDataTableCtrl',
            controller: function($scope){
                var columnOptionsList = [];
                var rowOptionsList = [];
                var vm = this;

                //internal
                vm.setAllRowsSelected = setAllRowsSelected;
                $scope.isAnyRowSelected = isAnyRowSelected;
                $scope.getNumberOfSelectedRows = getNumberOfSelectedRows;

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
                    return columnOptionsList.push(options);
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
                        id: rowId,
                        selected: false
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