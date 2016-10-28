describe('DropdownColumnFilterDirective', function(){

    var DIRECTIVE_DEFAULT_CASE = 'DIRECTIVE_DEFAULT_CASE';
    var _$compile;

    beforeEach(module('mdtTemplates'));
    beforeEach(module('mdDataTable'));

    beforeEach(inject(function($compile, ColumnFilterFeature){
        _$compile = $compile;

        spyOn(ColumnFilterFeature, 'positionColumnFilterBox');
    }));

    describe('WHEN initializing', function(){
        var scope;

        beforeEach(inject(function($q, $rootScope){
            scope = $rootScope.$new();

            scope.confirmCallback = function(){};
            scope.cancelCallback = function(){};
            scope.headerRowData = {
                columnFilter: {
                    filtersApplied: [],
                    valuesProviderCallback: function(){ return $q.resolve();}
                },
                columnSort: {}
            };
        }));

        it('THEN default values must be set', inject(function(){
            //given/when
            var element = compileDirective(scope, DIRECTIVE_DEFAULT_CASE);

            //then
            expect(element.isolateScope().selectableItems).toEqual([]);
            expect(element.isolateScope().selectedItems).toEqual([]);
        }));

        it('AND selectable items must be filled', inject(function($q){
            //given
            scope.headerRowData.columnFilter = {
                filtersApplied: [],
                valuesProviderCallback: function(){ return $q.resolve(['one', 'two', 'three']); }
            };

            //when
            var element = compileDirective(scope, DIRECTIVE_DEFAULT_CASE);

            //then
            expect(element.isolateScope().selectableItems).toEqual(['one', 'two', 'three']);
        }));

        it('WHEN selected items are defined THEN it must be set', inject(function($q){
            //given
            scope.headerRowData.columnFilter = {
                filtersApplied: ['two'],
                valuesProviderCallback: function(){ return $q.resolve(['one', 'two', 'three']); }
            };

            //when
            var element = compileDirective(scope, DIRECTIVE_DEFAULT_CASE);

            //then
            expect(element.isolateScope().oneSelectedItem).toEqual('two');
        }));
    });

    describe('WHEN transforming items', function(){
        var scope;

        beforeEach(inject(function($q, $rootScope){
            scope = $rootScope.$new();

            scope.confirmCallback = function(){};
            scope.cancelCallback = function(){};
            scope.headerRowData = {
                columnFilter: {
                    filtersApplied: [],
                    valuesProviderCallback: function(){ return $q.resolve();}
                },
                columnSort: {}
            };
        }));

        it('AND transform function were not provided THEN it needs to return with the item itself', inject(function(){
            //given
            var element = compileDirective(scope, DIRECTIVE_DEFAULT_CASE);

            //when
            var result = element.isolateScope().transformChip('Ice Cream Sandwitch');

            //then
            expect(result).toEqual('Ice Cream Sandwitch');
        }));

        it('AND transform function were provided THEN it needs to return with the transformed value of the item', inject(function(){
            //given
            scope.headerRowData.columnFilter.valuesTransformerCallback = function(item){
                return item.name;
            };

            var element = compileDirective(scope, DIRECTIVE_DEFAULT_CASE);

            //when
            var result = element.isolateScope().transformChip({name: 'Ice Cream Sandwitch'});

            //then
            expect(result).toEqual('Ice Cream Sandwitch');
        }));
    });

    describe('WHEN selecting an item', function(){
        var scope;

        beforeEach(inject(function($q, $rootScope){
            scope = $rootScope.$new();

            scope.confirmCallback = function(){};
            scope.cancelCallback = function(){};
            scope.headerRowData = {
                columnFilter: {
                    filtersApplied: [],
                    valuesProviderCallback: function(){ return $q.resolve(['one', 'two', 'three']);}
                },
                columnSort: {}
            };
        }));

        it('THEN if value is undefined THEN it should not set', inject(function(){
            //given
            var element = compileDirective(scope, DIRECTIVE_DEFAULT_CASE);

            //when
            element.isolateScope().selectedItem();

            //then
            expect(element.isolateScope().selectedItems).toEqual([]);
        }));

        it('THEN if value is not undefined THEN it should set the selected items', inject(function(){
            //given
            var element = compileDirective(scope, DIRECTIVE_DEFAULT_CASE);

            element.isolateScope().oneSelectedItem = 'two';

            //when
            element.isolateScope().selectedItem();

            //then
            expect(element.isolateScope().selectedItems).toEqual(['two']);
        }));
    });

    function compileDirective(scope, status){
        var mainElement;

        switch(status){
            case DIRECTIVE_DEFAULT_CASE:
                mainElement = _$compile('' +
                    '<mdt-dropdown-column-filter' +
                    '   confirm-callback="confirmCallback"' +
                    '   cancel-callback="cancelCallback"' +
                    '   header-row-data="headerRowData"' +
                    '</mdt-dropdown-column-filter>')(scope);
                break;
            default:
                throw Error('Not implemented case');
        }

        scope.$digest();

        return mainElement;
    }
});