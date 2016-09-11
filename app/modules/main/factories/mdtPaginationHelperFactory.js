(function(){
    'use strict';

    function mdtPaginationHelperFactory(_){

        function mdtPaginationHelper(tableDataStorageService, paginationSetting){
            this.tableDataStorageService = tableDataStorageService;

            if(paginationSetting &&
                paginationSetting.hasOwnProperty('rowsPerPageValues') &&
                paginationSetting.rowsPerPageValues.length > 0){

                this.rowsPerPageValues = paginationSetting.rowsPerPageValues;
            }else{
                this.rowsPerPageValues = [10,20,30,50,100];
            }

            this.rowsPerPage = this.rowsPerPageValues[0];
            this.page = 1;
        }

        mdtPaginationHelper.prototype.calculateVisibleRows = function (){
            var that = this;

            _.each(this.tableDataStorageService.storage, function (rowData, index) {
                if(index >= that.getStartRowIndex() && index <= that.getEndRowIndex()) {
                    rowData.optionList.visible = true;
                } else {
                    rowData.optionList.visible = false;
                }
            });
        };

        mdtPaginationHelper.prototype.getStartRowIndex = function(){
            return (this.page-1) * this.rowsPerPage;
        };

        mdtPaginationHelper.prototype.getEndRowIndex = function(){
            var lastItem = this.getStartRowIndex() + this.rowsPerPage-1;

            if(this.tableDataStorageService.storage.length < lastItem){
                return this.tableDataStorageService.storage.length - 1;
            }

            return lastItem;
        };

        mdtPaginationHelper.prototype.getTotalRowsCount = function(){
            return this.tableDataStorageService.storage.length;
        };

        mdtPaginationHelper.prototype.getRows = function(){
            this.calculateVisibleRows();

            return this.tableDataStorageService.storage;
        };

        mdtPaginationHelper.prototype.previousPage = function(){
            if(this.hasPreviousPage()){
                this.page--;
            }
        };

        mdtPaginationHelper.prototype.nextPage = function(){
            if(this.hasNextPage()){
                this.page++;
            }
        };

        mdtPaginationHelper.prototype.hasNextPage = function(){
            var totalPages = Math.ceil(this.getTotalRowsCount() / this.rowsPerPage);

            return this.page < totalPages;
        };

        mdtPaginationHelper.prototype.hasPreviousPage = function(){
            return this.page > 1;
        };

        mdtPaginationHelper.prototype.setRowsPerPage = function(rowsPerPage){
            this.rowsPerPage = rowsPerPage;
            this.page = 1;
        };

        return {
            getInstance: function(tableDataStorageService, isEnabled){
                return new mdtPaginationHelper(tableDataStorageService, isEnabled);
            }
        };
    }

    angular
        .module('mdDataTable')
        .service('mdtPaginationHelperFactory', mdtPaginationHelperFactory);
}());