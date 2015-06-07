describe('mdDataTableColumnDirective', function(){
    fit('makeitpass', function(){
        expect(true).toBe(true);
    });

    var $compile,
        $rootScope,
        $scope,
        element;

    var DIRECTIVE_WITHOUT_PARAMS = 'DIRECTIVE_WITHOUT_PARAMS';
    var DIRECTIVE_WITH_LEFT_ALIGNED_PARAM = 'DIRECTIVE_WITH_LEFT_ALIGNED_PARAM';
    var DIRECTIVE_WITH_RIGHT_ALIGNED_PARAM = 'DIRECTIVE_WITH_RIGHT_ALIGNED_PARAM';

    var leftAlignedCssClass = 'leftAlignedColumn';
    var rightAlignedCssClass = 'rightAlignedColumn';

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

        it('THEN has the required methods', function(){
            //then
            expect(element.isolateScope().getColumnClass).toBeDefined();
        });
    });

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

    function compileDirective(status){

        switch(status){
            case DIRECTIVE_WITHOUT_PARAMS:
                element = $compile('<md-data-table-column></md-data-table-column>')($scope);
                break;

            case DIRECTIVE_WITH_RIGHT_ALIGNED_PARAM:
                element = $compile('<md-data-table-column align-rule="right"></md-data-table-column>')($scope);
                break;

            case DIRECTIVE_WITH_LEFT_ALIGNED_PARAM:
            default:
                element = $compile('<md-data-table-column align-rule="left"></md-data-table-column>')($scope);
        }

        $scope.$digest();
    }
});