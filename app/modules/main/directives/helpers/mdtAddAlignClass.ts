import {ColumnAlignmentHelper} from '../../helpers/ColumnAlignmentHelper';

function mdtAddAlignClass(ColumnAlignmentHelper:ColumnAlignmentHelper) {
    return {
        restrict: 'A',
        scope: {
            mdtAddAlignClass: '='
        },
        link: function($scope:IScope, element:any) {
            var classToAdd = ColumnAlignmentHelper.getColumnAlignClass($scope['mdtAddAlignClass']);

            element.addClass(classToAdd);
        }
    };
}

angular
    .module('mdDataTable')
    .directive('mdtAddAlignClass', mdtAddAlignClass);