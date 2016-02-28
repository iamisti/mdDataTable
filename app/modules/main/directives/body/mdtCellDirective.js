(function(){
    'use strict';

    /**
     * @ngdoc directive
     * @name mdtCell
     * @restrict E
     * @requires mdtTable
     * @requires mdtRow
     *
     * @description
     * Representing a cell which should be placed inside `mdt-row` element directive.
     *
     * @param {boolean=} htmlContent if set to true, then html content can be placed into the content of the directive.
     * @param {string=} editableField if set, then content can be editable.
     *
     *      Available modes are:
     *
     *      - "smallEditDialog" - A simple, one-field edit dialog on click
     *      - "largeEditDialog" - A complex, flexible edit edit dialog on click
     *
     * @param {string=} editableFieldTitle if set, then it sets the title of the dialog. (only for `largeEditDialog`)
     * @param {number=} editableFieldMaxLength if set, then it sets the maximum length of the field.
     *
     *
     * @example
     * <pre>
     *  <mdt-table>
     *      <mdt-header-row>
     *          <mdt-column>Product name</mdt-column>
     *          <mdt-column>Price</mdt-column>
     *          <mdt-column>Details</mdt-column>
     *      </mdt-header-row>
     *
     *      <mdt-row ng-repeat="product in ctrl.products">
     *          <mdt-cell>{{product.name}}</mdt-cell>
     *          <mdt-cell>{{product.price}}</mdt-cell>
     *          <mdt-cell html-content="true">
     *              <a href="productdetails/{{product.id}}">more details</a>
     *          </mdt-cell>
     *      </mdt-row>
     *  </mdt-table>
     * </pre>
     */
    function mdtCellDirective($parse){
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            require: '^mdtRow',
            link: function($scope, element, attr, mdtRowCtrl, transclude){

                var attributes = {
                    htmlContent: attr.htmlContent ? attr.htmlContent : false,
                    editableField: attr.editableField ? attr.editableField : false,
                    editableFieldTitle: attr.editableFieldTitle ? attr.editableFieldTitle : false,
                    editableFieldMaxLength: attr.editableFieldMaxLength ? attr.editableFieldMaxLength : false
                };

                transclude(function (clone) {
                    //TODO: rework, figure out something for including html content
                    if(attr.htmlContent){
                        mdtRowCtrl.addToRowDataStorage(clone, attributes);
                    }else{
                        //TODO: better idea?
                        var cellValue = $parse(clone.html().replace('{{', '').replace('}}', ''))($scope.$parent);
                        mdtRowCtrl.addToRowDataStorage(cellValue, attributes);
                    }
                });
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtCell', mdtCellDirective);
}());