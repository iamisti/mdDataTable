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

            if($scope.columnFilter && $scope.columnFilter.valuesProviderCallback){

                cellDataToStore.columnFilterIsEnabled = true;
                cellDataToStore.columnFiltersApplied = [];
                cellDataToStore.columnFilterValuesProviderCallback = $scope.columnFilter.valuesProviderCallback;
                cellDataToStore.chipTransformerCallback = $scope.columnFilter.chipTransformerCallback;
            }
        };

        /**
         * Generating the needed functions and variables for the header cell which will
         * handle the actions of the column filter component.
         *
         * @param $scope
         * @param headerData
         * @param parentCtrl
         */
        service.initGeneratedHeaderCellContent = function($scope, headerData, parentCtrl){
            if(!headerData.columnFilterIsEnabled){
                return;
            }

            $scope.isColumnFilterVisible = false;

            $scope.cancelFilterDialog = function(event){
                if(event){
                    event.stopPropagation();
                }

                $scope.isColumnFilterVisible = false;
            };

            $scope.confirmFilterDialog = function(params){
                params.event.stopPropagation();
                $scope.isColumnFilterVisible = false;

                headerData.columnFiltersApplied = params.selectedItems;

                if($scope.mdtRowPaginator){
                    parentCtrl.mdtPaginationHelper.fetchPage(1);
                }else{
                    // no support for non-ajax yet
                }
            };
        };

        /**
         * Click handler for the feature when header cell gets clicked
         * @param $scope
         * @param headerRowData
         */
        service.generatedHeaderCellClickHandler = function($scope, headerRowData){
            if(!headerRowData.columnFilterIsEnabled) {
                return;
            }

            $scope.isColumnFilterVisible = true;
        };

        /**
         * Returns with an array of currently applied filters on the columns.
         * @param dataStorage
         * @param callbackArguments
         */
        service.appendAppliedFiltersToCallbackArgument = function(dataStorage, callbackArguments){
            var columnFilters = [];
            var isEnabled = false;

            _.each(dataStorage.header, function(headerData){
                var filters = headerData.columnFiltersApplied || [];

                if(headerData.columnFilterIsEnabled){
                    isEnabled = true;
                }

                columnFilters.push(filters);
            });

            if(isEnabled){
                callbackArguments.filtersApplied = columnFilters;
            }
        }
    }

    angular
        .module('mdDataTable')
        .service('ColumnFilterFeature', ColumnFilterFeature);
}());