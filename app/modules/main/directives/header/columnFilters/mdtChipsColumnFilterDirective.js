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
            link: function($scope, elem, attr){

                $scope.transformChip = transformChip;

                $scope.selectedItem = null;
                $scope.searchText = null;
                $scope.availableItems = [];

                $scope.selectedItems = _.map($scope.headerRowData.columnFiltersApplied, _.clone);
                $scope.placeholderText = attr.placeholderText || 'Filter column...';

                angular.element(elem).on('keydown keypressed', 'input', closeDialog);
                angular.element(elem).on('keydown keypressed', closeDialog);

                $scope.$on('$destroy', function(){
                    angular.element(elem).off('keydown keypressed');
                });

                //focus input immediately
                $timeout(function(){
                    elem.find('input').focus();
                },0);

                function transformChip(chip) {
                    if($scope.headerRowData.chipTransformerCallback){
                        return $scope.headerRowData.chipTransformerCallback(chip);
                    }

                    return chip;
                }

                function closeDialog(e){
                    if ( e.keyCode === 27 ) { // ESC
                        $scope.cancelCallback(e);
                        $scope.$apply();
                    }
                }
            }
        }
    }

    angular
        .module('mdDataTable')
        .directive('mdtChipsColumnFilter', mdtChipsColumnFilterDirective);
})();