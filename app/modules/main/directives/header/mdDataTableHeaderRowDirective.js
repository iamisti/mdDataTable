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