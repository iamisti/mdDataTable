(function(){
    'use strict';

    function mdtAjaxPaginationHelperFactory(){

        function mdtAjaxPaginationHelper(params){
            this.tableDataStorageService = params.tableDataStorageService;
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
            this.fetchPage(this.page);

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
            return this.getStartRowIndex() + this.rowsPerPage-1;
        };

        mdtAjaxPaginationHelper.prototype.getTotalRowsCount = function(){
            return this.totalPages;
        };

        mdtAjaxPaginationHelper.prototype.getRows = function(){
            return this.tableDataStorageService.storage;
        };

        mdtAjaxPaginationHelper.prototype.previousPage = function(){
            var that = this;
            if(this.page > 1){
                this.fetchPage(this.page-1).then(function(){
                    that.page--;
                });
            }
        };

        mdtAjaxPaginationHelper.prototype.nextPage = function(){
            var that = this;
            if(this.page < this.totalPages){
                this.fetchPage(this.page+1).then(function(){
                    that.page++;
                });
            }
        };

        mdtAjaxPaginationHelper.prototype.fetchPage = function(page){
            this.isLoading = true;

            var that = this;

            return this.paginatorFunction({page: page, pageSize: this.rowsPerPage})
                .then(function(data){
                    that.tableDataStorageService.storage = [];
                    that.setRawDataToStorage(that, data.results, that.rowOptions['table-row-id-key'], that.rowOptions['column-keys']);
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
                    that.tableDataStorageService.storage = [];

                    that.isLoadError = true;
                    that.isLoading = false;
                    that.isNoResults = true;
                });
        };

        mdtAjaxPaginationHelper.prototype.setRawDataToStorage = function(that, data, tableRowIdKey, columnKeys){
            var rowId;
            var columnValues = [];
            _.each(data, function(row){
                rowId = _.get(row, tableRowIdKey);
                columnValues = [];

                _.each(columnKeys, function(columnKey){
                    //TODO: centralize adding column values into one place.
                    // Duplication occurs at mdtCellDirective's link function.
                    columnValues.push({
                        attributes: {
                            editableField: false
                        },
                        columnKey: columnKey,
                        value: _.get(row, columnKey)
                    });
                });

                that.tableDataStorageService.addRowData(rowId, columnValues);
            });
        };

        mdtAjaxPaginationHelper.prototype.setRowsPerPage = function(rowsPerPage){
            this.rowsPerPage = rowsPerPage;
            this.page = 1;

            this.fetchPage(this.page);
        };

        return {
            getInstance: function(tableDataStorageService, isEnabled, paginatorFunction, rowOptions){
                return new mdtAjaxPaginationHelper(tableDataStorageService, isEnabled, paginatorFunction, rowOptions);
            }
        };
    }

    angular
        .module('mdDataTable')
        .service('mdtAjaxPaginationHelperFactory', mdtAjaxPaginationHelperFactory);
}());