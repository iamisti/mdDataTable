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
            /*
            link:  function($scope, element, attrs, ctrl, transclude){
                var injectableContent = transclude();

                element.find('thead').append(
                    injectableContent
                );
            }
            */
            compile: function(elem, attrs, transcludeFn) {
                return function (scope, element, attrs) {
                    transcludeFn(scope, function(clone) {
                        var primaryBlock = elem.find('thead');
                        var secondaryBlock = elem.find('tbody');


                        //var transcludedButtons = clone[1] - this is works;
                        var transcludedButtons = angular.element(clone.find('md-data-table-header-row')).clone();
                        //var transcludedButtons = clone.filter('md-data-table-header-row');
                        //var transcludedButtons2 = angular.element(clone.shift()).clone();

                        primaryBlock.append(transcludedButtons);
                        //secondaryBlock.append(transcludedButtons2);
                    });
                };
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTable', mdDataTableDirective);
}());