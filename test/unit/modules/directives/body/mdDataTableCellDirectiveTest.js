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
            //given/when
            compileDirective();
        });

        it('THEN it should have the required methods', function(){

            //then
            expect(elementScope.getColumnAlignClass).toBeDefined();
            expect(elementScope.getCellValue).toBeDefined();
        });
    });

    function compileDirective(status){
        var mainElement;

        switch(status){
            case DIRECTIVE_DEFAULT_CASE:
            default:
                mainElement = $compile('' +
                    '<md-data-table>' +
                    '   <md-data-table-header-row>' +
                    '       <md-data-table-column>A Column</md-data-table-column>' +
                    '   </md-data-table-header-row>' +
                    '   <md-data-table-row>' +
                    '       <md-data-table-cell>cell</md-data-table-cell>' +
                    '   </md-data-table-row>' +
                    '</md-data-table>')($scope);
        }

        $scope.$digest();

        elementScope = mainElement.find('tr td.column .ng-scope').scope();
        element = mainElement.find('tr.column');
    }
});