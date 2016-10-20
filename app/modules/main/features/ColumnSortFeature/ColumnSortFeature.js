(function(){
    'use strict';

    function ColumnSortFeature() {

        var service = this;


        /**
         * This is the first entry point when we initialize the feature.
         *
         * The method adds feature-related variable to the passed object.
         *
         * @param $scope
         * @param cellDataToStore
         */
        service.appendHeaderCellData = function(cellDataToStore, comparator) {
            cellDataToStore.columnSort = {};

            cellDataToStore.columnSort.isSorted = false;
            cellDataToStore.columnSort.direction = 0;
            cellDataToStore.columnSort.comparator = comparator;
        };

        service.sortHeader = function(headerRowData, dataStorage, paginator, columnIndex){
            //set other columns isSorted flag to false
            resetColumnDirections(headerRowData, dataStorage);

            //calculate next sorting direction
            setNextSortingDirection(headerRowData);

            //todo: making it nicer
            //adding the column index information to the header cell data
            headerRowData.columnSort.columnIndex = columnIndex;

            // if ajax paginator is the current paginator
            if(paginator.getFirstPage){
                paginator.getFirstPage();
            // or it's just a simple data paginator
            }else{
                //sortSimpleDataByColumn(columnIndex, dataStorage);
                sortByColumn(headerRowData, dataStorage);
            }
        };

        service.appendSortedColumnToCallbackArgument = function(dataStorage, callbackArguments){
            var sortedColumn;

            _.each(dataStorage.header, function(headerDataRow){
                if(headerDataRow.columnSort.isSorted){
                    sortedColumn = headerDataRow;
                }
            });

            if(sortedColumn){
                callbackArguments.options.orderedColumn = {
                    'index': sortedColumn.columnSort.columnIndex,
                    'sort': sortedColumn.columnSort.direction ? 'asc' : 'desc'
                };
            }
        };

        function resetColumnDirections(headerRowData, dataStorage){
            var lastDirectionValue = headerRowData.columnSort.direction;
            _.each(dataStorage.header, function(headerData){
                headerData.columnSort.isSorted = false;
                headerData.columnSort.direction = 0;
            });

            headerRowData.columnSort.isSorted = true;
            headerRowData.columnSort.direction = lastDirectionValue;
        }

        function setNextSortingDirection(headerRowData){
            if(headerRowData.columnSort.direction == 0){
                headerRowData.columnSort.direction = 1;
            }else{
                headerRowData.columnSort.direction *= -1;
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

            if(headerRowData.columnSort.direction == -1){
                dataStorage.storage.reverse();
            }
        }
    }

    angular
        .module('mdDataTable')
        .service('ColumnSortFeature', ColumnSortFeature);
}());