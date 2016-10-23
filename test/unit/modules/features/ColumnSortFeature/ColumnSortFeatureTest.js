describe('ColumnSortFeature', function(){

    beforeEach(module('mdtTemplates'));
    beforeEach(module('mdDataTable'));

    describe('WHEN calling `appendHeaderCellData`', function(){
        var scope;

        beforeEach(inject(function($rootScope){
            scope = $rootScope.$new();
        }));

        it('AND feature is used THEN it needs to add the feature related default variables to the passed objects', inject(function(ColumnSortFeature){
            //given
            var cellDataToStore = {};
            var columnSortOptions = true;

            //when
            ColumnSortFeature.appendHeaderCellData(cellDataToStore, columnSortOptions);

            //then
            expect(cellDataToStore.columnSort).toBeDefined();
            expect(cellDataToStore.columnSort.isEnabled).toBe(true);
            expect(cellDataToStore.columnSort.sort).toBe(false);
            expect(cellDataToStore.columnSort.comparator).toBe(false);
        }));

        it('AND feature is used AND comparator is defined THEN it needs to add the feature related default variables to the passed objects', inject(function(ColumnSortFeature){
            //given
            var cellDataToStore = {};
            var columnSortOptions = {
                comparator: function (){}
            };

            //when
            ColumnSortFeature.appendHeaderCellData(cellDataToStore, columnSortOptions);

            //then
            expect(cellDataToStore.columnSort).toBeDefined();
            expect(cellDataToStore.columnSort.isEnabled).toBe(true);
            expect(cellDataToStore.columnSort.sort).toBe(false);
            expect(cellDataToStore.columnSort.comparator).toEqual(columnSortOptions.comparator);
        }));

        it('AND feature is not used THEN it must not add the feature related default variables to the passed objects', inject(function(ColumnSortFeature){
            //given
            var cellDataToStore = {};

            //when
            ColumnSortFeature.appendHeaderCellData(cellDataToStore);

            //then
            expect(cellDataToStore.columnSort).toBeDefined();
            expect(cellDataToStore.columnSort.isEnabled).toBe(false);
            expect(cellDataToStore.columnSort.sort).not.toBeDefined();
        }));
    });
});