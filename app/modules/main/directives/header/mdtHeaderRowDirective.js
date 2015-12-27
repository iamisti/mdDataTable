(function(){
    'use strict';

    function mdtHeaderRowDirective(){
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            require: '^mdtTable',
            scope: true,
            link: function($scope, element, attrs, mdtCtrl, transclude){
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
        .directive('mdtHeaderRow', mdtHeaderRowDirective);
}());