(function(){
    'use strict';

    function DemoController($scope, $sce, PageService){
        $scope.pages = PageService.getAllPages();

        $scope.selectPage = selectPage;


        $scope.selectedPage = $scope.pages[0];
        $scope.examplePageUrl = $sce.trustAsResourceUrl('//codepen.io/eMaj/embed/'+$scope.selectedPage.codepen+'/?height=3000&theme-id=0&default-tab=result');

        function selectPage(aPage){
            $scope.selectedPage = aPage;
        }
    }

    function PageService(){
        var service = this;

        service.getAllPages = getAllPages;

        var pages = [
            {
                name: 'Basic',
                codepen: 'mVOKEw'
            },{
                name: 'Table card',
                codepen: 'GJMPba'
            },{
                name: 'Selectable rows',
                codepen: 'OVxdNV'
            },{
                name: 'Sortable columns',
                codepen: 'MwELyv'
            },{
                name: 'Pagination',
                codepen: 'MwELyv'
            },{
                name: 'Search',
                codepen: 'MwELyv'
            },{
                name: 'Animated sort icon',
                codepen: 'MwELyv'
            },{
                name: 'Ripple effect',
                codepen: 'MwELyv'
            }
        ];

        function getAllPages(){
            return pages;
        }
    }

    angular.module('demo', ['ngMaterial']);

    angular.module('demo').service('PageService', PageService);
    angular.module('demo').controller('DemoController', DemoController);
}());