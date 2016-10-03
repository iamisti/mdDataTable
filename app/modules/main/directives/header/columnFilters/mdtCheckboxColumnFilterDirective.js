(function() {
    'use strict';

    function mdtCheckboxColumnFilterDirective(){
        return{
            restrict: 'E',
            templateUrl: '/main/templates/mdtCheckboxColumnFilter.html',
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

                $scope.headerRowData.columnFilterValuesProviderCallback().then(function(values){
                    $scope.selectableItems = values;
                });

                $scope.exists = function (item) {
                    return $scope.selectedItems.indexOf(item) > -1;
                };

                $scope.toggle = function (item) {
                    var idx = $scope.selectedItems.indexOf(item);
                    if (idx > -1) {
                        $scope.selectedItems.splice(idx, 1);
                    }
                    else {
                        $scope.selectedItems.push(item);
                    }
                };

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
        .directive('mdtCheckboxColumnFilter', mdtCheckboxColumnFilterDirective);
})();