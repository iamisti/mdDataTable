describe('ColumnFilterFeature', function(){

    beforeEach(module('mdtTemplates'));
    beforeEach(module('mdDataTable'));

    describe('WHEN calling `appendHeaderCellData`', function(){
        var scope;

        beforeEach(inject(function($rootScope){
            scope = $rootScope.$new();
        }));

        it('AND feature is used THEN it needs to add the feature related default variables to the passed objects', inject(function($rootScope, ColumnFilterFeature){
            //given
            scope.columnFilter = {
                valuesProviderCallback: function(){}
            };

            var objectToPass = {};

            //when
            ColumnFilterFeature.appendHeaderCellData(scope, objectToPass);

            //then
            expect(objectToPass.columnFilter).toBeDefined();
            expect(objectToPass.columnFilter.isEnabled).toBe(true);
            expect(objectToPass.columnFilter.filtersApplied).toEqual([]);
            expect(objectToPass.columnFilter.valuesProviderCallback).toEqual(scope.columnFilter.valuesProviderCallback);
            expect(objectToPass.columnFilter.valuesTransformerCallback).toEqual(undefined);
            expect(objectToPass.columnFilter.placeholderText).toEqual(undefined);
            expect(objectToPass.columnFilter.type).toEqual('chips');
            expect(objectToPass.columnFilter.isActive).toBe(false);
        }));

        it('AND feature is used THEN it needs to add the feature related variables to the passed objects', inject(function($rootScope, ColumnFilterFeature){
            //given
            scope.columnFilter = {
                valuesProviderCallback: function(){},
                valuesTransformerCallback: function(){},
                placeholderText: 'Select a value...',
                filterType: 'dropdown'
            };

            var objectToPass = {};

            //when
            ColumnFilterFeature.appendHeaderCellData(scope, objectToPass);

            //then
            expect(objectToPass.columnFilter).toBeDefined();
            expect(objectToPass.columnFilter.isEnabled).toBe(true);
            expect(objectToPass.columnFilter.filtersApplied).toEqual([]);
            expect(objectToPass.columnFilter.valuesProviderCallback).toEqual(scope.columnFilter.valuesProviderCallback);
            expect(objectToPass.columnFilter.valuesTransformerCallback).toEqual(scope.columnFilter.valuesTransformerCallback);
            expect(objectToPass.columnFilter.placeholderText).toEqual(scope.columnFilter.placeholderText);
            expect(objectToPass.columnFilter.type).toEqual(scope.columnFilter.filterType);
            expect(objectToPass.columnFilter.isActive).toBe(false);
        }));

        it('AND feature is not used THEN it must not add feature related variables to the passed objects', inject(function($rootScope, ColumnFilterFeature){
            //given
            var objectToPass = {};

            //when
            ColumnFilterFeature.appendHeaderCellData(scope, objectToPass);

            //then
            expect(objectToPass).toEqual({
                columnFilter: {
                    isEnabled: false
                }
            });
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
                columnFilter: {
                    isEnabled: true
                }
            };

            //when
            ColumnFilterFeature.initGeneratedHeaderCellContent(scope, headerData);

            //then
            expect(scope.columnFilterFeature.cancelFilterDialog).toBeDefined();
            expect(scope.columnFilterFeature.confirmFilterDialog).toBeDefined();
        }));

        it('WHEN feature is not used THEN it must not add feature related variables to the scope', inject(function($rootScope, ColumnFilterFeature){
            //given
            var headerData = {
                columnFilter: {
                    isEnabled: false
                }
            };

            //when
            ColumnFilterFeature.initGeneratedHeaderCellContent(scope, headerData);

            //then
            expect(scope.columnFilterFeature).not.toBeDefined();
        }));

        it('WHEN calling `cancelFilterDialog` THEN it should set the visibility for the filter to false', inject(function($rootScope, ColumnFilterFeature){
            //given
            scope.columnFilter = {
                valuesProviderCallback: function(){}
            };

            var objectToPass = {};
            var dataStorage = {
                header: [
                    { columnFilter: { isEnabled: false }},
                    { columnFilter: { isEnabled: true }},
                    objectToPass
                ]
            };

            var element = {
                closest: function(){
                    return {
                        css: function(){}
                    }
                }
            };

            ColumnFilterFeature.appendHeaderCellData(scope, objectToPass, dataStorage, element);
            ColumnFilterFeature.initGeneratedHeaderCellContent(scope, objectToPass);

            //when
            scope.columnFilterFeature.cancelFilterDialog({ stopPropagation: angular.noop });

            //then
            expect(objectToPass.columnFilter.isActive).toBe(false);
        }));
    });

    describe('WHEN calling `confirmFilterDialog`', function(){
        var scope;
        var headerData;
        var mockedEvent = { stopPropagation: angular.noop };
        var parentCtrl;

        beforeEach(inject(function($rootScope, ColumnFilterFeature, PaginatorTypeProvider){
            scope = $rootScope.$new();
            scope.columnFilter = {
                valuesProviderCallback: function(){}
            };

            headerData = {
                columnFilter: {
                    isEnabled: true
                }
            };

            var dataStorage = {
                header: [
                    { columnFilter: { isEnabled: false }},
                    { columnFilter: { isEnabled: true }},
                    headerData
                ]
            };

            parentCtrl = {
                mdtPaginationHelper: {
                    paginatorType: PaginatorTypeProvider.AJAX,
                    getFirstPage: function(){}
                }
            };

            var element = {
                closest: function(){
                    return {
                        css: function(){}
                    }
                }
            };

            ColumnFilterFeature.appendHeaderCellData(scope, headerData, dataStorage, element);
            ColumnFilterFeature.initGeneratedHeaderCellContent(scope, headerData, parentCtrl.mdtPaginationHelper, dataStorage);
        }));

        it('THEN it should set column visibility must be set to false', inject(function(){
            //given
            headerData.columnFilter.isActive = true;

            //when
            scope.columnFilterFeature.confirmFilterDialog({ selectedItems: [], event: mockedEvent });

            //then
            expect(headerData.columnFilter.isActive).toBe(false);
        }));

        it('THEN it should add selected values to the header data', function(){
            //given/when
            scope.columnFilterFeature.confirmFilterDialog({ selectedItems: ['one', 'two'], event: mockedEvent });

            //then
            expect(headerData.columnFilter.filtersApplied).toEqual(['one', 'two']);
        });

        it('AND ajax feature is used THEN it should fetch the data', function(){
            //given
            scope.mdtRowPaginator = true;

            spyOn(parentCtrl.mdtPaginationHelper, 'getFirstPage');

            //when
            scope.columnFilterFeature.confirmFilterDialog({ selectedItems: ['one', 'two'], event: mockedEvent, parentCtrl: parentCtrl });

            //then
            expect(parentCtrl.mdtPaginationHelper.getFirstPage).toHaveBeenCalled();
        });

        it('AND ajax feature is not used THEN it should not fetch the data', inject(function(PaginatorTypeProvider){
            //given
            parentCtrl.mdtPaginationHelper.paginatorType = PaginatorTypeProvider.ARRAY;
            spyOn(parentCtrl.mdtPaginationHelper, 'getFirstPage');

            //when
            scope.columnFilterFeature.confirmFilterDialog({ selectedItems: ['one', 'two'], event: mockedEvent, parentCtrl: parentCtrl });

            //then
            expect(parentCtrl.mdtPaginationHelper.getFirstPage).not.toHaveBeenCalled();
        }));
    });

    describe('WHEN calling `generatedHeaderCellClickHandler`', function(){
        var scope;
        var headerData;
        var parentCtrl;

        beforeEach(inject(function($rootScope, ColumnFilterFeature){
            scope = $rootScope.$new();
            scope.columnFilter = {
                valuesProviderCallback: function(){}
            };

            headerData = {
                columnFilter: {
                    isEnabled: true
                }
            };

            var dataStorage = {
                header: [
                    { columnFilter: { isEnabled: false }},
                    { columnFilter: { isEnabled: true }},
                    headerData
                ]
            };

            parentCtrl = {
                mdtPaginationHelper: {
                    fetchPage: function(){}
                }
            };

            var element = {
                closest: function(){
                    return {
                        css: function(){}
                    }
                }
            };

            ColumnFilterFeature.appendHeaderCellData(scope, headerData, dataStorage, element);
        }));

        it('AND feature is used THEN it should set the visibility to true', inject(function(ColumnFilterFeature){
            //given
            headerData.columnFilter.isEnabled = true;
            headerData.columnFilter.isActive = false;

            //when
            ColumnFilterFeature.generatedHeaderCellClickHandler(scope, headerData);

            //then
            expect(headerData.columnFilter.isActive).toBe(true);
        }));

        it('AND feature is not used THEN it must not set the visibility to true', inject(function($rootScope, ColumnFilterFeature){
            //given
            headerData.columnFilter.isEnabled = false;

            //when
            ColumnFilterFeature.generatedHeaderCellClickHandler(scope, headerData);

            //then
            expect(headerData.columnFilter.isActive).toBe(false);
        }));
    });

    describe('WHEN calling `appendAppliedFiltersToCallbackArgument`', function(){
        var scope;

        beforeEach(inject(function($rootScope){
            scope = $rootScope.$new();
        }));

        it('AND feature is used THEN it should apply the filters to the callback arguments', inject(function($rootScope, ColumnFilterFeature){
            //given
            var callbackArguments = {
                options: {}
            };
            var dataStorage = {
                header: [
                    {
                        columnFilter: {
                            isEnabled: true,
                            filtersApplied: ['item1', 'item2']
                        }
                    },
                    {
                        columnFilter: {
                            isEnabled: true,
                            filtersApplied: ['item3', 'item4']
                        }
                    }
                ]
            };

            //when
            ColumnFilterFeature.appendAppliedFiltersToCallbackArgument(dataStorage, callbackArguments);

            //then
            expect(callbackArguments.options.columnFilter).toEqual([
                [ 'item1', 'item2' ], [ 'item3', 'item4' ]
            ]);
        }));

        it('AND feature is not used THEN it should not apply any filters to the callback arguments', inject(function($rootScope, ColumnFilterFeature){
            //given
            var callbackArguments = {
                options: {}
            };
            var dataStorage = {
                header: [
                    {
                        columnFilter: {
                            filtersApplied: ['item1', 'item2']
                        }
                    }
                ]
            };

            //when
            ColumnFilterFeature.appendAppliedFiltersToCallbackArgument(dataStorage, callbackArguments);

            //then
            expect(callbackArguments.options.columnFilter).not.toBeDefined();
        }));

    });
});