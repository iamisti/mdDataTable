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

                        // since user can have custom bindings inside the transcluded content, we have to store
                        // scope as well, to be able to compile the html content with the right scope context
                        ctrl.tableDataStorageService.customCells[columnKey] = {
                            scope: $scope.$parent.$parent,
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