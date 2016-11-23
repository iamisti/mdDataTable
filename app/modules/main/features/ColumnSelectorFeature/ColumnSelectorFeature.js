(function(){
    'use strict';

    function ColumnSelectorFeature() {

        var service = this;

        /**
         * This is the first entry point when we initialize the feature.
         *
         * The method adds feature-related variable to the passed object.
         *
         * @param cellDataToStore
         */
        service.appendHeaderCellData = function(cellDataToStore, columnSelectorFeature, isColumnExcludedFromColumnSelector, hideColumnByDefault) {
            if(!columnSelectorFeature.isEnabled){
                return;
            }

            cellDataToStore.columnSelectorFeature = {};

            if(isColumnExcludedFromColumnSelector){
                cellDataToStore.columnSelectorFeature.isExcluded = true;
            }else{
                cellDataToStore.columnSelectorFeature.isExcluded = false;
            }

            if(hideColumnByDefault){
                cellDataToStore.columnSelectorFeature.isHidden = true;
            }else{
                cellDataToStore.columnSelectorFeature.isHidden = false;
            }
        };

        /**
         * This is the first entry point when we initialize the feature.
         *
         * The method adds feature-related variable to the passed object.
         *
         * @param cellDataToStore
         */
        service.initFeature = function(scope, vm) {
            //TODO: backward compatible when there is only a string input
            scope.columnSelectorFeature = {};

            if(scope.tableCard && scope.tableCard.columnSelector){
                scope.columnSelectorFeature.isEnabled = true;
            }else{
                scope.columnSelectorFeature.isEnabled = false;
            }

            vm.columnSelectorFeature = scope.columnSelectorFeature;
        };

        /**
         * This is the second entry point when we initialize the feature.
         *
         * The method adds feature-related variable to the passed header rows array.
         *
         * @param headerRowsData
         */
        service.initFeatureHeaderValues = function(headerRowsData, columnSelectorFeature){
            if(columnSelectorFeature && columnSelectorFeature.isEnabled){
                _.each(headerRowsData, function(item){
                    item.columnSelectorFeature.isVisible = !item.columnSelectorFeature.isHidden;
                });
            }
        };

        /**
         * Set the position of the panel. It's required to attach it to the outer container
         * of the component because otherwise some parts of the panel can became partially or fully hidden
         * (e.g.: when table has only one row to show)
         */
        service.positionElement = function(element){
            var elementToPosition = element.parent().find('.mdt-column-chooser-button');
            var elementPosition = elementToPosition.offset();
            var rt = ($(window).width() - (elementPosition.left + elementToPosition.outerWidth()));

            var targetMetrics = {
                top: elementPosition.top + 55,
                right: rt
            };

            element.css('position', 'absolute');
            element.detach().appendTo('body');

            element.css({
                top: targetMetrics.top + 'px',
                right: targetMetrics.right + 'px',
                position:'absolute'
            });
        }
    }

    angular
        .module('mdDataTable')
        .service('ColumnSelectorFeature', ColumnSelectorFeature);
}());