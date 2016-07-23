function mdtAnimateSortIconHandlerDirective() {
    return {
        restrict: 'A',
        scope: false,
        link: function($scope:IScope, element:any) {
            if ($scope['animateSortIcon']) {
                element.addClass('animate-sort-icon');
            }
        }
    };
}

angular
    .module('mdDataTable')
    .directive('mdtAnimateSortIconHandler', mdtAnimateSortIconHandlerDirective);