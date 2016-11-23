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
     * @param {boolean=|object=} columnSort sort data and display a sorted state in the header. Clicking on a column
     *      which is already sorted will reverse the sort order and rotate the sort icon.
     *
     *      When object is passed, then compare function can be passed for sorting the column data's. As every compare
     *      function, it gets two parameters and return with the compared result (-1,1,0)
     *
     *  Assignable values:
     *     - true or false
     *     - { comparator: function(a,b)}
     *
     * @param {object=} columnFilter if provided, user can activate column filter feature on the selected column
     *
     *  Assignable properties:
     *     - {Function=} valuesProviderCallback required, function which provides the values into the column filter. It must return with a promise which resolves an array of strings/objects
     *     - {Function=} valuesTransformerCallback optional, function which transforms the provided objects into strings to be able to show it visually in the column filter
     *     - {string=} placeholderText optional, placeholder which will show up as a default text (available only for `chips` and `dropdown` filter types
     *     - {string=} filterType defines the type of the filter you want to use. Available options are: `chips`, `checkbox`, `dropdown`. If you don't specify it, the default will be `chips`
     *
     * @param {string=} columnDefinition displays a tooltip on hover.
     *
     * @param {boolean=} excludeFromColumnSelector disables the column selection for the applied column for the column select feature.
     *
     * @param {boolean=} hideColumnByDefault sets the target column as unselected for the column select feature.
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
    function mdtColumnDirective($interpolate, ColumnFilterFeature, ColumnSortFeature, ColumnSelectorFeature){
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                alignRule: '@',
                columnDefinition: '@',
                columnSort: '=?',
                columnFilter: '=?',
                excludeFromColumnSelector: '=?',
                hideColumnByDefault: '=?'
            },
            require: ['^mdtTable'],
            link: function ($scope, element, attrs, ctrl, transclude) {
                var mdtTableCtrl = ctrl[0];

                transclude(function (clone) {
                    // directive creates an isolate scope so use parent scope to resolve variables.
                    var cellValue = $interpolate(clone.html())($scope.$parent);
                    var cellDataToStore = {
                        alignRule: $scope.alignRule,
                        columnDefinition: $scope.columnDefinition,
                        columnName: cellValue
                    };

                    ColumnFilterFeature.appendHeaderCellData($scope, cellDataToStore, mdtTableCtrl.dataStorage);
                    ColumnSortFeature.appendHeaderCellData(cellDataToStore, $scope.columnSort);
                    ColumnSelectorFeature.appendHeaderCellData(cellDataToStore, mdtTableCtrl.columnSelectorFeature, $scope.excludeFromColumnSelector, $scope.hideColumnByDefault);

                    mdtTableCtrl.dataStorage.addHeaderCellData(cellDataToStore);
                });
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtColumn', mdtColumnDirective);
}());