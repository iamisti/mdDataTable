(function(){
    'use strict';

    function ColumnAwareService(){
        var service = this;

        service.columnOptionsList = [];

        service.add = add;
        service.getAll = getAll;

        function add(options){
            this.columnOptionsList.push(options);
        }

        function getAll(){
            return this.columnOptionsList;
        }
    }

    angular
        .module('mdDataTable')
        .service('ColumnAwareService', ColumnAwareService);
}());