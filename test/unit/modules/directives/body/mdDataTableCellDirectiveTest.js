xdescribe('mdtColumnDirective', function(){
    var $compile,
        $rootScope,
        $scope,
        element,
        elementScope;

    var DIRECTIVE_DEFAULT_CASE = 'DIRECTIVE_DEFAULT_CASE';

    beforeEach(module('mdtTemplates'));
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

        xit('THEN it should have the required methods', function(){

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
                    '<mdt-table>' +
                    '   <mdt-header-row>' +
                    '       <mdt-column>A Column</mdt-column>' +
                    '   </mdt-header-row>' +
                    '   <mdt-row>' +
                    '       <mdt-cell>cell</mdt-cell>' +
                    '   </mdt-row>' +
                    '</mdt-table>')($scope);
        }

        $scope.$digest();

        elementScope = mainElement.find('tr td.column .ng-scope').scope();
        element = mainElement.find('tr.column');
    }
});