describe('ChipsColumnFilterDirective', function(){

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
                    valuesProviderCallback: function(){ return $q.resolve(); }
                },
                columnSort: {}
            };
        }));

        it('THEN default values must be set', inject(function(){
            //given/when
            var element = compileDirective(scope, DIRECTIVE_DEFAULT_CASE);

            //then
            expect(element.isolateScope().availableItems).toEqual([]);
            expect(element.isolateScope().selectedItems).toEqual([]);
            expect(element.isolateScope().placeholderText).toEqual('Filter column...');
        }));

        it('AND custom placeholder must be set', inject(function(){
            //given
            scope.headerRowData.columnFilter.placeholderText = 'Search please...';

            //when
            var element = compileDirective(scope, DIRECTIVE_DEFAULT_CASE);

            //then
            expect(element.isolateScope().placeholderText).toEqual('Search please...');
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

    function compileDirective(scope, status){
        var mainElement;

        switch(status){
            case DIRECTIVE_DEFAULT_CASE:
                mainElement = _$compile('' +
                    '<mdt-chips-column-filter' +
                    '   confirm-callback="confirmCallback"' +
                    '   cancel-callback="cancelCallback"' +
                    '   header-row-data="headerRowData"' +
                    '</mdt-chips-column-filter>')(scope);
                break;
            default:
                throw Error('Not implemented case');
        }

        scope.$digest();

        return mainElement;
    }
});