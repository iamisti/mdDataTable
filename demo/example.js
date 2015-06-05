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
    });
}());