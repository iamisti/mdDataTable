function mdtSelectAllRowsHandlerDirective() {
    return {
        restrict: 'A',
        scope: false,
        require: '^mdtTable',
        link: function($scope:IScope, element:any, attrs:any, ctrl:any) {
            $scope['selectAllRows'] = false;

            $scope.$watch('selectAllRows', function(val:any) {
                ctrl.tableDataStorageService.setAllRowsSelected(val, $scope['isPaginationEnabled']());
            });
        }
    };
}

angular
    .module('mdDataTable')
    .directive('mdtSelectAllRowsHandler', mdtSelectAllRowsHandlerDirective);