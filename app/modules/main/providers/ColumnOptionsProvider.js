(function(){
    'use strict';

    var ColumnOptionProvider = {
        ALIGN_RULE : {
            ALIGN_LEFT: 'left',
            ALIGN_RIGHT: 'right'
        }
    };

    angular.module('mdDataTable')
        .value('ColumnOptionProvider', ColumnOptionProvider);
})();