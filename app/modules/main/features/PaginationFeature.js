(function(){
    'use strict';

    function PaginationFeatureFactory(mdtPaginationHelperFactory, mdtAjaxPaginationHelperFactory){

        function PaginationFeature(params){
            this.$scope = params.$scope;
            this.mdtTableCtrl = params.mdtTableCtrl;

            this.$scope.isPaginationEnabled = _.bind(this.isPaginationEnabled, this);

            this.initPaginator();
        }

        PaginationFeature.prototype.start = function(){
            if(this.$scope.mdtRowPaginator){
                this.$scope.mdtPaginationHelper.fetchPage(1);
            }
        };

        PaginationFeature.prototype.initPaginator = function(){
            if(!this.$scope.mdtRowPaginator){
                this.mdtTableCtrl.mdtPaginationHelper = this.$scope.mdtPaginationHelper = mdtPaginationHelperFactory
                    .getInstance(this.mdtTableCtrl.dataStorage, this.$scope.paginatedRows, this.$scope.mdtRow);
            }else{
                this.mdtTableCtrl.mdtPaginationHelper = this.$scope.mdtPaginationHelper = mdtAjaxPaginationHelperFactory.getInstance({
                    dataStorage: this.mdtTableCtrl.dataStorage,
                    paginationSetting: this.$scope.paginatedRows,
                    mdtRowOptions: this.$scope.mdtRow,
                    mdtRowPaginatorFunction: this.$scope.mdtRowPaginator,
                    mdtRowPaginatorErrorMessage: this.$scope.mdtRowPaginatorErrorMessage,
                    mdtRowPaginatorNoResultsMessage: this.$scope.mdtRowPaginatorNoResultsMessage,
                    mdtTriggerRequest: this.$scope.mdtTriggerRequest
                });
            }
        };

        PaginationFeature.prototype.isPaginationEnabled = function(){
            if(this.$scope.paginatedRows === true ||
                (this.$scope.paginatedRows && this.$scope.paginatedRows.hasOwnProperty('isEnabled') && this.$scope.paginatedRows.isEnabled === true)){
                return true;
            }

            return false;
        };

        return {
            getInstance: function(params){
                return new PaginationFeature(params);
            }
        };
    }

    angular
        .module('mdDataTable')
        .service('PaginationFeature', PaginationFeatureFactory);
}());