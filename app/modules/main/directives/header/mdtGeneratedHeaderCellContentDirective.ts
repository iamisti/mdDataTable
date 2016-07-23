function mdtGeneratedHeaderCellContentDirective() {
    return {
        restrict: 'E',
        templateUrl: '/main/templates/mdtGeneratedHeaderCellContent.html',
        replace: true,
        scope: false
    };
}

angular.module('mdDataTable')
    .directive('mdtGeneratedHeaderCellContent', mdtGeneratedHeaderCellContentDirective);