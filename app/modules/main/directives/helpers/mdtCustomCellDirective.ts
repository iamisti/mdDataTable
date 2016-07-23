function mdtCustomCellDirective() {
    return {
        restrict: 'E',
        transclude: true,
        template: '<span class="customCell" ng-transclude></span>',
        require: '^mdtTable',
        link: {
            pre: function($scope:IScope, element:any, attrs:any, ctrl:any, transclude:any) {
                transclude(function (clone:any) {
                    var columnKey = attrs.columnKey;

                    ctrl.tableDataStorageService.customCells[columnKey] = clone.clone();
                });
            }
        }
    };
}

angular
    .module('mdDataTable')
    .directive('mdtCustomCell', mdtCustomCellDirective);