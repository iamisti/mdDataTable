(function(){
    'use strict';

    function mdDataTableRowDirective(IndexTrackerFactory){
        return {
            restrict: 'E',
            transclude: true,
            require: '^mdDataTable',
            scope: {
                tableRowId: '='
            },
            controller: function($scope){
                var vm = this;

                vm.addToRowDataStorage = addToRowDataStorage;
                $scope.rowDataStorage = [];

                initIndexTrackerServiceAndBindMethods();

                function initIndexTrackerServiceAndBindMethods(){
                    var indexHelperService = IndexTrackerFactory.getInstance();

                    vm.increaseIndex = _.bind(indexHelperService.increaseIndex, indexHelperService);
                    vm.getIndex = _.bind(indexHelperService.getIndex, indexHelperService);
                }

                function addToRowDataStorage(value, contentType){
                    if(contentType === 'htmlContent'){
                        $scope.rowDataStorage.push({value: value, type: 'html'});
                    }else{
                        $scope.rowDataStorage.push(value);
                    }
                }
            },
            link: function($scope, element, attrs, ctrl, transclude){
                appendColumns();

                ctrl.addRowData($scope.tableRowId, $scope.rowDataStorage);
                //ctrl.increaseIndex();

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
        .directive('mdDataTableRow', mdDataTableRowDirective);
}());