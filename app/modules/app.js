(function(){
    'use strict';

    /**
     * @description
     * Component resolution and creation flow:
     *
     * Because directives are not containing each other in their templates (e.g. not a general parent-child
     * relationship), that's why the resolution of different components are not obvious. They are working with
     * transclusion and it's rule will apply to the process flow.
     * Here is an overview on what directives and which part of that will execute in which order.
     *
     * 1. `mdtTable` controller
     *         - basic services initialized for future usage by other directives
     *
     * 2. `mdtTable` link
     *         - transclude `mdtHeaderRow` and all `mdtRow` elements generated contents (however it's not relevant,
     *           the real generated content is generated with the help of the collected data by `TableStorageService`.
     *         - bind some helper functions for real the generated content
     *
     * 3. Header resolution
     *
     *     3.1. `mdtHeaderRow` link
     *              - transclude all `mdtColumn` directive's generated contents
     *
     *     3.2. `mdtColumn` link(s)
     *              - add columns by the help of the `mdtTable` public API
     *              - contents generated but not yet transcluded
     *
     * 4. Rows resolution
     *
     *     4.1. `mdtRow` controller(s)
     *              - public function created which able to add a cell data to the locally stored array
     *
     *     4.2. `mdtRow` link(s)
     *              - transclude all `mdtCell` directive's generated  contents
     *              - add the collected row data to the service by the help of `mdtTable` public API
     *
     *     4.3. `mdtCell` link(s)
     *              - add cells data by the help of `mdtRow` public API
     *              - contents generated but not yet transcluded
     *
     */
    angular.module('mdDataTable', ['mdtTemplates', 'ngMaterial', 'ngMdIcons']);
}());