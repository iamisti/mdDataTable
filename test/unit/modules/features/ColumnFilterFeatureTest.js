describe('ColumnFilterFeature', function(){

    beforeEach(module('mdtTemplates'));
    beforeEach(module('mdDataTable'));

    describe('WHEN calling `appendHeaderCellData`', function(){
        var scope;

        beforeEach(inject(function($rootScope){
            scope = $rootScope.$new();
        }));

        it('AND feature is used THEN it needs to add feature related variables to the passed objects', inject(function($rootScope, ColumnFilterFeature){
            //given
            scope.columnFilter = {
                valuesProviderCallback: function(){}
            };

            var objectToPass = {};

            //when
            ColumnFilterFeature.appendHeaderCellData(scope, objectToPass);

            //then
            expect(objectToPass).toEqual({
                columnFilterIsEnabled: true,
                columnFilterValuesProviderCallback: scope.columnFilter.valuesProviderCallback,
                columnFiltersApplied: []
            });
        }));

        it('AND feature is not used THEN it must not add feature related variables to the passed objects', inject(function($rootScope, ColumnFilterFeature){
            //given
            var objectToPass = {};

            //when
            ColumnFilterFeature.appendHeaderCellData(scope, objectToPass);

            //then
            expect(objectToPass).toEqual({});
        }));
    });

    describe('WHEN calling `initGeneratedHeaderCellContent`', function(){
        var scope;

        beforeEach(inject(function($rootScope){
            scope = $rootScope.$new();
        }));

        it('AND feature is used THEN it should add feature related variables to the scope', inject(function($rootScope, ColumnFilterFeature){
            //given
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

    });

    describe('WHEN calling `confirmFilterDialog`', function(){
        var scope;
        var headerData;
        var mockedEvent = { stopPropagation: angular.noop };
        var parentCtrl;

        beforeEach(inject(function($rootScope, ColumnFilterFeature){
            scope = $rootScope.$new();
            scope.columnFilter = {
                valuesProviderCallback: function(){}
            };

            headerData = {
                columnFilterIsEnabled: true
            };

            parentCtrl = {
                mdtPaginationHelper: {
                    fetchPage: function(){}
                }
            };

            ColumnFilterFeature.appendHeaderCellData(scope, headerData);
            ColumnFilterFeature.initGeneratedHeaderCellContent(scope, headerData, parentCtrl);
        }));

        it('THEN it should set `isColumnFilterVisible to false', inject(function(){
            //given
            scope.isColumnFilterVisible = true;

            //when
            scope.confirmFilterDialog({ selectedItems: [], event: mockedEvent });

            //then
            expect(scope.isColumnFilterVisible).toBe(false);
        }));

        it('THEN it should add selected values to the header data', function(){
            //given/when
            scope.confirmFilterDialog({ selectedItems: ['one', 'two'], event: mockedEvent });

            //then
            expect(headerData.columnFiltersApplied).toEqual(['one', 'two']);
        });

        it('AND ajax feature is used THEN it should fetch the data', function(){
            //given
            scope.mdtRowPaginator = true;

            spyOn(parentCtrl.mdtPaginationHelper, 'fetchPage');

            //when
            scope.confirmFilterDialog({ selectedItems: ['one', 'two'], event: mockedEvent, parentCtrl: parentCtrl });

            //then
            expect(parentCtrl.mdtPaginationHelper.fetchPage).toHaveBeenCalledWith(1);
        });

        it('AND ajax feature is not used THEN it should not fetch the data', function(){
            //given
            spyOn(parentCtrl.mdtPaginationHelper, 'fetchPage');

            //when
            scope.confirmFilterDialog({ selectedItems: ['one', 'two'], event: mockedEvent, parentCtrl: parentCtrl });

            //then
            expect(parentCtrl.mdtPaginationHelper.fetchPage).not.toHaveBeenCalled();
        });
    });

    describe('WHEN calling `generatedHeaderCellClickHandler`', function(){
        var scope;

        beforeEach(inject(function($rootScope){
            scope = $rootScope.$new();
        }));

        it('AND feature is used THEN it should set the visibility to true', inject(function($rootScope, ColumnFilterFeature){
            //given
            var headerData = {
                columnFilterIsEnabled: true
            };

            scope.isColumnFilterVisible = false;

            //when
            ColumnFilterFeature.generatedHeaderCellClickHandler(scope, headerData);

            //then
            expect(scope.isColumnFilterVisible).toBe(true);
        }));

        it('AND feature is not used THEN it must not set the visibility to true', inject(function($rootScope, ColumnFilterFeature){
            //given
            var headerData = {};

            //when
            ColumnFilterFeature.generatedHeaderCellClickHandler(scope, headerData);

            //then
            expect(scope.isColumnFilterVisible).toBeFalsy();
        }));
    });

    describe('WHEN calling `appendAppliedFiltersToCallbackArgument`', function(){
        var scope;

        beforeEach(inject(function($rootScope){
            scope = $rootScope.$new();
        }));

        it('AND feature is used THEN it should apply the filters to the callback arguments', inject(function($rootScope, ColumnFilterFeature){
            //given
            var callbackArguments = {};
            var dataStorage = {
                header: [
                    {
                        columnFilterIsEnabled: true,
                        columnFiltersApplied: ['item1', 'item2']
                    },
                    {
                        columnFilterIsEnabled: true,
                        columnFiltersApplied: ['item3', 'item4']
                    }
                ]
            };

            //when
            ColumnFilterFeature.appendAppliedFiltersToCallbackArgument(dataStorage, callbackArguments);

            //then
            expect(callbackArguments.filtersApplied).toEqual([
                [ 'item1', 'item2' ], [ 'item3', 'item4' ]
            ]);
        }));

        it('AND feature is not used THEN it should not apply any filters to the callback arguments', inject(function($rootScope, ColumnFilterFeature){
            //given
            var callbackArguments = {};
            var dataStorage = {
                header: [
                    {
                        columnFiltersApplied: ['item1', 'item2']
                    }
                ]
            };

            //when
            ColumnFilterFeature.appendAppliedFiltersToCallbackArgument(dataStorage, callbackArguments);

            //then
            expect(callbackArguments.filtersApplied).not.toBeDefined();
        }));

    });
});