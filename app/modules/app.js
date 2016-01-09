(function(){
    'use strict';

    /**
     * @description
     * Component resolution and creation flow:
     *
     * 1. `mdtTable` controller
     *         - basic services initialized for future usage by other directives
     *
     * 2. `mdtRow` controller(s)
     *         - public function created which able to add a cell data to the locally stored array
     *
     * 3. `mdtColumn` link(s)
     *         - add columns by the help of the `mdtTable` public API
     *         - contents generated but not yet transcluded
     *
     * 4. `mdtHeaderRow` link
     *         - transclude all `mdtColumn` directive's generated contents
     *
     * 5. `mdtCell` link(s)
     *         - add cells data by the help of `mdtRow` public API
     *         - contents generated but not yet transcluded
     *
     * 6. `mdtRow` link(s)
     *         - transclude all `mdtCell` directive's generated  contents
     *         - add the collected row data to the service by the help of `mdtTable` public API
     *
     * 7. `mdtTable` link
     *         - transclude `mdtHeaderRow` and all `mdtRow` elements generated contents (however it's not relevant,
     *           the real generated content is generated with the help of the collected data by `TableStorageService`.
     *         - bind some helper functions for real the generated content
     */
    angular.module('mdDataTable', ['mdtTemplates', 'ngMaterial', 'ngMdIcons']);
}());