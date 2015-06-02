(function(){
    'use strict';

    function mdDataTableDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTable.html',
            transclude: true,
            scope: {
                tableCard: '=',
                tableRowsData: '=',
                selectableRows: '='
            },
            link: {
                pre: function($scope, element, attrs, ctrl, transclude){
                    appendColumns();

                    function appendColumns(){
                        angular.element(transclude()).appendTo(element.find('.theadTrRow'));
                    }
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTable', mdDataTableDirective);
}());