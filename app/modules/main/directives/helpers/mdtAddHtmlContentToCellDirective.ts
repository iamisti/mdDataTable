import ICompileService = angular.ICompileService;
import IRootScopeService = angular.IRootScopeService;

function mdtAddHtmlContentToCellDirective($parse:IParseService, $compile:ICompileService, $rootScope:IRootScopeService) {
    return {
        restrict: 'A',
        require: '^mdtTable',
        link: function($scope:IScope, element:any, attr:any, ctrl:any) {

            $scope.$watch(function() {
                //this needs to be like that. Passing only `attr.mdtAddHtmlContentToCell` will cause digest to go crazy 10 times.
                // so we has to say explicitly that we only want to watch the content and nor the attributes, or the additional metadata.
                var val = $parse(attr.mdtAddHtmlContentToCell)($scope);

                return val.value;

            }, function(val:any) {
                element.empty();

                var originalValue = $parse(attr.mdtAddHtmlContentToCell)($scope);

                if (originalValue.columnKey && ctrl.tableDataStorageService.customCells[originalValue.columnKey]) {
                    var clonedHtml = ctrl.tableDataStorageService.customCells[originalValue.columnKey];

                    var localScope = $rootScope.$new();
                    localScope['value'] = val;

                    $compile(clonedHtml)(localScope, function(cloned:any) {
                        element.append(cloned);
                    });
                }else {
                    element.append(val);
                }


            }, false);
            // issue with false value. If fields are editable then it won't reflect the change.
        }
    };
}

angular
    .module('mdDataTable')
    .directive('mdtAddHtmlContentToCell', mdtAddHtmlContentToCellDirective);