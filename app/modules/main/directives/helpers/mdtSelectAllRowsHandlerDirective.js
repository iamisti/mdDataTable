(function(){
    'use strict';

    function mdtSelectAllRowsHandlerDirective($timeout){
        return {
            restrict: 'A',
            scope: false,
            require: '^mdtTable',
            link: function($scope, element, attrs, ctrl){
                $scope.selectAllRows = false;

                $scope.$watch('selectAllRows', function(val){
                  if($scope.initTable){
                    $timeout(function(){
                      $scope.initTable = false;
                    }, attrs.hideDelay);
                  }else{
                    _.each(ctrl.dataStorage.storage, function(data){
                      if(data.optionList.selected === false){
                        val = true;
                        $('th md-checkbox').addClass('md-checked');
                        return false;
                      }
                    });
                  }

                    ctrl.dataStorage.setAllRowsSelected(val, $scope.isPaginationEnabled());
                });
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtSelectAllRowsHandler', mdtSelectAllRowsHandlerDirective);
}());
