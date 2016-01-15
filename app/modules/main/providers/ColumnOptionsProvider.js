(function(){
    'use strict';

    /**
     * @name ColumnOptionProvider
     * @returns possible assignable column options you can give
     *
     * @describe Representing the assignable properties to the columns you can give.
     */
    var ColumnOptionProvider = {
        ALIGN_RULE : {
            ALIGN_LEFT: 'left',
            ALIGN_RIGHT: 'right'
        }
    };

    angular
        .module('mdDataTable')
        .value('ColumnOptionProvider', ColumnOptionProvider);
})();
