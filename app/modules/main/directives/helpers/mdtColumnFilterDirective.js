(function() {
    'use strict';

    function mdtColumnFilterDirective(){
        return{
            restrict: 'E',
            templateUrl: '/main/templates/mdtColumnFilter.html',
            scope: {
                confirmCallback: '=',
                cancelCallback: '&',
                valuesProviderCallback: '=',
                headerRowData: '='
            },
            link: function($scope, elem, attr){

                init();

                $scope.transformChip = transformChip;
                $scope.selectedItems = $scope.headerRowData.columnFiltersApplied;

                function init(){
                    $scope.isLoading = true;
                    $scope.hasError = false;
                    $scope.selectedItem = null;
                    $scope.searchText = null;
                    $scope.availableItems = [];
                    $scope.selectedItems = [];
                    $scope.placeholderText = attr.placeholderText || 'Filter column...';
                }

                function transformChip(chip) {
                    return chip;
                }
            }
        }
    }

    angular
        .module('mdDataTable')
        .directive('mdtColumnFilter', mdtColumnFilterDirective);
})();