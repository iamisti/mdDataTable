(function(){
    'use strict';

    angular.module('mdDataTable', ['templates', 'ngMaterial']);
}());
(function(){
    'use strict';

    function mdDataTableDirective(ColumnAwareService){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTable.html',
            transclude: true,
            scope: {
                tableCard: '=',
                selectableRows: '='
            },
            bindToController: true,
            controllerAs: 'vm',
            controller: function(){
                var vm = this;

                vm.isRowsSelectable = function(){
                    return vm.selectableRows;
                }
            },
            link: function($scope, element, attrs, ctrl, transclude){
                ColumnAwareService.initialize($scope);

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

    function ColumnAwareService(){
        var service = this;

        service.addColumnOption = addColumnOption;
        service.subscribeToOptionListChange = subscribeToOptionListChange;
        service.initialize = initialize;

        function addColumnOption(columnOption){
            service.scope.optionsList.push(columnOption);
        }

        function subscribeToOptionListChange(callback){
            service.scope.subscribers.push(callback);
        }

        function initialize(scope){
            service.scope = scope;

            service.scope.optionsList = [];
            service.scope.subscribers = [];

            service.scope.$watch('optionsList', function(newVal){
                if(newVal){
                    _.each(service.scope.subscribers, function(callback){
                        callback(newVal);
                    });
                }
            }, true);
        }
    }

    angular
        .module('mdDataTable')
        .service('ColumnAwareService', ColumnAwareService);
}());
(function(){
    'use strict';

    function mdDataTableCellDirective(ColumnAwareService, ColumnOptionProvider){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableCell.html',
            replace: true,
            transclude: true,
            scope: {},
            link: function($scope){
                $scope.columnIndex = _.clone($scope.$parent.cellIndex);

                ColumnAwareService.subscribeToOptionListChange(function(value){
                    $scope.alignRule = value[$scope.columnIndex].alignRule;
                    $scope.columnClass = getColumnClass($scope.alignRule);
                });

                $scope.$parent.cellIndex++;

                function getColumnClass(a) {
                    if (a === ColumnOptionProvider.ALIGN_RULE.ALIGN_RIGHT) {
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
            //require: '^mdDataTable',
            link: function($scope, element, attrs, ctrl, transclude){
                console.log('row-directive start');

                $scope.cellIndex = 0;
                $scope.selectableRows = ctrl.isRowsSelectable();

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
(function(){
    'use strict';

    function mdDataTableColumnDirective(ColumnAwareService, ColumnOptionProvider){
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
                    ColumnAwareService.addColumnOption({
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
            transclude: true,
            replace: true,
            templateUrl: '/main/templates/mdDataTableHeaderRow.html',
            link: function($scope, element, attrs, ctrl, transclude){
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