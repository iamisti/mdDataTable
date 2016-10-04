/*
describe('CheckboxColumnFilterDirective', function(){

    var DIRECTIVE_DEFAULT_CASE = 'DIRECTIVE_DEFAULT_CASE';
    var _$compile;

    beforeEach(module('mdtTemplates'));
    beforeEach(module('mdDataTable'));

    beforeEach(inject(function($compile, $httpBackend){
        _$compile = $compile;

        $httpBackend.whenGET('/main/templates/mdtCheckboxColumnFilter.html').respond('');
    }));

    describe('WHEN calling ``', function(){
        var scope;

        beforeEach(inject(function($rootScope){
            scope = $rootScope.$new();
        }));

        it('AND ', inject(function($q){
            //given
            scope.a = function(){};
            scope.b = function(){};
            scope.c = {
                columnFilter: {
                    filtersApplied: [],
                    valuesProviderCallback: function(){ return $q.resolve();}
                }
            };

            compileDirective(scope, DIRECTIVE_DEFAULT_CASE);
        }));
    });

    function compileDirective(scope, status){
        var mainElement;

        switch(status){
            case DIRECTIVE_DEFAULT_CASE:
                mainElement = _$compile('' +
                    '<mdt-checkbox-column-filter' +
                    '   confirm-callback="a"' +
                    '   cancel-callback="b"' +
                    '   header-row-data="c"' +
                    '</mdt-checkbox-column-filter>')(scope);
                break;
            default:
                throw Error('Not implemented case');
        }

        scope.$digest();

        return mainElement;
    }
});
*/