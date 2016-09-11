(function(){
    'use strict';

    function mdtAddHtmlContentToCellDirective($compile){
        return {
            restrict: 'A',
            require: '^mdtTable',
            scope: {
                mdtAddHtmlContentToCell: '='
            },
            link: function($scope, element, attr, ctrl){
                $scope.$watch('mdtAddHtmlContentToCell', function(originalValue){
                    element.empty();

                    if(originalValue.columnKey && ctrl.tableDataStorageService.customCells[originalValue.columnKey]){
                        debugger;
                        var customCellData = ctrl.tableDataStorageService.customCells[originalValue.columnKey];
                        var clonedHtml = customCellData.htmlContent;

                        if(clonedHtml){
                            var localScope = customCellData.scope;

                            //append value to the scope
                            localScope.value = originalValue.value;

                            $compile(clonedHtml)(localScope, function(cloned){
                                element.append(cloned);
                            });
                        }else{
                            element.append(originalValue.value);
                        }

                    }else{
                        element.append(originalValue.value);
                    }

                }, true);
                // issue with false value. If fields are editable then it won't reflect the change.
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtAddHtmlContentToCell', mdtAddHtmlContentToCellDirective);
}());