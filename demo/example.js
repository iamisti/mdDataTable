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

    angular.module('exampleApp').controller('ExampleController', function($scope, $mdToast){
        $scope.tableCardIsEnabled = true;
        $scope.tableIsSelectable = true;
        $scope.tableIsSortable = true;

        $scope.deleteRowCallback = function(rows){
            $mdToast.show(
                $mdToast.simple()
                    .content('Deleted row id(s): '+rows)
                    .hideDelay(3000)
            );
        };

        $scope.nutritionList = [
            {
                id: 601,
                name: 'Frozen joghurt',
                calories: 159,
                fat: 6.0,
                carbs: 24,
                protein: 4.0,
                sodium: 87,
                calcium: '14%',
                iron: '1%'
            },
            {
                id: 602,
                name: 'Ice cream sandwitch',
                calories: 237,
                fat: 9.0,
                carbs: 37,
                protein: 4.3,
                sodium: 129,
                calcium: '84%',
                iron: '1%'
            },
            {
                id: 603,
                name: 'Eclair',
                calories: 262,
                fat: 16.0,
                carbs: 24,
                protein: 6.0,
                sodium: 337,
                calcium: '6%',
                iron: '7%'
            },
            {
                id: 604,
                name: 'Cupkake',
                calories: 305,
                fat: 3.7,
                carbs: 67,
                protein: 4.3,
                sodium: 413,
                calcium: '3%',
                iron: '8%'
            },
            {
                id: 605,
                name: 'Gingerbread',
                calories: 356,
                fat: 16.0,
                carbs: 49,
                protein: 2.9,
                sodium: 327,
                calcium: '7%',
                iron: '16%'
            },
            {
                id: 606,
                name: 'Jelly bean',
                calories: 375,
                fat: 0.0,
                carbs: 94,
                protein: 0.0,
                sodium: 50,
                calcium: '0%',
                iron: '0%'
            }
        ];

        $scope.nutritionList2 = [
            {
                name: 'Frozen2 joghurt',
                calories: 959,
                fat: 9.0,
                carbs: 94,
                protein: 9.0,
                sodium: 97,
                calcium: '94%',
                iron: '9%'
            },
            {
                name: 'Ice2 cream sandwitch',
                calories: 337,
                fat: 3.0,
                carbs: 37,
                protein: 3.3,
                sodium: 329,
                calcium: '34%',
                iron: '3%'
            },
            {
                name: 'Eclair5',
                calories: 562,
                fat: 56.0,
                carbs: 54,
                protein: 5.0,
                sodium: 537,
                calcium: '5%',
                iron: '5%'
            }
        ];
    });
}());