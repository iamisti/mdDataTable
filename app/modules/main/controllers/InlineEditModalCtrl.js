(function(){
    'use strict';

    function InlineEditModalCtrl($scope, position, cellData, mdtTranslations, $timeout, $mdDialog){

        $timeout(function() {
            var el = angular.element('md-dialog');
            el.css('position', 'fixed');
            el.css('top', position['top']);
            el.css('left', position['left']);

            angular.element( el[0].querySelector('input[type="text"]') ).focus();
        });

        $scope.cellData = cellData;
        $scope.mdtTranslations = mdtTranslations;

        $scope.saveRow = saveRow;
        $scope.cancel = cancel;

        function saveRow(){
            if($scope.editFieldForm.$valid){
                $mdDialog.hide(cellData.value);
            }
        }

        function cancel(){
            $mdDialog.cancel();
        }
    }

    angular
        .module('mdDataTable')
        .controller('InlineEditModalCtrl', InlineEditModalCtrl);
}());