(function() {
    'use strict';

    function mdtDropdownColumnFilterDirective(ColumnFilterFeature){
        return{
            restrict: 'E',
            templateUrl: '/main/templates/mdtDropdownColumnFilter.html',
            scope: {
                confirmCallback: '=',
                cancelCallback: '&',
                headerRowData: '='
            },
            link: function($scope, element){
                ColumnFilterFeature.positionColumnFilterBox(element);

                $scope.transformChip = transformChip;
                $scope.selectedItem = selectedItem;

                $scope.selectableItems = [];
                $scope.selectedItems = _.map($scope.headerRowData.columnFilter.filtersApplied, _.clone);
                $scope.oneSelectedItem = $scope.selectedItems.length ? transformChip($scope.selectedItems[0]) : undefined;
                $scope.placeholderText = $scope.headerRowData.columnFilter.placeholderText || 'Choose a value';

                //destroying scope doesn't remove element, since it belongs to the body directly
                $scope.$on('$destroy', function(){
                    element.remove();
                });

                //populating choosable values
                $scope.headerRowData.columnFilter.valuesProviderCallback().then(function(values){
                    if(values){
                        $scope.selectableItems = values;
                    }
                });

                function transformChip(chip) {
                    if($scope.headerRowData.columnFilter.valuesTransformerCallback){
                        return $scope.headerRowData.columnFilter.valuesTransformerCallback(chip);
                    }

                    return chip;
                }

                function selectedItem(){
                    if(typeof $scope.oneSelectedItem !== 'undefined'){
                        var result = _.find($scope.selectableItems, function(anItem){
                            return transformChip(anItem) === $scope.oneSelectedItem
                        });

                        if(result){
                            $scope.selectedItems = [result];
                        }
                    }
                }
            }
        }
    }

    angular
        .module('mdDataTable')
        .directive('mdtDropdownColumnFilter', mdtDropdownColumnFilterDirective);
})();