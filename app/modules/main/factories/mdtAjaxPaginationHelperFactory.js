(function(){
    'use strict';

    function mdtAjaxPaginationHelperFactory(ColumnFilterFeature, _){

        function mdtAjaxPaginationHelper(params){
            this.dataStorage = params.dataStorage;
            this.rowOptions = params.mdtRowOptions;
            this.paginatorFunction = params.mdtRowPaginatorFunction;
            this.mdtRowPaginatorErrorMessage = params.mdtRowPaginatorErrorMessage || 'Ajax error during loading contents.';
            this.mdtRowPaginatorNoResultsMessage = params.mdtRowPaginatorNoResultsMessage || 'No results.';
            this.mdtTriggerRequest = params.mdtTriggerRequest;

            if(params.paginationSetting &&
                params.paginationSetting.hasOwnProperty('rowsPerPageValues') &&
                params.paginationSetting.rowsPerPageValues.length > 0){

                this.rowsPerPageValues = params.paginationSetting.rowsPerPageValues;
            }else{
                this.rowsPerPageValues = [10,20,30,50,100];
            }

            this.rowsPerPage = this.rowsPerPageValues[0];
            this.page = 1;
            this.totalResultCount = 0;
            this.totalPages = 0;

            this.isLoading = false;

            //fetching the 1st page
            //this.fetchPage(this.page);

            //triggering ajax call manually
            if(this.mdtTriggerRequest) {
                params.mdtTriggerRequest({
                    loadPageCallback: this.fetchPage.bind(this)
                });
            }
        }

        mdtAjaxPaginationHelper.prototype.getStartRowIndex = function(){
            return (this.page-1) * this.rowsPerPage;
        };

        mdtAjaxPaginationHelper.prototype.getEndRowIndex = function(){
            var lastItem = this.getStartRowIndex() + this.rowsPerPage - 1;

            if(this.totalResultCount < lastItem){
                return this.totalResultCount - 1;
            }

            return lastItem;
        };

        mdtAjaxPaginationHelper.prototype.getTotalRowsCount = function(){
            return this.totalResultCount;
        };

        mdtAjaxPaginationHelper.prototype.getRows = function(){
            return this.dataStorage.storage;
        };

        mdtAjaxPaginationHelper.prototype.previousPage = function(){
            var that = this;
            if(this.hasPreviousPage()){
                this.fetchPage(this.page-1).then(function(){
                    that.page--;
                });
            }
        };

        mdtAjaxPaginationHelper.prototype.nextPage = function(){
            var that = this;
            if(this.hasNextPage()){
                this.fetchPage(this.page+1).then(function(){
                    that.page++;
                });
            }
        };

        mdtAjaxPaginationHelper.prototype.getFirstPage = function(){
            this.page = 1;

            this.fetchPage(this.page);
        };

        mdtAjaxPaginationHelper.prototype.hasNextPage = function(){
            return this.page < this.totalPages;
        };

        mdtAjaxPaginationHelper.prototype.hasPreviousPage = function(){
            return this.page > 1;
        };

        mdtAjaxPaginationHelper.prototype.fetchPage = function(page){
            this.isLoading = true;

            var that = this;

            var callbackArguments = {page: page, pageSize: this.rowsPerPage};

            ColumnFilterFeature.appendAppliedFiltersToCallbackArgument(this.dataStorage, callbackArguments);

            return this.paginatorFunction(callbackArguments)
                .then(function(data){
                    that.dataStorage.storage = [];
                    that.setRawDataToStorage(that, data.results, that.rowOptions['table-row-id-key'], that.rowOptions['column-keys'], that.rowOptions);
                    that.totalResultCount = data.totalResultCount;
                    that.totalPages = Math.ceil(data.totalResultCount / that.rowsPerPage);

                    if(that.totalResultCount == 0){
                        that.isNoResults = true;
                    }else{
                        that.isNoResults = false;
                    }

                    that.isLoadError = false;
                    that.isLoading = false;

                }, function(){
                    that.dataStorage.storage = [];

                    that.isLoadError = true;
                    that.isLoading = false;
                    that.isNoResults = true;
                });
        };

        mdtAjaxPaginationHelper.prototype.setRawDataToStorage = function(that, data, tableRowIdKey, columnKeys, rowOptions){
            var rowId;
            var columnValues = [];
            _.each(data, function(row){
                rowId = _.get(row, tableRowIdKey);
                columnValues = [];

                _.each(columnKeys, function(columnKey){
                    //TODO: centralize adding column values into one place.
                    // Duplication occurs at mdtCellDirective's link function.
                    // Duplication in mdtTableDirective `_addRawDataToStorage` method!
                    columnValues.push({
                        attributes: {
                            editableField: false
                        },
                        rowId: rowId,
                        columnKey: columnKey,
                        value: _.get(row, columnKey)
                    });
                });

                var className = rowOptions['table-row-class-name'] ? rowOptions['table-row-class-name'](row) : false;

                that.dataStorage.addRowData(rowId, columnValues, className);
            });
        };

        mdtAjaxPaginationHelper.prototype.setRowsPerPage = function(rowsPerPage){
            this.rowsPerPage = rowsPerPage;

            this.getFirstPage();
        };

        return {
            getInstance: function(dataStorage, isEnabled, paginatorFunction, rowOptions){
                return new mdtAjaxPaginationHelper(dataStorage, isEnabled, paginatorFunction, rowOptions);
            }
        };
    }

    angular
        .module('mdDataTable')
        .service('mdtAjaxPaginationHelperFactory', mdtAjaxPaginationHelperFactory);
}());
