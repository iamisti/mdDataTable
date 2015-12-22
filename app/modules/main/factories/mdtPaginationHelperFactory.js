(function(){
    'use strict';

    function mdtPaginationHelperFactory(){

        function mdtPaginationHelper(tableDataStorageService){
            this.tableDataStorageService = tableDataStorageService;

            this.rowsPerPageValues = [2,10,20,30,50,100];
            this.rowsPerPage = 2;
            this.page = 1;
        }

        mdtPaginationHelper.prototype.getStartRowIndex = function(){
            return (this.page-1) * this.rowsPerPage;
        };

        mdtPaginationHelper.prototype.getEndRowIndex = function(){
            return this.getStartRowIndex() + this.rowsPerPage;
        };

        mdtPaginationHelper.prototype.getRows = function(isEnabled){
            if(!isEnabled){
                return this.tableDataStorageService.storage;
            }

            return this.tableDataStorageService.storage.slice(this.getStartRowIndex(), this.getEndRowIndex());
        };

        mdtPaginationHelper.prototype.getTotalRowsCount = function(){
            return this.tableDataStorageService.storage.length;
        };

        mdtPaginationHelper.prototype.previousPage = function(){
            if(this.page > 1){
                this.page--;
            }
        };

        mdtPaginationHelper.prototype.nextPage = function(){
            var totalPages = Math.floor(this.getTotalRowsCount() / this.rowsPerPage);
            if(this.page < totalPages){
                this.page++;
            }
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