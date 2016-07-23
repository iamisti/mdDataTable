/**
 * @ngdoc directive
 * @name mdtHeaderRow
 * @restrict E
 * @requires mdtTable
 *
 * @description
 * Representing a header row which should be placed inside `mdt-table` element directive.
 * The main responsibility of this directive is to execute all the transcluded `mdt-column` element directives.
 *
 */
function mdtHeaderRowDirective() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        require: '^mdtTable',
        scope: true,
        link: function($scope:IScope, element:any, attrs:any, mdtCtrl:any, transclude:any){
            appendColumns();

            function appendColumns() {
                transclude(function (clone:any) {
                    element.append(clone);
                });
            }
        }
    };
}

angular
    .module('mdDataTable')
    .directive('mdtHeaderRow', mdtHeaderRowDirective);