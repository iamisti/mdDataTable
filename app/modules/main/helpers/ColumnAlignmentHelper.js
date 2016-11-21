(function(){
    'use strict';

    function ColumnAlignmentHelper(ColumnOptionProvider){
        var service = this;
        service.getColumnAlignClass = getColumnAlignClass;

        function getColumnAlignClass(alignRule) {
            switch (alignRule) {
                case ColumnOptionProvider.ALIGN_RULE.ALIGN_RIGHT:
                    return 'rightAlignedColumn';
                case ColumnOptionProvider.ALIGN_RULE.ALIGN_CENTER:
                    return 'centerAlignedColumn';
                case ColumnOptionProvider.ALIGN_RULE.ALIGN_LEFT:
                default:
                    return 'leftAlignedColumn';
            }
        }
    }

    angular
        .module('mdDataTable')
        .service('ColumnAlignmentHelper', ColumnAlignmentHelper);
}());