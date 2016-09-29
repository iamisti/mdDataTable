(function() {
    'use strict';

    function mdtColumnFilterDirective($q){
        return{
            restrict: 'E',
            templateUrl: '/main/templates/mdtColumnFilter.html',
            scope: {
                confirmCallback: '=',
                cancelCallback: '&',
                valuesProviderCallback: '='
            },
            link: function($scope, elem, attrs){

                init();

                $scope.transformChip = transformChip;

                function init(){
                    $scope.isLoading = true;
                    $scope.hasError = false;
                    $scope.selectedItem = null;
                    $scope.searchText = null;
                    $scope.availableItems = [];
                    $scope.selectedItems = [];
                    $scope.placeholderText = attrs.placeholderText || 'Filter column...';
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