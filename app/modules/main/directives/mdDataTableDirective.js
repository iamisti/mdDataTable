(function(){
    'use strict';

    function mdDataTableDirective(ColumnAwareService){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTable.html',
            transclude: true,
            scope: {
                tableCard: '=',
                selectableRows: '='
            },
            bindToController: true,
            controllerAs: 'vm',
            controller: function(){
                var vm = this;

                vm.isRowsSelectable = function(){
                    return vm.selectableRows;
                }
            },
            link: function($scope, element, attrs, ctrl, transclude){
                ColumnAwareService.initialize($scope);

                transclude(function (clone) {
                    var headings = [];
                    var body = [];

                    _.each(clone, function (child) {
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