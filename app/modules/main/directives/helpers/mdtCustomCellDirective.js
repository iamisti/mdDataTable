(function(){
    'use strict';

    function mdtCustomCellDirective(){
        return {
            restrict: 'E',
            transclude: true,
            template: '<span class="customCell" ng-transclude></span>',
            require: '^mdtTable',
            link: {
                pre: function($scope, element, attrs, ctrl, transclude){
                    transclude(function (clone) {
                        var columnKey = attrs.columnKey;

                        ctrl.tableDataStorageService.customCells[columnKey] = clone.clone();
                        //element.append(clone);
                    });
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtCustomCell', mdtCustomCellDirective);
}());