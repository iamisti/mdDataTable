(function(){
    'use strict';

    function mdtSortingIconsDirective(ColumnSortDirectionProvider){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/cells/generateSortingIcons.html',
            scope: {
                data: '=',
                size: '@'
            },
            link: function($scope){
                $scope.ColumnSortDirectionProvider = ColumnSortDirectionProvider;
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtSortingIcons', mdtSortingIconsDirective);
}());