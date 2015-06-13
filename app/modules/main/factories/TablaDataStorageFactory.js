(function(){
    'use strict';

    function TableDataStorageFactory(uuid4){

        function TableDataStorageService(){
            this.storage = [];
        }

        TableDataStorageService.prototype.addRowData = function(rowArray){
            var rowId = uuid4.generate();

            this.storage.push({
                rowId: rowId,
                optionList: {
                    selected: false,
                    deleted: false
                },
                data: rowArray
            });
        };

        TableDataStorageService.prototype.getRowData = function(index){
            return this.storage[index].data;
        };

        TableDataStorageService.prototype.getRowOptions = function(index){
            return this.storage[index].optionList;
        };

        TableDataStorageService.prototype.setAllRowsSelected = function(isSelected){
            _.each(this.storage, function(rowData){
                rowData.optionList.selected = isSelected;
            });
        };

        TableDataStorageService.prototype.reverseRows = function(){
            this.storage.reverse();
        };

        TableDataStorageService.prototype.sortByColumnIndex = function(index){
            var res =_.sortBy(this.storage, function(rowData){
                return rowData.data[index];
            });

            this.storage = res;
        };

        TableDataStorageService.prototype.isAnyRowSelected = function(){
            return _.some(this.storage, function(rowData){
                return rowData.optionList.selected === true;
            });
        };

        TableDataStorageService.prototype.getNumberOfSelectedRows = function(){
            return _.countBy(this.storage, function(rowData){
                return rowData.optionList.selected === true && rowData.optionList.deleted === false ? 'selected' : 'unselected';
            });
        };

        TableDataStorageService.prototype.deleteSelectedRows = function(){
            _.each(this.storage, function(rowData){
                if(rowData.optionList.selected){
                    rowData.optionList.deleted = true;
                }
            });
        };

        return {
            getInstance: function(){
                return new TableDataStorageService();
            }
        };
    }

    angular
        .module('mdDataTable')
        .factory('TableDataStorageFactory', TableDataStorageFactory);
}());