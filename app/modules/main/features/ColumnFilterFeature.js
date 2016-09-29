(function(){
    'use strict';

    function ColumnFilterFeature(){

        var service = this;

        /**
         * The method adds feature-related variable to the passed object.
         * The variables gets stored afterwards in the dataStorage for the header cell
         *
         * @param $scope
         * @param cellDataToStore
         */
        service.appendHeaderCellData = function($scope, cellDataToStore){

            if($scope.columnFilter &&
                $scope.columnFilter.applyFilterCallback && $scope.columnFilter.valuesProviderCallback){

                cellDataToStore.columnFilterIsEnabled = true;
                cellDataToStore.columnFilterApplyFilterCallback = $scope.columnFilter.applyFilterCallback;
                cellDataToStore.columnFilterValuesProviderCallback = $scope.columnFilter.valuesProviderCallback;
                cellDataToStore.columnFiltersApplied = [];
            }
        };

        service.initGeneratedHeaderCellContent = function($scope){
            $scope.isColumnFilterVisible = false;
        };

        service.generatedHeaderCellClickHandler = function($scope, headerRowData){
            if(headerRowData.columnFilterIsEnabled === true) {
                $scope.isColumnFilterVisible = true;
            }
        };

        service.appendAppliedFiltersToCallbackArgument = function(dataStorage, callbackArguments){
            var columnFilters = [];
            _.each(dataStorage.header, function(headerData){
                var filters = headerData.columnFiltersApplied || [];

                columnFilters.push(filters);
            });

            callbackArguments.filtersApplied = columnFilters;
        }
    }

    angular
        .module('mdDataTable')
        .service('ColumnFilterFeature', ColumnFilterFeature);
}());