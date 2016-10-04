(function(){
    'use strict';

    /**
     * @ngdoc directive
     * @name mdtColumn
     * @restrict E
     * @requires mdtTable
     *
     * @description
     * Representing a header column cell which should be placed inside `mdt-header-row` element directive.
     *
     * @param {string=} alignRule align cell content. This settings will have affect on each data cells in the same
     *  column (e.g. every x.th cell in every row).
     *
     *  Assignable values:
     *    - 'left'
     *    - 'right'
     *
     * @param {function()=} sortBy compareFunction callback for sorting the column data's. As every compare function,
     *  should get two parameters and return with the comapred result (-1,1,0)
     *
     * @param {string=} columnDefinition displays a tooltip on hover.
     *
     * @example
     * <pre>
     *  <mdt-table>
     *      <mdt-header-row>
     *          <mdt-column align-rule="left">Product name</mdt-column>
     *          <mdt-column
     *              align-rule="right"
     *              column-definition="The price of the product in gross.">Price</mdt-column>
     *      </mdt-header-row>
     *
     *      <mdt-row ng-repeat="product in ctrl.products">
     *          <mdt-cell>{{product.name}}</mdt-cell>
     *          <mdt-cell>{{product.price}}</mdt-cell>
     *      </mdt-row>
     *  </mdt-table>
     * </pre>
     */
    function mdtColumnDirective($interpolate, ColumnFilterFeature){
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                alignRule: '@',
                sortBy: '=',
                columnDefinition: '@',
                columnFilter: '=?'
            },
            require: ['^mdtTable'],
            link: function ($scope, element, attrs, ctrl, transclude) {
                var mdtTableCtrl = ctrl[0];

                transclude(function (clone) {
                    // directive creates an isolate scope so use parent scope to resolve variables.
                    var cellValue = $interpolate(clone.html())($scope.$parent);
                    var cellDataToStore = {
                        alignRule: $scope.alignRule,
                        sortBy: $scope.sortBy,
                        columnDefinition: $scope.columnDefinition,
                        columnName: cellValue
                    };

                    ColumnFilterFeature.appendHeaderCellData($scope, cellDataToStore, mdtTableCtrl.dataStorage, element);

                    mdtTableCtrl.dataStorage.addHeaderCellData(cellDataToStore);
                });
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtColumn', mdtColumnDirective);
}());