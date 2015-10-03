(function(){
    'use strict';

    function ColumnOptionsFactory(uuid4){

        function ColumnOptionsService(){
            this.columnOptionsList = [];
        }

        ColumnOptionsService.prototype.addColumnOptions = function(options){
            //TODO: maybe we can remove it, not used anymore
            var columnId = uuid4.generate();

            var columnOptions = {
                id: columnId,
                alignRule: options.alignRule,
                sortBy: options.sortBy
            };

            this.columnOptionsList.push(columnOptions);

            return columnOptions;
        };

        ColumnOptionsService.prototype.getColumnOptions = function(index){
            return this.columnOptionsList[index];
        };

        return {
            getInstance: function(){
                return new ColumnOptionsService();
            }
        };
    }

    angular
        .module('mdDataTable')
        .factory('ColumnOptionsFactory', ColumnOptionsFactory);
}());