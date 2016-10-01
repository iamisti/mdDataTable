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

                        ctrl.dataStorage.customCells[columnKey] = {
                            scope: $scope,
                            htmlContent: clone.clone()
                        };
                    });
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtCustomCell', mdtCustomCellDirective);
}());