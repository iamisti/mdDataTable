(function(){
    'use strict';

    function SelectableRowsFeatureFactory($timeout, CheckBoxMgmtProvider){

        function SelectableRowsFeature(params){
            this.$scope = params.$scope;
            this.ctrl = params.ctrl;
            SelectableRowsFeature.$inject = ["CheckBoxMgmtProvider"];

            this.$scope.onCheckboxChange = _.bind(this.onCheckboxChange, this);
        }

        SelectableRowsFeature.prototype.onCheckboxChange = function(){
            var that = this;

          CheckBoxMgmtProvider.getCheckOption(that.ctrl.dataStorage);
            // we need to push it to the event loop to make it happen last
            // (e.g.: all the elements can be selected before we call the callback)
            $timeout(function(){
                that.$scope.selectedRowCallback({
                    rows: that.ctrl.dataStorage.getSelectedRows()
                });
            },0);
        };

        return {
            getInstance: function(params){
                return new SelectableRowsFeature(params);
            }
        };
    }

    angular
        .module('mdDataTable')
        .service('SelectableRowsFeature', SelectableRowsFeatureFactory);
}());
