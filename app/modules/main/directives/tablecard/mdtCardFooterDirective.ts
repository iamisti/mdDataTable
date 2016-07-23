
function mdtCardFooterDirective() {
    return {
        restrict: 'E',
        templateUrl: '/main/templates/mdtCardFooter.html',
        transclude: true,
        replace: true,
        scope: true,
        require: ['^mdtTable'],
        link: function($scope:IScope) {
            $scope['rowsPerPage'] = $scope['mdtPaginationHelper'].rowsPerPage;

            $scope.$watch('rowsPerPage', function(newVal) {
                $scope['mdtPaginationHelper'].setRowsPerPage(newVal);
            });
        }
    };
}

angular
    .module('mdDataTable')
    .directive('mdtCardFooter', mdtCardFooterDirective);