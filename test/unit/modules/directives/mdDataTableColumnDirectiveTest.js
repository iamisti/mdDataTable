describe('mdDataTableColumnDirective', function(){
    var $compile,
        $rootScope,
        $scope,
        element,
        elementScope;

    var DIRECTIVE_DEFAULT_CASE = 'DIRECTIVE_DEFAULT_CASE';

    beforeEach(module('templates'));
    beforeEach(module('mdDataTable'));

    beforeEach(inject(function($injector){
        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');

        $scope = $rootScope.$new();
    }));

    describe('WHEN created', function(){
        beforeEach(function(){
            //given

            //when
            compileDirective();
        });

        it('THEN it should have the required methods', function(){
            //then
            expect(elementScope.getColumnAlignClass).toBeDefined();
            expect(elementScope.ColumnOptionProvider).toBeDefined();
            expect(elementScope.columnOptions).toBeDefined();
            expect(elementScope.direction).toBeDefined();
            expect(elementScope.isSorted).toBeDefined();
            expect(elementScope.clickHandler).toBeDefined();
            expect(elementScope.isSortableColumns).toBeDefined();
        });
    });

    function compileDirective(status){
        switch(status){
            case DIRECTIVE_DEFAULT_CASE:
            default:
                element = $compile('' +
                    '<md-data-table>' +
                    '   <md-data-table-header-row>' +
                    '       <md-data-table-column align-rule="left">A Column</md-data-table-column>' +
                    '   </md-data-table-header-row>' +
                    '</md-data-table>')($scope);
        }

        $scope.$digest();

        elementScope = element.find('.ng-scope').scope().$parent;
    }
});