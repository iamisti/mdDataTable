(function(){
    'use strict';

    angular.module('developmentAreaApp', ['ngMaterial', 'mdDataTable']);
    angular.module('developmentAreaApp').controller('DevelopmentAreaController', function($scope, $q){

        var nutritionList = [
            {
                id: 601,
                name: 'Frozen joghurt',
                nf_serving_size_unit: 'salad',
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
                nf_serving_size_unit: 'bird',
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
                nf_serving_size_unit: 'ea',
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
                nf_serving_size_unit: 'teaspoons',
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
                nf_serving_size_unit: 'tablespoons',
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
                nf_serving_size_unit: 'cup',
                calories: 375,
                fat: 0.0,
                carbs: 94,
                protein: 0.0,
                sodium: 50,
                calcium: '0%',
                iron: '0%'
            },
            {
                id: 607,
                name: 'Lollipop',
                calories: 392,
                fat: 0.2,
                carbs: 98,
                protein: 0,
                sodium: 38,
                calcium: '0%',
                iron: '2%'
            },
            {
                id: 608,
                name: 'Honeycomb',
                calories: 408,
                fat: 3.2,
                carbs: 87,
                protein: 6.5,
                sodium: 562,
                calcium: '0%',
                iron: '45%'
            },
            {
                id: 609,
                name: 'Donut',
                calories: 452,
                fat: 25.0,
                carbs: 51,
                protein: 4.9,
                sodium: 326,
                calcium: '2%',
                iron: '22%'
            },
            {
                id: 610,
                name: 'KitKat',
                calories: 518,
                fat: 26.0,
                carbs: 65,
                protein: 7,
                sodium: 54,
                calcium: '12%',
                iron: '6%'
            }
        ];

        $scope.paginatorCallback = paginatorCallback;

        $scope.personSearchEndpoint = personSearchEndpoint;
        $scope.caloriesValues = caloriesValues;
        $scope.fatValues = fatValues;

        $scope.personChipTransformer = personChipTransformer;

        $scope.rowClassNameCallback = function(row){
            return row.name;
        };

        function paginatorCallback(page, pageSize, filtersApplied){
            console.log(filtersApplied);
            var offset = (page-1) * pageSize;
            var result;

            if(filtersApplied[0].length) {
                result = _.filter(nutritionList, function (o) {
                    var res = false;

                    _.each(filtersApplied[0], function(aNutrition){
                        if(res){
                            return;
                        }

                        res = o.name.indexOf(aNutrition.name) !== -1;
                    });

                    return res;
                });
            }else{
                result = nutritionList;
            }

            return $q.resolve({
                results: result.slice(offset, offset + pageSize),
                totalResultCount: nutritionList.length
            });
        }

        //search endpoints
        function personSearchEndpoint(names){
            var arr = _.filter(nutritionList, function(item){
                return item.name.toLowerCase().indexOf(names.toLowerCase()) !== -1;
            });

            return $q.resolve(arr);
        }

        function caloriesValues(){
            var arr = _.filter(nutritionList, function(item){
                return item.nf_serving_size_unit && item.nf_serving_size_unit.toLowerCase();
            });

            return $q.resolve(_.pluck(arr, 'nf_serving_size_unit'));
        }

        function fatValues(){
            return $q.resolve(['more than 50%', 'less than 50%']);
        }

        //value transformers
        function personChipTransformer(nutrition){
            return nutrition.name;
        }

        $scope.myMethodToExecute = function(){
            console.log('CLICKED');
        }
    });
}());