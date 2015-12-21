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
                $scope.deleteSelectedRows = deleteSelectedRows;

                function deleteSelectedRows(){
                    var deletedRows = $scope.tableDataStorageService.deleteSelectedRows();

                    $scope.deleteRowCallback({rows: deletedRows});
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableAlternateHeaders', mdDataTableAlternateHeadersDirective);
}());