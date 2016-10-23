(function(){
    'use strict';

    /**
     * @name PaginatorTypeProvider
     * @returns possible values for different type of paginators
     *
     * @describe Representing the possible paginator types.
     */
    var PaginatorTypeProvider = {
        AJAX : 'ajax',
        ARRAY : 'array'
    };

    angular
        .module('mdDataTable')
        .value('PaginatorTypeProvider', PaginatorTypeProvider);
})();
