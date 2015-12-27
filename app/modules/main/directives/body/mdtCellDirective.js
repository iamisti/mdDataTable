(function(){
    'use strict';

    function mdtCellDirective($parse){
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            require: ['^mdtTable','^mdtRow'],
            link: function($scope, element, attr, ctrl, transclude){
                var mdtRowCtrl = ctrl[1];

                transclude(function (clone) {
                    //TODO: rework, figure out something for including html content
                    if(attr.htmlContent){
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