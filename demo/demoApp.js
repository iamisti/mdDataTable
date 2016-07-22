(function(){
    'use strict';

    function DemoController($scope, PageService, $http, $compile){
        $scope.isDevelopmentAreaActive = false;
        $scope.pages = PageService.getAllPages();
        $scope.selectPage = selectPage;

        //init
        selectPage($scope.pages[0]);

        function selectPage(aPage){
            $scope.selectedPage = aPage;

            if(aPage.name === 'Development area' || aPage.codepen === '-'){
                $scope.isDevelopmentAreaActive = true;
            }else{
                $scope.isDevelopmentAreaActive = false;

                $http.get('http://codepen.io/iamisti/pen/'+aPage.codepen+'.html').then(function(content){
                    angular.element('#myDiv').empty().append($compile(content.data)($scope));
                });
            }
        }
    }

    function PageService(){
        var service = this;

        service.getAllPages = getAllPages;

        var pages = [
            {
                name: 'Development area',
                codepen: '-'
            },{
                name: 'Basic',
                codepen: 'mVOKEw'
            },{
                name: 'Table card',
                codepen: 'bEBKgK'
            },{
                name: 'Selectable rows',
                codepen: 'bEBKRj'
            },{
                name: 'Selected rows callback',
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
                name: 'Ajax html cell support',
                codepen: 'pbLYwq'
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

    //already defined in external resources
    angular.module('demo', ['ngMaterial',
        'developmentAreaApp',
        'exampleApp',
        'exampleApp2',
        'exampleApp3',
        'exampleApp4',
        'exampleApp5',
        'exampleApp6',
        'exampleApp7',
        'exampleApp8',
        'exampleApp9',
        'exampleApp10',
        'exampleApp11',
        'exampleApp12',
        'exampleApp13',
        'exampleApp14',
        'exampleApp15',
        'exampleApp16'
    ]);

    angular.module('demo').service('PageService', PageService);
    angular.module('demo').controller('DemoController', DemoController);
}());