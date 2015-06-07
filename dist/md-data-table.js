(function(){
    'use strict';

    angular.module('mdDataTable', ['templates', 'ngMaterial']);
}());
(function(){
    'use strict';

    function mdDataTableDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTable.html',
            transclude: true,
            scope: {
                tableCard: '=',
                selectableRows: '='
            },
            controller: function($scope){
                var vm = this;

                vm.isRowsSelectable = function(){
                    return $scope.selectableRows;
                }
            },
            link: function($scope, element, attrs, ctrl, transclude){
                $scope.columnOptionsList = [];

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
            link: function ($scope) {
                $scope.getColumnClass = getColumnClass;
                saveColumnSettings();

                function getColumnClass() {
                    if ($scope.alignRule === ColumnOptionProvider.ALIGN_RULE.ALIGN_RIGHT) {
                        return 'rightAlignedColumn';
                    } else {
                        return 'leftAlignedColumn';
                    }
                }

                //TODO: if alignRule not provided, try to analyse the values of the rows
                //then: if numeric: align right
                //            else: align left
                function saveColumnSettings() {
                    //TODO: rework
                    $scope.$parent.$parent.$parent.columnOptionsList.push({
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
            link: function($scope, element, attrs, ctrl, transclude){
                appendColumns()

                $scope.$parent.$watch('selectableRows', function(newVal){
                    $scope.selectableRows = ctrl.isRowsSelectable();
                });

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

    function mdDataTableCellDirective(ColumnOptionProvider){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableCell.html',
            replace: true,
            transclude: true,
            scope: {},
            link: function($scope){
                $scope.getColumnClass = getColumnClass;
                $scope.columnIndex = $scope.$parent.cellIndex;

                //TODO: rework
                $scope.alignRule = $scope.$parent.$parent.$parent.$parent.columnOptionsList[$scope.columnIndex].alignRule;

                $scope.$parent.cellIndex++;

                function getColumnClass() {
                    if ($scope.alignRule === ColumnOptionProvider.ALIGN_RULE.ALIGN_RIGHT) {
                        return 'rightAlignedColumn';
                    } else {
                        return 'leftAlignedColumn';
                    }
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
            link: function($scope, element, attrs, ctrl, transclude){
                $scope.cellIndex = 0;

                //TODO: why ctrl.isRowSelectable() does not refreshed after change?
                //$scope.selectableRows = ctrl.isRowsSelectable();

                $scope.$parent.$parent.$watch('selectableRows', function(newVal){
                    $scope.selectableRows = ctrl.isRowsSelectable();
                });

                appendColumns();

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