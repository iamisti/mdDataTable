(function(){
    'use strict';

    function EditRowFeatureFactory($mdDialog){

        function EditRowFeature(params){
            this.$scope = params.$scope;
            this.ctrl = params.ctrl;

            this.$scope.saveRow = _.bind(this.saveRow, this);
            this.$scope.showEditDialog = _.bind(this.showEditDialog, this);
        }

        EditRowFeature.prototype.saveRow = function(rowData){
            var rawRowData = this.ctrl.dataStorage.getSavedRowData(rowData);
            this.$scope.saveRowCallback({row: rawRowData});
        };

        EditRowFeature.prototype.showEditDialog = function(ev, cellData, rowData){

            var rect = ev.currentTarget.closest('td').getBoundingClientRect();
            var position = {
                top: rect.top,
                left: rect.left
            };

            var ops = {
                controller: 'InlineEditModalCtrl',
                targetEvent: ev,
                clickOutsideToClose: true,
                escapeToClose: true,
                focusOnOpen: false,
                locals: {
                    position: position,
                    cellData: JSON.parse(JSON.stringify(cellData)),
                    mdtTranslations: this.$scope.mdtTranslations
                }
            };

            if(cellData.attributes.editableField === 'smallEditDialog'){
                ops.templateUrl = '/main/templates/smallEditDialog.html';
            }else{
                ops.templateUrl = '/main/templates/largeEditDialog.html';
            }

            var that = this;
            $mdDialog.show(ops).then(function(cellValue){
                cellData.value = cellValue;

                that.saveRow(rowData);
            });
        };

        return {
            getInstance: function(params){
                return new EditRowFeature(params);
            }
        };
    }

    angular
        .module('mdDataTable')
        .service('EditRowFeature', EditRowFeatureFactory);
}());