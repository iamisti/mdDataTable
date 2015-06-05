(function(){
    'use strict';

    function mdDataTableDirective(ColumnAwareService){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTable.html',
            transclude: true,
            scope: {
                tableCard: '=',
                tableRowsData: '=',
                selectableRows: '='
            },
            controller: function($scope){
                ColumnAwareService.initialize($scope);
            },
            compile: function(tElement, tAttrs, transclude){
                transclude(function (clone) {
                    var headings = [];
                    var body = [];

                    clone.each(function (index, child) {
                        var $child = angular.element(child);

                        if ($child.hasClass('theadTrRow')) {
                            headings.push($child);
                        } else {
                            body.push($child);
                        }
                    });

                    tElement.find('table thead').append(headings);
                    tElement.find('table tbody').append(body);
                });

                return {
                    pre: function preLink(scope, iElement, iAttrs, controller) {},
                    post: function postLink(scope, iElement, iAttrs, controller) {}
                };
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTable', mdDataTableDirective);
}());