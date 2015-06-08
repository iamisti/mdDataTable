(function(){
    'use strict';

    function mdDataTableDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTable.html',
            transclude: true,
            scope: {
                tableCard: '=',
                selectableRows: '='
            },
            controllerAs: 'mdDataTableCtrl',
            controller: function($scope){
                var columnOptionsList = [];
                var vm = this;

                vm.isSelectableRows = isSelectableRows;
                vm.getColumnOptions = getColumnOptions;
                vm.addColumnOptions = addColumnOptions;

                function isSelectableRows(){
                    return $scope.selectableRows;
                }

                function addColumnOptions(options){
                    return columnOptionsList.push(options);
                }

                function getColumnOptions(index){
                    return columnOptionsList[index];
                }
            },
            link: function($scope, element, attrs, ctrl, transclude){
                injectContentIntoTemplate();

                function injectContentIntoTemplate(){
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
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTable', mdDataTableDirective);
}());