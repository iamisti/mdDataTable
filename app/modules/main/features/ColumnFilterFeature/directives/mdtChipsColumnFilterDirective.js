(function() {
    'use strict';

    function mdtChipsColumnFilterDirective(_, $timeout, ColumnFilterFeature){
        return{
            restrict: 'E',
            templateUrl: '/main/templates/mdtChipsColumnFilter.html',
            scope: {
                confirmCallback: '=',
                cancelCallback: '&',
                headerRowData: '='
            },
            link: function($scope, element){
                ColumnFilterFeature.positionColumnFilterBox(element);

                $scope.transformChip = transformChip;

                $scope.availableItems = [];
                $scope.selectedItems = _.map($scope.headerRowData.columnFilter.filtersApplied, _.clone);
                $scope.placeholderText = $scope.headerRowData.columnFilter.placeholderText || 'Filter column...';

                //destroying scope doesn't remove element, since it belongs to the body directly
                $scope.$on('$destroy', function(){
                    element.remove();
                });

                //focus input immediately
                $timeout(function(){
                    element.find('input').focus();
                },0);

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
        .directive('mdtChipsColumnFilter', mdtChipsColumnFilterDirective);
})();