(function() {
    'use strict';

    function mdtDropdownColumnFilterDirective(){
        return{
            restrict: 'E',
            templateUrl: '/main/templates/mdtDropdownColumnFilter.html',
            scope: {
                confirmCallback: '=',
                cancelCallback: '&',
                headerRowData: '='
            },
            link: function($scope, elem, attr){

                $scope.transformChip = transformChip;

                $scope.selectedItem = null;
                $scope.searchText = null;
                $scope.availableItems = [];
                $scope.selectedItems = _.map($scope.headerRowData.columnFiltersApplied, _.clone);
                $scope.placeholderText = $scope.headerRowData.columnFilterPlaceholderText || 'Choose a value';
                $scope.selectableItems = [];

                $scope.headerRowData.columnFilterValuesProviderCallback().then(function(values){
                    $scope.selectableItems = values;
                });

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
        .directive('mdtDropdownColumnFilter', mdtDropdownColumnFilterDirective);
})();