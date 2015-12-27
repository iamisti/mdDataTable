xdescribe('mdtColumnDirective', function(){
    var $compile,
        $rootScope,
        $scope,
        element,
        elementScope;

    var DIRECTIVE_DEFAULT_CASE = 'DIRECTIVE_DEFAULT_CASE';
    var DIRECTIVE_LEFT_ALIGNED = 'DIRECTIVE_LEFT_ALIGNED';
    var DIRECTIVE_RIGHT_ALIGNED = 'DIRECTIVE_RIGHT_ALIGNED';
    var DIRECTIVE_MULTI_COLUMN = 'DIRECTIVE_MULTI_COLUMN';

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

        it('THEN it should have the required methods', function(){
            //then
            expect(elementScope.direction).not.toBeDefined();
            expect(elementScope.isSorted).toBeDefined();
            expect(elementScope.clickHandler).toBeDefined();
            expect(elementScope.isColumnLeftAligned).toBeDefined();
            expect(elementScope.isColumnRightAligned).toBeDefined();
            expect(elementScope.isSortingEnabled).toBeDefined();
            expect(elementScope.columnAlignClass).toBeDefined();
        });
    });

    describe('WHEN `isSorted` called', function(){
        beforeEach(function(){
            compileDirective();
        });

        it('THEN it should return false', function(){
            //given/when
            var isSortedResult = elementScope.isSorted();

            //then
            expect(isSortedResult).toBe(false);
        });

        it('AND sorting is disabled but somehow the column was sorted THEN it should return false', function(){
            //given
            spyOn(elementScope, 'isSortingEnabled').and.callFake(function(){
                return false;
            });

            //when
            element.click();

            //then;
            expect(elementScope.isSorted()).toBe(false);
        });

        it('AND the column was sorted THEN it should return true', function(){
            //given
            spyOn(elementScope, 'isSortingEnabled').and.callFake(function(){
                return true;
            });

            //when
            element.click();

            //then;
            expect(elementScope.isSorted()).toBe(true);
        });
    });

    describe('WHEN `clickHandler` called', function(){
        beforeEach(function(){
            compileDirective(DIRECTIVE_MULTI_COLUMN);
        });

        it('AND sorting is disabled THEN it should not set the direction', function(){
            //given
            spyOn(elementScope, 'isSortingEnabled').and.callFake(function(){
                return false;
            });

            //when
            element.first().click();

            //then;
            expect(elementScope.direction).not.toBeDefined();
        });

        it('AND sorting is enabled THEN it should set the direction', function(){
            //given
            spyOn(elementScope, 'isSortingEnabled').and.callFake(function(){
                return true;
            });

            //when
            element.first().click();

            //then;
            expect(elementScope.direction).toBeDefined();
        });

        it('AND sorting is enabled THEN it should set the direction to ascending (-1) on first click', function(){
            //given
            spyOn(elementScope, 'isSortingEnabled').and.callFake(function(){
                return true;
            });

            //when
            element.first().click();

            //then;
            expect(elementScope.direction).toBe(-1);
        });

        it('AND sorting is enabled THEN it should set the direction to descending (1) on second click', function(){
            //given
            spyOn(elementScope, 'isSortingEnabled').and.callFake(function(){
                return true;
            });

            //when
            element.first().click();
            element.first().click();

            //then;
            expect(elementScope.direction).toBe(1);
        });

        it('AND sorting is enabled THEN it should set the direction to ascending (-1) when switching sort column after second click', function(){
            
            var lastElementScope = element.last().find('.ng-scope').scope().$parent;
            //given
            spyOn(elementScope, 'isSortingEnabled').and.callFake(function(){
                return true;
            });

            spyOn(lastElementScope, 'isSortingEnabled').and.callFake(function(){
                return true;
            });


            //when
            element.first().click();
            element.first().click();
            element.last().click();

            //then;
            expect(lastElementScope.direction).toBe(-1);
        });
    });

    describe('WHEN directive is left aligned', function(){
        beforeEach(function(){
            compileDirective(DIRECTIVE_LEFT_ALIGNED);
        });

        it('THEN `isColumnLeftAligned` should return true', function(){
            expect(elementScope.isColumnLeftAligned()).toBe(true);
        });

        it('THEN `isColumnRightAligned` should return false', function(){
            expect(elementScope.isColumnRightAligned()).toBe(false);
        });
    });

    describe('WHEN directive is right aligned', function(){
        beforeEach(function(){
            compileDirective(DIRECTIVE_RIGHT_ALIGNED);
        });

        it('THEN `isColumnLeftAligned` should return false', function(){
            expect(elementScope.isColumnLeftAligned()).toBe(false);
        });

        it('THEN `isColumnRightAligned` should return true', function(){
            expect(elementScope.isColumnRightAligned()).toBe(true);
        });
    });

    function compileDirective(status){
        var mainElement;

        switch(status){
            case DIRECTIVE_LEFT_ALIGNED:
                mainElement = $compile('' +
                    '<mdt-table>' +
                    '   <mdt-header-row>' +
                    '       <mdt-column align-rule="left">A Column</mdt-column>' +
                    '   </mdt-header-row>' +
                    '</mdt-table>')($scope);
                break;

            case DIRECTIVE_RIGHT_ALIGNED:
                mainElement = $compile('' +
                    '<mdt-table>' +
                    '   <mdt-header-row>' +
                    '       <mdt-column align-rule="right">A Column</mdt-column>' +
                    '   </mdt-header-row>' +
                    '</mdt-table>')($scope);
                break;

            case DIRECTIVE_MULTI_COLUMN:
                mainElement = $compile('' +
                    '<mdt-table>' +
                    '   <mdt-header-row>' +
                    '       <mdt-column>A Column</mdt-column>' +
                    '       <mdt-column>Another Column</mdt-column>' +
                    '   </mdt-header-row>' +
                    '</mdt-table>')($scope);
                break;
            
            case DIRECTIVE_DEFAULT_CASE:
            default:
                mainElement = $compile('' +
                    '<mdt-table>' +
                    '   <mdt-header-row>' +
                    '       <mdt-column>A Column</mdt-column>' +
                    '   </mdt-header-row>' +
                    '</mdt-table>')($scope);
        }

        $scope.$digest();

        elementScope = mainElement.find('.ng-scope').scope().$parent;
        element = mainElement.find('th.column');
    }
});