(function(){
    'use strict';

    function ColumnSortFeature(ColumnSortDirectionProvider) {

        var service = this;

        /**
         * This is the first entry point when we initialize the feature.
         *
         * The method adds feature-related variable to the passed object.
         *
         * @param cellDataToStore
         */
        service.appendHeaderCellData = function(cellDataToStore, columnSortOptions) {
            cellDataToStore.columnSort = {};

            if(columnSortOptions){
                cellDataToStore.columnSort.isEnabled = true;
                cellDataToStore.columnSort.sort = false;
                cellDataToStore.columnSort.comparator = columnSortOptions.comparator ? columnSortOptions.comparator : false;
            }else{
                cellDataToStore.columnSort.isEnabled = false;
            }
        };

        /**
         * Sets the sorting direction for the passed header
         *
         * @param headerRowData
         * @param valueToSet
         * @param dataStorage
         */
        service.setHeaderSort = function(headerRowData, valueToSet, dataStorage){
            if(!valueToSet){
                return;
            }

            headerRowData.columnSort.sort = (valueToSet.columnSort && valueToSet.columnSort.sort === ColumnSortDirectionProvider.ASC) ? ColumnSortDirectionProvider.ASC : ColumnSortDirectionProvider.DESC;

            //set other columns isSorted flag to false
            resetColumnDirections(headerRowData, dataStorage);
        };

        /**
         * Perform sorting for the passed column.
         *
         * @param headerRowData
         * @param dataStorage
         * @param paginator
         * @param columnIndex
         */
        service.columnClickHandler = function(headerRowData, dataStorage, paginator, columnIndex){
            // if feature is not set for the column
            if(!headerRowData.columnSort.isEnabled){
                return;
            }

            // if column filter feature is enabled, it must be disabled by clicking on the column, we handle ordering there
            if(headerRowData.columnFilter.isEnabled){
                return;
            }

            //set other columns isSorted flag to false
            resetColumnDirections(headerRowData, dataStorage);

            //calculate next sorting direction
            setNextSortingDirection(headerRowData);

            // if ajax paginator is the current paginator
            if(paginator.getFirstPage){
                paginator.getFirstPage();
            // or it's just a simple data paginator
            }else{
                //todo: making it nicer
                //adding the column index information to the header cell data
                headerRowData.columnSort.columnIndex = columnIndex;

                //sortSimpleDataByColumn(columnIndex, dataStorage);
                sortByColumn(headerRowData, dataStorage);
            }
        };

        /**
         * Add the appropriate values to the paginator callback
         * @param dataStorage
         * @param callbackArguments
         */
        service.appendSortedColumnToCallbackArgument = function(dataStorage, callbackArguments){
            var columnsSortInformation = [];
            var isEnabled = false;

            _.each(dataStorage.header, function(headerData){
                var sortValue = headerData.columnSort.sort ? headerData.columnSort.sort : false;

                columnsSortInformation.push({
                    sort: sortValue
                });

                if(headerData.columnSort.isEnabled){
                    isEnabled = true;
                }
            });

            if(isEnabled){
                callbackArguments.options.columnSort = columnsSortInformation;
            }
        };

        /***
         * Helper function for handling the sorting states in the column filter panels
         * @param event
         * @param sortingData
         */
        service.sortingCallback = function(event, sortingData){
            event.preventDefault();

            if(sortingData.columnSort.sort == false){
                sortingData.columnSort.sort = ColumnSortDirectionProvider.ASC;
            }else if(sortingData.columnSort.sort === ColumnSortDirectionProvider.ASC){
                sortingData.columnSort.sort = ColumnSortDirectionProvider.DESC;
            }else{
                sortingData.columnSort.sort = false;
            }
        };

        function resetColumnDirections(headerRowData, dataStorage){
            var lastDirectionValue = headerRowData.columnSort.sort;
            _.each(dataStorage.header, function(headerData){
                headerData.columnSort.sort = false;
            });

            headerRowData.columnSort.sort = lastDirectionValue;
        }

        function setNextSortingDirection(headerRowData){
            if(headerRowData.columnSort.sort === false){
                headerRowData.columnSort.sort = ColumnSortDirectionProvider.ASC;
            }else if(headerRowData.columnSort.sort === ColumnSortDirectionProvider.ASC){
                headerRowData.columnSort.sort = ColumnSortDirectionProvider.DESC;
            }else{
                headerRowData.columnSort.sort = false;
            }
        }

        function sortByColumn(headerRowData, dataStorage){
            var sortFunction;
            var index = headerRowData.columnSort.columnIndex;

            if (typeof headerRowData.columnSort.comparator === 'function') {
                sortFunction = function(a, b) {
                    return headerRowData.columnSort.comparator(a.data[index].value, b.data[index].value);
                };
            } else {
                // basic comparator function on basic values
                sortFunction = function (a, b) {
                    if(typeof a.data[index].value === 'string' && typeof b.data[index].value === 'string'){

                        if(a.data[index].value > b.data[index].value){
                            return 1;
                        }else if(a.data[index].value < b.data[index].value){
                            return -1;
                        }else{
                            return 0;
                        }
                    }

                    return a.data[index].value - b.data[index].value;
                };
            }

            dataStorage.storage.sort(sortFunction);

            if(headerRowData.columnSort.sort === ColumnSortDirectionProvider.DESC){
                dataStorage.storage.reverse();
            }
        }
    }

    angular
        .module('mdDataTable')
        .service('ColumnSortFeature', ColumnSortFeature);
}());