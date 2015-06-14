(function(){
    'use strict';

    function mdDataTableAlternateHeadersDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableAlternateHeaders.html',
            transclude: true,
            replace: true,
            scope: true,
            require: ['^mdDataTable'],
            link: function($scope){
                $scope.getNumberOfSelectedRows = _.bind($scope.tableDataStorageService.getNumberOfSelectedRows, $scope.tableDataStorageService);
                $scope.deleteSelectedRows = deleteSelectedRows;

                function deleteSelectedRows(){
                    var deletedRows = $scope.tableDataStorageService.deleteSelectedRows.apply($scope.tableDataStorageService, arguments);

                    $scope.deleteRowCallback({rows: deletedRows});
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableAlternateHeaders', mdDataTableAlternateHeadersDirective);
}());