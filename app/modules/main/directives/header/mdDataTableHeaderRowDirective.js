(function(){
    'use strict';

    function mdDataTableHeaderRowDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableHeaderRow.html',
            replace: true,
            transclude: true,
            require: '^mdDataTable',
            scope: true,
            link: function($scope, element, attrs, mdDataTableCtrl, transclude){
                $scope.isSelectableRows = mdDataTableCtrl.isSelectableRows;

                appendColumns();

                function appendColumns(){
                    transclude(function (clone) {
                        element.append(clone);
                    });
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableHeaderRow', mdDataTableHeaderRowDirective);
}());