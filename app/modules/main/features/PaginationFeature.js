(function(){
    'use strict';

    function PaginationFeature(mdtPaginationHelperFactory, mdtAjaxPaginationHelperFactory){
        var service = this;

        service.initFeature = initFeature;
        service.startFeature = startFeature;

        function initFeature(scope, ctrl){
            if(!scope.mdtRowPaginator){
                ctrl.mdtPaginationHelper = scope.mdtPaginationHelper = mdtPaginationHelperFactory
                    .getInstance(ctrl.dataStorage, scope.paginatedRows, scope.mdtRow);
            }else{
                ctrl.mdtPaginationHelper = scope.mdtPaginationHelper = mdtAjaxPaginationHelperFactory.getInstance({
                    dataStorage: ctrl.dataStorage,
                    paginationSetting: scope.paginatedRows,
                    mdtRowOptions: scope.mdtRow,
                    mdtRowPaginatorFunction: scope.mdtRowPaginator,
                    mdtRowPaginatorErrorMessage: scope.mdtRowPaginatorErrorMessage,
                    mdtRowPaginatorNoResultsMessage: scope.mdtRowPaginatorNoResultsMessage,
                    mdtTriggerRequest: scope.mdtTriggerRequest
                });
            }

            scope.isPaginationEnabled = function(){
                if(scope.paginatedRows === true ||
                    (scope.paginatedRows && scope.paginatedRows.hasOwnProperty('isEnabled') && scope.paginatedRows.isEnabled === true)){
                    return true;
                }

                return false;
            };

            ctrl.paginationFeature = {
                startPaginationFeature: function() {
                    if (scope.mdtRowPaginator) {
                        scope.mdtPaginationHelper.fetchPage(1);
                    }
                }
            };
        }

        function startFeature(ctrl){
            ctrl.paginationFeature.startPaginationFeature();
        }
    }

    angular
        .module('mdDataTable')
        .service('PaginationFeature', PaginationFeature);
}());