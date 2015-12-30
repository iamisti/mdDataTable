(function(){
    'use strict';

    function mdtCardHeaderDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdtCardHeader.html',
            transclude: true,
            replace: true,
            scope: true,
            require: ['^mdtTable'],
            link: function($scope){
                $scope.isTableCardEnabled = false;

                if($scope.tableCard && $scope.tableCard.visible !== false){
                    $scope.isTableCardEnabled = true;
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtCardHeader', mdtCardHeaderDirective);
}());