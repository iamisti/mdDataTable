(function(){
    'use strict';

    function DemoController($scope, $sce, PageService){
        $scope.pages = PageService.getAllPages();
        $scope.selectPage = selectPage;

        //init
        selectPage($scope.pages[0]);

        function selectPage(aPage){
            $scope.selectedPage = aPage;
            $scope.examplePageUrl = $sce.trustAsResourceUrl('//codepen.io/eMaj/embed/'+aPage.codepen+'/?height=3000&theme-id=0&default-tab=result');
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
                codepen: 'bEBKgK'
            },{
                name: 'Selectable rows',
                codepen: 'bEBKRj'
            },{
                name: 'Selectable rows callback',
                codepen: 'OMvbMj'
            },{
                name: 'Sortable columns',
                codepen: 'dGOKzN'
            },{
                name: 'Virtual Repeat',
                codepen: 'qbxLEQ'
            },{
                name: 'Animated sort icon',
                codepen: 'MKbXOM'
            },{
                name: 'Pagination',
                codepen: 'GoNGMy'
            },{
                name: 'Ajax support',
                codepen: 'BjpNow'
            },{
                name: 'Ajax search support',
                codepen: 'RRrjLk'
            },{
                name: 'Search',
                codepen: 'bEBKYx'
            },{
                name: 'Html support',
                codepen: 'LGLYjZ'
            },{
                name: 'Editable fields - small dialog',
                codepen: 'LNYBZX'
            },{
                name: 'Editable fields - large dialog',
                codepen: 'zqYLNj'
            }/*,{
                name: 'Ripple effect',
                codepen: 'xZRzpV'
            }*/
        ];

        function getAllPages(){
            return pages;
        }
    }

    angular.module('demo', ['ngMaterial']);

    angular.module('demo').service('PageService', PageService);
    angular.module('demo').controller('DemoController', DemoController);
}());
