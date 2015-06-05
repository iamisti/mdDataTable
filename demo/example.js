(function(){
    'use strict';

    angular
        .module('exampleApp', ['ngMaterial', 'mdDataTable'])
        .config(['$mdThemingProvider', function ($mdThemingProvider) {
            'use strict';

            $mdThemingProvider.theme('default')
                .primaryPalette('blue')
                .accentPalette('pink');
        }]);

    angular.module('exampleApp').controller('ExampleController', function($scope){
        $scope.tableCardIsEnabled = true;
        $scope.tableIsSelectable = true;

        $scope.tableData = [
            ['Frozen joghurt',      159, 6.0,  24, 4.0, 87, '14%', '1%'],
            ['Ice cream sandwitch', 237, 9.0,  37, 4.3, 129, '8%', '1%'],
            ['Eclair',              262, 16.0, 24, 6.0, 337, '6%', '7%'],
            ['Cupkake',             305, 3.7,  67, 4.3, 413, '3%', '8%'],
            ['Gingerbread',         356, 16.0, 49, 3.9, 327, '7%', '16%'],
            ['Jelly bean',          375, 0.0,  94, 0.0, 50,  '0%', '0%']
        ];
    });
}());