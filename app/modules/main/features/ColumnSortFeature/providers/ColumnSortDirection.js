(function(){
    'use strict';

    /**
     * @name ColumnSortDirectionProvider
     * @returns possible values for different type of paginators
     *
     * @describe Representing the possible paginator types.
     */
    var ColumnSortDirectionProvider = {
        ASC : 'asc',
        DESC : 'desc'
    };

    angular
        .module('mdDataTable')
        .value('ColumnSortDirectionProvider', ColumnSortDirectionProvider);
})();
