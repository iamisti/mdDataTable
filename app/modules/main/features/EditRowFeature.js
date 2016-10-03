(function(){
    'use strict';

    function EditRowFeature($mdDialog){

        var service = this;

        service.addRequiredFunctions = function($scope, ctrl){

            $scope.saveRow = function(rowData){
                var rawRowData = ctrl.dataStorage.getSavedRowData(rowData);

                $scope.saveRowCallback({row: rawRowData});
            };

            $scope.showEditDialog = function(ev, cellData, rowData){
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
                        mdtTranslations: $scope.mdtTranslations
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
        }
    }

    angular
        .module('mdDataTable')
        .service('EditRowFeature', EditRowFeature);
}());