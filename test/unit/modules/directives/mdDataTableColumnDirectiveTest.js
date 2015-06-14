xdescribe('mdDataTableColumnDirective', function(){
    var $compile,
        $rootScope,
        $scope,
        $controller,
        element;

    var DIRECTIVE_DEFAULT_CASE = 'DIRECTIVE_DEFAULT_CASE';

    beforeEach(module('templates'));
    beforeEach(module('mdDataTable'));

    beforeEach(inject(function($injector){
        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');

        $scope = $rootScope.$new();
    }));

    xdescribe('WHEN created', function(){
        beforeEach(function(){
            //given

            //when
            compileDirective();
        });

        it('THEN it should have the required methods', function(){
            //then
            console.log(element.isolateScope().getColumnAlignClass);
            console.log(element.isolateScope().direction);

            expect(element.isolateScope().getColumnAlignClass).toBeDefined();
        });
    });
/*
    describe('WHEN calling getColumnClass AND the scope.alignRule is undefined', function(){
        it('THEN it should return the left aligned value', function(){
            //given
            compileDirective(DIRECTIVE_WITHOUT_PARAMS);

            //when
            var resultedClass = element.isolateScope().getColumnClass();

            expect(resultedClass).toEqual(leftAlignedCssClass);
        });
    });

    describe('WHEN calling getColumnClass AND the scope.alignRule is left', function(){
        it('THEN it should return the left aligned value', function(){
            //given
            compileDirective(DIRECTIVE_WITH_LEFT_ALIGNED_PARAM);

            //when
            var resultedClass = element.isolateScope().getColumnClass();

            expect(resultedClass).toEqual(leftAlignedCssClass);
        });
    });

    describe('WHEN calling getColumnClass AND the scope.alignRule is right', function(){
        it('THEN it should return the right aligned value', function(){
            //given
            compileDirective(DIRECTIVE_WITH_RIGHT_ALIGNED_PARAM);

            //when
            var resultedClass = element.isolateScope().getColumnClass();

            expect(resultedClass).toEqual(rightAlignedCssClass);
        });
    });
*/
    function compileDirective(status){
        switch(status){
            case DIRECTIVE_DEFAULT_CASE:
            default:
                element = $compile('' +
                    '<md-data-table>' +
                    '   <md-data-table-header-row>' +
                    '       <md-data-table-column align-rule="left">A Column</md-data-table-column>' +
                    '   <md-data-table-header-row>' +
                    '</md-data-table>')($scope);
                console.log('asdf')
                console.log(element.children().isolateScope());
                console.log('asdf')
        }

        $scope.$digest();
    }
});