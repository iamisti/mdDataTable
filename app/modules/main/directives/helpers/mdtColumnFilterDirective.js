(function() {
    'use strict';

    function mdtColumnFilterDirective(){
        return{
            restrict: 'E',
            templateUrl: '/main/templates/mdtColumnFilter.html',
            scope: {
                confirmCallback: '=',
                cancelCallback: '&',
                headerRowData: '='
            },
            link: function($scope, elem, attr){

                init();

                $scope.transformChip = transformChip;

                function init(){
                    $scope.isLoading = true;
                    $scope.hasError = false;
                    $scope.selectedItem = null;
                    $scope.searchText = null;
                    $scope.availableItems = [];
                    $scope.selectedItems = $scope.headerRowData.columnFiltersApplied;
                    $scope.placeholderText = attr.placeholderText || 'Filter column...';
                }

                function transformChip(chip) {
                    if($scope.headerRowData.chipTransformerCallback){
                        return $scope.headerRowData.chipTransformerCallback(chip);
                    }

                    return chip;
                }
            }
        }
    }

    angular
        .module('mdDataTable')
        .directive('mdtColumnFilter', mdtColumnFilterDirective);
})();