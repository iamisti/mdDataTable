(function(){
    'use strict';

    function mdtAddHtmlContentToCellDirective($parse){
        return {
            restrict: 'A',
            link: function($scope, element, attr){
                $scope.$watch(function(){
                    //this needs to be like that. Passing only `attr.mdtAddHtmlContentToCell` will cause digest to go crazy 10 times.
                    // so we has to say explicitly that we only want to watch the content and nor the attributes, or the additional metadata.
                    var val = $parse(attr.mdtAddHtmlContentToCell)($scope);

                    if(val.value){
                        return val.value;
                    }

                    return val;
                }, function(val){
                    element.empty();
                    element.append(val);
                }, false);
                // issue with false value. If fields are editable then it won't reflect the change.
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtAddHtmlContentToCell', mdtAddHtmlContentToCellDirective);
}());