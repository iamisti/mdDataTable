(function(){
    'use strict';

    function mdtCardFooterDirective($timeout){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdtCardFooter.html',
            transclude: true,
            replace: true,
            scope: true,
            require: ['^mdtTable'],
            link: function($scope){
                $scope.rowsPerPage = $scope.mdtPaginationHelper.rowsPerPage;

                $scope.$watch('rowsPerPage', function(newVal, oldVal){
                    $scope.mdtPaginationHelper.setRowsPerPage(newVal);
                });
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtCardFooter', mdtCardFooterDirective);
}());