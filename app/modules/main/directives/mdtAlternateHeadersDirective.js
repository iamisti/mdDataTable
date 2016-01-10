(function(){
    'use strict';

    function mdtAlternateHeadersDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdtAlternateHeaders.html',
            transclude: true,
            replace: true,
            scope: true,
            require: '^mdtTable',
            link: function($scope, element, attrs, ctrl){
                $scope.deleteSelectedRows = deleteSelectedRows;
                $scope.getNumberOfSelectedRows = _.bind(ctrl.tableDataStorageService.getNumberOfSelectedRows, ctrl.tableDataStorageService);

                function deleteSelectedRows(){
                    var deletedRows = ctrl.tableDataStorageService.deleteSelectedRows();

                    $scope.deleteRowCallback({rows: deletedRows});
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtAlternateHeaders', mdtAlternateHeadersDirective);
}());