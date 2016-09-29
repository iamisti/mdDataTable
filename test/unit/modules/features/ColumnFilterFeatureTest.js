describe('ColumnFilterFeature', function(){

    beforeEach(module('mdtTemplates'));
    beforeEach(module('mdDataTable'));

    it('WHEN feature is used THEN it needs to add feature related variables to the passed objects', inject(function($rootScope, ColumnFilterFeature){
        //given
        var scope = $rootScope.$new();
        scope.columnFilter = {
            applyFilterCallback: function(){},
            valuesProviderCallback: function(){}
        };

        var objectToPass = {};

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

    it('WHEN feature is not used THEN it must not add feature related variables to the passed objects', inject(function($rootScope, ColumnFilterFeature){
        //given
        var scope = $rootScope.$new();
        var objectToPass = {};

        //when
        //ColumnFilterFeature.appendHeaderCellData(scope, objectToPass);

        //then
        expect(objectToPass).toEqual({});
    }));

    it('WHEN feature is used THEN it should add feature related variables to the scope', inject(function($rootScope, ColumnFilterFeature){
        //given
        var scope = $rootScope.$new();
        var headerData = {
            columnFilterIsEnabled: true
        };

        //when
        ColumnFilterFeature.initGeneratedHeaderCellContent(scope, headerData);

        //then
        expect(scope.isColumnFilterVisible).toBe(false);
        expect(scope.cancelFilterDialog).toBeDefined();
        expect(scope.confirmFilterDialog).toBeDefined();
    }));

    it('WHEN feature is not used THEN it must not add feature related variables to the scope', inject(function($rootScope, ColumnFilterFeature){
        //given
        var scope = $rootScope.$new();
        var headerData = {
            columnFilterIsEnabled: false
        };

        //when
        ColumnFilterFeature.initGeneratedHeaderCellContent(scope, headerData);

        //then
        expect(scope.isColumnFilterVisible).not.toBeDefined();
        expect(scope.cancelFilterDialog).not.toBeDefined();
        expect(scope.confirmFilterDialog).not.toBeDefined();
    }));

    it('WHEN calling `cancelFilterDialog` THEN it should set `isColumnFilterVisible to false', inject(function($rootScope, ColumnFilterFeature){
        //given
        var scope = $rootScope.$new();
        var headerData = {
            columnFilterIsEnabled: true
        };

        ColumnFilterFeature.initGeneratedHeaderCellContent(scope, headerData);
        scope.isColumnFilterVisible = true;

        //when
        scope.cancelFilterDialog({ stopPropagation: angular.noop });

        //then
        expect(scope.isColumnFilterVisible).toBe(false);
    }));

    describe('WHEN calling `confirmFilterDialog`', function(){
        var scope;
        var headerData;
        var mockedEvent = { stopPropagation: angular.noop };

        beforeEach(inject(function($rootScope, ColumnFilterFeature){
            scope = $rootScope.$new();
            scope.columnFilter = {
                applyFilterCallback: function(){},
                valuesProviderCallback: function(){}
            };

            headerData = {
                columnFilterIsEnabled: true
            };

            ColumnFilterFeature.appendHeaderCellData(scope, headerData);
            ColumnFilterFeature.initGeneratedHeaderCellContent(scope, headerData);
        }));

        it('THEN it should set `isColumnFilterVisible to false', inject(function(){
            //given
            scope.isColumnFilterVisible = true;

            //when
            scope.confirmFilterDialog({ items: [], event: mockedEvent });

            //then
            expect(scope.isColumnFilterVisible).toBe(false);
        }));

        xit('THEN it should call `columnFilterApplyFilterCallback` with the selected items', inject(function(){
            //given
            spyOn(headerData, 'columnFilterApplyFilterCallback');

            //when
            scope.confirmFilterDialog({ items: ['items', 'here'], event: mockedEvent });

            //then
            expect(headerData.columnFilterApplyFilterCallback).toHaveBeenCalledWith(['items', 'here']);
        }));

        xit('AND ajax feature is used THEN it should fetch the data', function(){
            //given
            scope.mdtRowPaginator = true;

            //when
            scope.confirmFilterDialog(['item']);

            //then
        });
    });
});