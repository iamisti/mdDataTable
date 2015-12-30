(function(){
    'use strict';

    function DemoController($scope, PageService, $http, $compile){
        $scope.pages = PageService.getAllPages();
        $scope.selectPage = selectPage;

        //init
        setTimeout(function(){
            selectPage($scope.pages[0]);
        }, 2000);


        function selectPage(aPage){
            $scope.selectedPage = aPage;

            $http.get('http://codepen.io/iamisti/pen/'+aPage.codepen+'.html').then(function(content){
                //angular.element('#myDiv').empty();
                angular.element('#myDiv').append($compile(content.data)($scope));
            });
        }
    }

    function PageService(){
        var service = this;

        service.getAllPages = getAllPages;

        var pages = [
            {
                name: 'Basic',
                codepen: 'PZbyRe'
            },{
                name: 'Table card',
                codepen: 'bEBKgK'
            },{
                name: 'Selectable rows',
                codepen: 'bEBKRj'
            },{
                name: 'Sortable columns',
                codepen: 'dGOKzN'
            },{
                name: 'Pagination',
                codepen: 'GoNGMy'
            },{
                name: 'Search',
                codepen: 'bEBKYx'
            },{
                name: 'Animated sort icon',
                codepen: 'MKbXOM'
            }/*,{
                name: 'Ripple effect',
                codepen: 'xZRzpV'
            }*/
        ];

        function getAllPages(){
            return pages;
        }
    }

    angular.module('exampleApp', ['ngMaterial', 'mdDataTable']);

    angular.module('exampleApp').service('PageService', PageService);
    angular.module('exampleApp').controller('DemoController', DemoController);
}());