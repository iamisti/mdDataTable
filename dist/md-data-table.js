(function(){
    'use strict';

    angular.module('mdDataTable', ['templates', 'ngMaterial']);
}());
(function(){
    'use strict';

    function mdDataTableDirective(ColumnOptionProvider){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTable.html',
            transclude: true,
            scope: {
                tableCard: '=',
                selectableRows: '='
            },
            controllerAs: 'mdDataTableCtrl',
            controller: function($scope){
                var columnOptionsList = [];
                var vm = this;

                vm.isSelectableRows = isSelectableRows;
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

                appendColumns();

                function appendColumns(){
                    transclude(function (clone) {
                        element.append(clone);
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
                $scope.cellIndex = 0;
                $scope.rowSelected = false;

                var vm = this;
                vm.increaseIndex = increaseIndex;
                vm.getIndex = getIndex;

                function increaseIndex(){
                    $scope.cellIndex++;
                }

                function getIndex(){
                    return $scope.cellIndex;
                }

            },
            link: function($scope, element, attrs, ctrl, transclude){
                $scope.isSelectableRows = ctrl.isSelectableRows;
                $scope.clickHandler = clickHandler;

                //$scope.isAllRowsSelected = ctrl.isAllRowsSelected;
                //$scope.rowSelected = !ctrl.isAllRowsSelected();

                appendColumns();

                function appendColumns(){
                    //TODO: question: the commented out code is not working properly when data-table-row has an ng-repeat. Why?
                    //angular.element(transclude()).appendTo(element);

                    transclude(function (clone) {
                        element.append(clone);
                    });
                }

                function clickHandler(){
                    $scope.rowSelected = !$scope.rowSelected;
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableRow', mdDataTableRowDirective);
}());