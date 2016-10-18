(function() {
    'use strict';

    function mdtCheckboxColumnFilterDirective(_, ColumnFilterFeature){
        return{
            restrict: 'E',
            templateUrl: '/main/templates/mdtCheckboxColumnFilter.html',
            scope: {
                confirmCallback: '=',
                cancelCallback: '&',
                headerRowData: '='
            },
            link: function($scope, element){
                ColumnFilterFeature.positionColumnFilterBox(element);

                $scope.transformChip = transformChip;
                $scope.selectableItems = [];
                $scope.selectedItems = _.map($scope.headerRowData.columnFilter.filtersApplied, _.clone);

                //destroying scope doesn't remove element, since it belongs to the body directly
                $scope.$on('$destroy', function(){
                    element.remove();
                });

                //populating choosable values
                $scope.headerRowData.columnFilter.valuesProviderCallback().then(function(values){
                    if(values){
                        $scope.selectableItems = values
                    }
                });

                $scope.exists = function (item) {
                    var result = _.findIndex($scope.selectedItems, function(arrayItem){
                        return transformChip(arrayItem) === transformChip(item);
                    });

                    return result != -1;
                };

                $scope.toggle = function (item) {
                    var idx = _.findIndex($scope.selectedItems, function(arrayItem){
                        return transformChip(arrayItem) === transformChip(item);
                    });

                    if (idx > -1) {
                        $scope.selectedItems.splice(idx, 1);
                    }
                    else {
                        $scope.selectedItems.push(item);
                    }
                };

                $scope.selectAll = function($event){
                    $event.preventDefault();

                    $scope.selectedItems = $scope.selectableItems.slice(0, $scope.selectableItems.length);
                };

                $scope.clearAll = function($event){
                    $event.preventDefault();

                    $scope.selectedItems = [];
                };

                function transformChip(chip) {
                    if($scope.headerRowData.columnFilter.valuesTransformerCallback){
                        return $scope.headerRowData.columnFilter.valuesTransformerCallback(chip);
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