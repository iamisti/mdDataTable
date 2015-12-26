xdescribe('mdtTableDirective', function(){
    var $compile,
        $rootScope,
        $scope,
        element,
        elementController,
        elementIsolatedScope;

    var DIRECTIVE_DEFAULT_CASE = 'DIRECTIVE_DEFAULT_CASE';
    var DIRECTIVE_SELECTABLE_ROWS_TRUE = 'DIRECTIVE_SELECTABLE_ROWS_TRUE';
    var DIRECTIVE_SELECTABLE_ROWS_FALSE = 'DIRECTIVE_SELECTABLE_ROWS_FALSE';
    var DIRECTIVE_SORTABLE_COLUMNS_TRUE = 'DIRECTIVE_SORTABLE_COLUMNS_TRUE';
    var DIRECTIVE_SORTABLE_COLUMNS_FALSE = 'DIRECTIVE_SORTABLE_COLUMNS_FALSE';
    var DIRECTIVE_WITH_COMPILED_CONTENT = 'DIRECTIVE_WITH_COMPILED_CONTENT';

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

        it('THEN it should have the shared required methods', function(){
            //then
            expect(elementController.isSelectableRows).toBeDefined();
            expect(elementController.isSortingEnabled).toBeDefined();
            expect(elementController.sortByColumn).toBeDefined();
            expect(elementController.getSortedColumnIndex).toBeDefined();

            expect(elementController.addRowData).toBeDefined();
            expect(elementController.getRowData).toBeDefined();
            expect(elementController.getRowOptions).toBeDefined();
            expect(elementController.setAllRowsSelected).toBeDefined();

            expect(elementController.increaseIndex).toBeDefined();
            expect(elementController.getIndex).toBeDefined();

            expect(elementController.addColumnOptions).toBeDefined();
            expect(elementController.getColumnOptions).toBeDefined();
        });

        it('AND it should have the required methods', function(){
            expect(elementIsolatedScope.isAnyRowSelected).toBeDefined();
        });
    });

    describe('WHEN calling `isSelectableRows`', function(){
        it('THEN depending the attribute it should return true', function(){
            //given/when
            compileDirective(DIRECTIVE_SELECTABLE_ROWS_TRUE);

            //then
            expect(elementController.isSelectableRows()).toBe(true);
        });

        it('AND depending the attribute it should return false', function(){
            //given/when
            compileDirective(DIRECTIVE_SELECTABLE_ROWS_FALSE);

            //then
            expect(elementController.isSelectableRows()).toBe(false);
        });
    });

    describe('WHEN calling `isSortingEnabled`', function(){
        it('THEN depending the attribute it should be true', function(){
            //given/when
            compileDirective(DIRECTIVE_SORTABLE_COLUMNS_TRUE);

            //then
            expect(elementController.isSortingEnabled()).toBe(true);
        });

        it('AND depending the attribute it should be false', function(){
            //given/when
            compileDirective(DIRECTIVE_SORTABLE_COLUMNS_FALSE);

            //then
            expect(elementController.isSortingEnabled()).toBe(false);
        });
    });

    describe('WHEN calling `sortByColumn`', function(){
        it('THEN `tableDataStorageService.sortByColumnIndex` should be called', function(){
            //given
            compileDirective();

            //when
            elementController.sortByColumn(0);

            //then
            expect(elementIsolatedScope.tableDataStorageService.sortByColumnIndex).toHaveBeenCalledWith(0, undefined);
        });
    });

    describe('WHEN calling `sortByColumn` on the same column index twice', function(){
        beforeEach(function(){
            //given
            compileDirective();

            elementController.sortByColumn(3);
        });

        it('THEN `tableDataStorageService.sortByColumnIndex` should be called only once', function(){
            //when
            elementController.sortByColumn(3);

            //then
            expect(elementIsolatedScope.tableDataStorageService.sortByColumnIndex.calls.count()).toEqual(1);
        });

        it('THEN `tableDataStorageService.reverseRows` should be called', function(){
            //when
            elementController.sortByColumn(3);

            //then
            expect(elementIsolatedScope.tableDataStorageService.reverseRows).toHaveBeenCalled();
        });
    });

    describe('WHEN calling `getSortedColumnByIndex`', function(){
        beforeEach(function(){
            //given
            compileDirective();

            elementController.sortByColumn(4);
        });

        it('THEN `tableDataStorageService.getSortedColumnByIndex` should return the previously sortedd column index', function(){
            //when
            var sortedcolumnIndex = elementController.getSortedColumnIndex();

            //then
            expect(sortedcolumnIndex).toEqual(4);
        });
    });

    describe('WHEN created AND transcluded content has compiled', function(){
        beforeEach(function(){
            //given/when
            compileDirective(DIRECTIVE_WITH_COMPILED_CONTENT);
        });

        //TOOD: do not parse in the right way atm
        xit('THEN it should parse the content into the table header', function(){
            //then
            expect(element.find('table thead').length).toEqual(1);
        });

        //TOOD: do not parse in the right way atm
        it('THEN it should parse the content into the table body', function(){
            //then
            expect(element.find('table tbody').length).toEqual(1);
        });
    });

    function compileDirective(status){
        switch(status){
            case DIRECTIVE_SELECTABLE_ROWS_TRUE:
                element = $compile('<mdt-table selectable-rows="true"></mdt-table>')($scope);
                break;
            case DIRECTIVE_SELECTABLE_ROWS_FALSE:
                element = $compile('<mdt-table selectable-rows="false"></mdt-table>')($scope);
                break;
            case DIRECTIVE_SORTABLE_COLUMNS_TRUE:
                element = $compile('<mdt-table sortable-columns="true"></mdt-table>')($scope);
                break;
            case DIRECTIVE_SORTABLE_COLUMNS_FALSE:
                element = $compile('<mdt-table sortable-columns="false"></mdt-table>')($scope);
                break;
            case DIRECTIVE_WITH_COMPILED_CONTENT:
                element = $compile('' +
                    '<mdt-table>' +
                    '   <tr class="theadTrRow">' +
                    '       <th>headrow</th>' +
                    '   </tr>' +
                    '   <tr>' +
                    '       <td>bodyrow</td>' +
                    '   </tr>' +
                    '</mdt-table>')($scope);
                break;
            case DIRECTIVE_DEFAULT_CASE:
            default:
                element = $compile('<mdt-table></mdt-table>')($scope);
        }

        $scope.$digest();

        elementController = element.controller('mdtTable');
        elementIsolatedScope = element.isolateScope();

        spyOn(elementIsolatedScope.tableDataStorageService, 'sortByColumnIndex');
        spyOn(elementIsolatedScope.tableDataStorageService, 'reverseRows');
    }
});