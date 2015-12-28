(function(){
    'use strict';

    function mdtRowDirective(){
        return {
            restrict: 'E',
            transclude: true,
            require: '^mdtTable',
            scope: {
                tableRowId: '='
            },
            controller: function($scope){
                var vm = this;

                vm.addToRowDataStorage = addToRowDataStorage;
                $scope.rowDataStorage = [];

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
        .directive('mdtRow', mdtRowDirective);
}());