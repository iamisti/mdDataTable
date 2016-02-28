(function(){
    'use strict';

    function InlineEditModalCtrl($scope, position, cellData, $timeout, $mdDialog){

        $timeout(function() {
            var el = $('md-dialog');
            el.css('position', 'fixed');
            el.css('top', position['top']);
            el.css('left', position['left']);

            el.find('input[type="text"]').focus();
        });

        $scope.cellData = cellData;
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