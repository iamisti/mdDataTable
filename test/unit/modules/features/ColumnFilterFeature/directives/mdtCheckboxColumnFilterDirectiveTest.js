describe('CheckboxColumnFilterDirective', function(){

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
            expect(element.isolateScope().selectedItems).toEqual([]);
            expect(element.isolateScope().selectableItems).toEqual([]);
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

    describe('WHEN checking if an item is already in the selected items', function(){
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

        it('AND when passed item is not within the selected items THEN it should return false', inject(function(){
            //given
            var element = compileDirective(scope, DIRECTIVE_DEFAULT_CASE);

            //when
            var result = element.isolateScope().exists('one');

            //then
            expect(result).toEqual(false);
        }));

        it('AND when passed item is within the selected items THEN it should return true', inject(function(){
            //given
            var element = compileDirective(scope, DIRECTIVE_DEFAULT_CASE);
            element.isolateScope().selectedItems.push('two');

            //when
            var result = element.isolateScope().exists('two');

            //then
            expect(result).toEqual(true);
        }));
    });

    describe('WHEN toggle and item', function(){
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

        it('AND when passed item is not within the selected items THEN it should add to the list', inject(function(){
            //given
            var element = compileDirective(scope, DIRECTIVE_DEFAULT_CASE);

            //when
            element.isolateScope().toggle('one');

            //then
            expect(element.isolateScope().selectedItems).toEqual(['one']);
        }));

        it('AND when passed item is within the selected items THEN it should remove from the list', inject(function(){
            //given
            var element = compileDirective(scope, DIRECTIVE_DEFAULT_CASE);
            element.isolateScope().selectedItems.push('one');
            element.isolateScope().selectedItems.push('two');
            element.isolateScope().selectedItems.push('three');

            //when
            element.isolateScope().toggle('two');

            //then
            expect(element.isolateScope().selectedItems).toEqual(['one', 'three']);
        }));
    });

    describe('WHEN selecting all items', function(){
        var scope, event;

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

            event = {
                preventDefault: angular.noop
            };
        }));

        it('AND when passed item is not within the selected items THEN it should add to the list', inject(function(){
            //given
            var element = compileDirective(scope, DIRECTIVE_DEFAULT_CASE);

            //when
            element.isolateScope().selectAll(event);

            //then
            expect(element.isolateScope().selectedItems).toEqual(['one', 'two', 'three']);
        }));
    });

    describe('WHEN selecting all items', function(){
        var scope, event;

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

            event = {
                preventDefault: angular.noop
            };
        }));

        it('AND when passed item is not within the selected items THEN it should add to the list', inject(function(){
            //given
            var element = compileDirective(scope, DIRECTIVE_DEFAULT_CASE);
            element.isolateScope().selectAll(event);

            //when
            element.isolateScope().clearAll(event);

            //then
            expect(element.isolateScope().selectedItems).toEqual([]);
        }));
    });

    function compileDirective(scope, status){
        var mainElement;

        switch(status){
            case DIRECTIVE_DEFAULT_CASE:
                mainElement = _$compile('' +
                    '<mdt-checkbox-column-filter' +
                    '   confirm-callback="confirmCallback"' +
                    '   cancel-callback="cancelCallback"' +
                    '   header-row-data="headerRowData"' +
                    '</mdt-checkbox-column-filter>')(scope);
                break;
            default:
                throw Error('Not implemented case');
        }

        scope.$digest();

        return mainElement;
    }
});