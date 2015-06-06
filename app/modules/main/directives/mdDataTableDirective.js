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
            link: function($scope, element, attrs, ctrl, transclude){
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

                    element.find('table thead').append(headings);
                    element.find('table tbody').append(body);
                });
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTable', mdDataTableDirective);
}());