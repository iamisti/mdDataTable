(function () {
    'use strict';

    function ClickableRowsFeatureFactory($timeout) {

        function ClickableRowsFeature(params) {
            this.$scope = params.$scope;
            this.ctrl = params.ctrl;

            this.$scope.rowClickCallBackHandler = _.bind(this.rowClickCallBackHandler, this);
        }

        ClickableRowsFeature.prototype.rowClickCallBackHandler = function (event, row) {
            var that = this;
            // we need to push it to the event loop to make it happen last
            // (e.g.: all the elements can be selected before we call the callback)
            $timeout(function () {
                that.$scope.clickedRowCallback({ rowId: row.rowId });
            }, 0);
        };

        return {
            getInstance: function (params) {
                return new ClickableRowsFeature(params);
            }
        };
    }

    angular
        .module('mdDataTable')
        .service('ClickableRowsFeature', ClickableRowsFeatureFactory);
}());