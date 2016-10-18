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
        service.appendHeaderCellData = function($scope, cellDataToStore, dataStorage, element){
            cellDataToStore.columnFilter = {};

            if($scope.columnFilter && $scope.columnFilter.valuesProviderCallback){
                cellDataToStore.columnFilter.isEnabled = true;
                cellDataToStore.columnFilter.filtersApplied = [];
                cellDataToStore.columnFilter.valuesProviderCallback = $scope.columnFilter.valuesProviderCallback;
                cellDataToStore.columnFilter.valuesTransformerCallback = $scope.columnFilter.valuesTransformerCallback;
                cellDataToStore.columnFilter.placeholderText = $scope.columnFilter.placeholderText;
                cellDataToStore.columnFilter.type = $scope.columnFilter.filterType || 'chips';
                cellDataToStore.columnFilter.isActive = false;

                cellDataToStore.columnFilter.setColumnActive = function(bool){
                    //first we disable every column filter if any is active
                    _.each(dataStorage.header, function(headerData){
                        if(headerData.columnFilter.isEnabled){
                            headerData.columnFilter.isActive = false;
                        }
                    });

                    //then we activate ours
                    cellDataToStore.columnFilter.isActive = bool ? true : false;
                }
            }else{
                cellDataToStore.columnFilter.isEnabled = false;
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
            if(!headerData.columnFilter.isEnabled){
                return;
            }

            $scope.columnFilterFeature = {};

            $scope.columnFilterFeature.cancelFilterDialog = function(event){
                if(event){
                    event.stopPropagation();
                }

                headerData.columnFilter.setColumnActive(false);
            };

            $scope.columnFilterFeature.confirmFilterDialog = function(params){
                params.event.stopPropagation();

                headerData.columnFilter.setColumnActive(false);

                headerData.columnFilter.filtersApplied = params.selectedItems;

                if($scope.mdtRowPaginator){
                    parentCtrl.mdtPaginationHelper.getFirstPage();
                }else{
                    // no support for non-ajax yet
                }
            }
        };

        /**
         * Click handler for the feature when header cell gets clicked
         * @param $scope
         * @param headerRowData
         */
        service.generatedHeaderCellClickHandler = function($scope, headerRowData, element){
            if(!headerRowData.columnFilter.isEnabled) {
                return;
            }

            headerRowData.columnFilter.setColumnActive(!headerRowData.columnFilter.isActive);
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
                var filters = headerData.columnFilter.filtersApplied || [];

                if(headerData.columnFilter.isEnabled){
                    isEnabled = true;
                }

                columnFilters.push(filters);
            });

            if(isEnabled){
                callbackArguments.filtersApplied = columnFilters;
            }
        };

        /**
         * Set the position of the column filter panel. It's required to attach it to the outer container 
         * of the component because otherwise some parts of the panel can became partially or fully hidden
         * (e.g.: when table has only one row to show)
         */
        service.positionColumnFilterBox = function(element){
            var elementPosition = element.closest('th').offset();

            var targetMetrics = {
                top: elementPosition.top + 60,
                left: elementPosition.left
            };
            
            element.css('position', 'absolute');
            element.detach().appendTo('body');

            element.css({
                top: targetMetrics.top + 'px', 
                left: targetMetrics.left + 'px', 
                position:'absolute'
            });
        }
    }

    angular
        .module('mdDataTable')
        .service('ColumnFilterFeature', ColumnFilterFeature);
}());