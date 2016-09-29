(function(){
    'use strict';

    function ColumnFilterFeature(){

        var service = this;

        /**
         * This is the first entry point when we initialize the feature.
         *
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

        service.initGeneratedHeaderCellContent = function($scope, headerData, parentCtrl){
            if(!headerData.columnFilterIsEnabled){
                return;
            }

            $scope.isColumnFilterVisible = false;

            $scope.cancelFilterDialog = function(event){
                event.stopPropagation();
                $scope.isColumnFilterVisible = false;
            };

            $scope.confirmFilterDialog = function(params){
                params.event.stopPropagation();
                $scope.isColumnFilterVisible = false;

                headerData.columnFilterApplyFilterCallback(params.items);

                if($scope.mdtRowPaginator){
                    parentCtrl.mdtPaginationHelper.fetchPage(1);
                }else{
                    // no support for non-ajax yet
                }
            }
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