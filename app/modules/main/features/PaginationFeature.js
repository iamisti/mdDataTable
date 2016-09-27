(function(){
    'use strict';

    function PaginationFeatureFactory(){

        function PaginationFeature(params){
            this.$scope = params.$scope;

            this.$scope.isPaginationEnabled = _.bind(this.isPaginationEnabled, this);
        }

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