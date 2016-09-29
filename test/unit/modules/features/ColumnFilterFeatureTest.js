describe('ColumnFilterFeature', function(){

    beforeEach(module('mdtTemplates'));
    beforeEach(module('mdDataTable'));

    it('WHEN `appendHeaderCellData` gets called THEN it needs to add feature related variables to the passed objects', inject(function($rootScope, ColumnFilterFeature){
        //given
        var scope = $rootScope.$new();
        scope.columnFilter = {
            applyFilterCallback: function(){},
            valuesProviderCallback: function(){}
        };

        var objectToPass = {

        };

        //when
        ColumnFilterFeature.appendHeaderCellData(scope, objectToPass);

        //then
        expect(objectToPass).toEqual({
            columnFilterIsEnabled: true,
            columnFilterApplyFilterCallback: scope.columnFilter.applyFilterCallback,
            columnFilterValuesProviderCallback: scope.columnFilter.valuesProviderCallback,
            columnFiltersApplied: []
        });
    }));
});