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
                $scope.selectedItem = selectedItem;

                $scope.placeholderText = $scope.headerRowData.columnFilterPlaceholderText || 'Choose a value';

                $scope.selectedItems = _.map($scope.headerRowData.columnFiltersApplied, _.clone);
                $scope.oneSelectedItem = $scope.selectedItems.length ? $scope.selectedItems[0] : '';
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

                function selectedItem(){
                    if($scope.oneSelectedItem !== "undefined"){
                        $scope.selectedItems = [$scope.oneSelectedItem];
                    }else{
                        $scope.selectedItems = [];
                    }
                }
            }
        }
    }

    angular
        .module('mdDataTable')
        .directive('mdtDropdownColumnFilter', mdtDropdownColumnFilterDirective);
})();