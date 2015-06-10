(function(){
    'use strict';

    angular.module('mdDataTable', ['templates', 'ngMaterial', 'uuid4']);
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

    function mdDataTableCellDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableCell.html',
            replace: true,
            transclude: true,
            scope: true,
            require: ['^mdDataTable','^mdDataTableRow'],
            link: function($scope, element, attrs, ctrl){
                var mdDataTableCtrl = ctrl[0];
                var mdDataTableRowCtrl = ctrl[1];
                var columnIndex = mdDataTableRowCtrl.getIndex();

                $scope.getColumnAlignClass = mdDataTableCtrl.getColumnAlignClass(getColumnOptions().alignRule);

                mdDataTableRowCtrl.increaseIndex();

                function getColumnOptions(){
                    return mdDataTableCtrl.getColumnOptions(columnIndex);
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
            },
            link: function($scope, element, attrs, ctrl, transclude){
                appendColumns();
                $scope.rowOptions = ctrl.initRowOptions();
                $scope.isSelectableRows = ctrl.isSelectableRows;

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
(function(){
    'use strict';

    function mdDataTableColumnDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableColumn.html',
            transclude: true,
            replace: true,
            scope: {
                alignRule: '@'
            },
            require: '^mdDataTable',
            link: function ($scope, element, attrs, mdDataTableCtrl) {
                $scope.getColumnAlignClass = mdDataTableCtrl.getColumnAlignClass($scope.alignRule);
                addColumnSettings();

                //TODO: if alignRule not provided, try to analyse the values of the rows
                //then: if numeric: align right
                //            else: align left
                function addColumnSettings() {
                    mdDataTableCtrl.addColumnOptions({
                        alignRule: $scope.alignRule
                    });
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