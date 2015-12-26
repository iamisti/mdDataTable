(function(){
    'use strict';

    function mdtCellDirective($parse){
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                htmlContent: '@'
            },
            require: ['^mdtTable','^mdtRow'],
            link: function($scope, element, attrs, ctrl, transclude){
                var mdtRowCtrl = ctrl[1];

                transclude(function (clone) {
                    //TODO: rework, figure out something for including html content
                    if($scope.htmlContent){
                        mdtRowCtrl.addToRowDataStorage(clone, 'htmlContent');
                    }else{
                        //TODO: better idea?
                        var cellValue = $parse(clone.html().replace('{{', '').replace('}}', ''))($scope.$parent);
                        mdtRowCtrl.addToRowDataStorage(cellValue);
                    }
                });
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtCell', mdtCellDirective);
}());