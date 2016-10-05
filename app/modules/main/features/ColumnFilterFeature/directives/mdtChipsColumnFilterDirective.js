(function() {
    'use strict';

    function mdtChipsColumnFilterDirective(_, $timeout){
        return{
            restrict: 'E',
            templateUrl: '/main/templates/mdtChipsColumnFilter.html',
            scope: {
                confirmCallback: '=',
                cancelCallback: '&',
                headerRowData: '='
            },
            link: function($scope, elem){

                $scope.transformChip = transformChip;

                $scope.availableItems = [];
                $scope.selectedItems = _.map($scope.headerRowData.columnFilter.filtersApplied, _.clone);
                $scope.placeholderText = $scope.headerRowData.columnFilter.placeholderText || 'Filter column...';

                //focus input immediately
                $timeout(function(){
                    elem.find('input').focus();
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