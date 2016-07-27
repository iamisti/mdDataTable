describe('TableDataStorageFactory', function(){

    var TableDataStorageFactory,
        tableDataStorageService,
        rowData = ['Some', 3, 56, '1%'],
        rowId = 324,
        $log;

    beforeEach(module('mdtTemplates'));
    beforeEach(module('mdDataTable'));

    beforeEach(inject(function($injector){
        TableDataStorageFactory = $injector.get('TableDataStorageFactory');
        $log = $injector.get('$log');

        spyOn($log, 'error');
    }));

    it('WHEN created it should has the required function', function(){
        expect(TableDataStorageFactory.getInstance).toBeDefined();
    });

    it('WHEN calling `getInstance` it should have the object with the required functions', function(){
        //given
        var tableDataStorageService = TableDataStorageFactory.getInstance();

        expect(tableDataStorageService.addRowData).toBeDefined();
        expect(tableDataStorageService.getRowData).toBeDefined();
        expect(tableDataStorageService.getRowOptions).toBeDefined();
        expect(tableDataStorageService.setAllRowsSelected).toBeDefined();
        expect(tableDataStorageService.reverseRows).toBeDefined();
        expect(tableDataStorageService.sortByColumnIndex).toBeDefined();
        expect(tableDataStorageService.isAnyRowSelected).toBeDefined();
        expect(tableDataStorageService.getNumberOfSelectedRows).toBeDefined();
        expect(tableDataStorageService.deleteSelectedRows).toBeDefined();
    });

    describe('WHEN calling `addRowData`', function(){
        describe('without params', function(){
            beforeEach(function(){
                //given
                tableDataStorageService = TableDataStorageFactory.getInstance();

                //when
                tableDataStorageService.addRowData();
            });

            it('THEN it should call error log', function(){
                //then
                expect($log.error).toHaveBeenCalled();
            });

            it('AND it should not add anything to the storage', function(){
                //then
                expect(tableDataStorageService.storage.length).toEqual(0);
            });
        });

        describe('with non-array rowData', function(){
            var notArrayRowData = 'not an array';

            beforeEach(function(){
                //given
                tableDataStorageService = TableDataStorageFactory.getInstance();
                tableDataStorageService.addRowData(rowId, notArrayRowData);
            });

            it('THEN it should call error log', function(){
                //then
                expect($log.error).toHaveBeenCalled();
            });

            it('THEN it should not add anything to the storage', function(){
                //then
                expect(tableDataStorageService.storage.length).toEqual(0);
            });
        });

        describe('with params', function(){
            beforeEach(function(){
                //given
                tableDataStorageService = TableDataStorageFactory.getInstance();

                //when
                tableDataStorageService.addRowData(rowId, rowData);
            });

            it('THEN it should add it to the storage', function(){
                expect(tableDataStorageService.getRowData(0)).toEqual(rowData);
            });
        });
    });

    describe('WHEN calling `getRowData`', function(){
        describe('AND index is not exists', function(){
            beforeEach(function(){
                //given
                tableDataStorageService = TableDataStorageFactory.getInstance();
                tableDataStorageService.addRowData(rowId, rowData);

                tableDataStorageService.getRowData(4);
            });

            it('THEN it should call error log', function(){
                //then
                expect($log.error).toHaveBeenCalled();
            });
        });

        describe('AND index is exists', function(){
            beforeEach(function(){
                //given
                tableDataStorageService = TableDataStorageFactory.getInstance();
                tableDataStorageService.addRowData(rowId, rowData);
            });

            it('THEN it should return with the row data', function(){
                //when
                expect(tableDataStorageService.getRowData(0)).toEqual(rowData);
            });
        });
    });

    describe('WHEN calling `getRowOptions`', function(){
        describe('AND index is not exists', function(){
            beforeEach(function(){
                //given
                tableDataStorageService = TableDataStorageFactory.getInstance();
                tableDataStorageService.addRowData(rowId, rowData);

                tableDataStorageService.getRowOptions(4)
            });

            it('THEN it should call error log', function(){
                //then
                expect($log.error).toHaveBeenCalled();
            });
        });

        describe('AND index is exists', function(){
            beforeEach(function(){
                //given
                tableDataStorageService = TableDataStorageFactory.getInstance();
                tableDataStorageService.addRowData(rowId, rowData);
            });

            it('THEN it should return with the row data', function(){
                //when
                expect(tableDataStorageService.getRowOptions(0)).toEqual({
                    selected: false,
                    deleted: false,
                    visible: true
                });
            });
        });
    });

    describe('WHEN calling `setAllRowsSelected`', function(){
        beforeEach(function(){
            //given
            tableDataStorageService = TableDataStorageFactory.getInstance();
            tableDataStorageService.addRowData(rowId, rowData);
            tableDataStorageService.addRowData(234, ['Something', 3, 6, 7]);
            tableDataStorageService.addRowData(987, ['Else', 1, 34, 99]);
        });

        describe('AND parameter is not provided', function(){
            it('THEN it should throw an exception', function(){
                //when
                tableDataStorageService.setAllRowsSelected();

                //then
                expect($log.error).toHaveBeenCalled();
            });
        });

        describe('AND parameter is provided', function(){
            it('THEN depending the parameter it should set all rows selected', function(){
                tableDataStorageService.setAllRowsSelected(true);

                //when
                expect(tableDataStorageService.getRowOptions(0)).toEqual({
                    selected: true,
                    deleted: false,
                    visible: true
                });

                expect(tableDataStorageService.getRowOptions(1)).toEqual({
                    selected: true,
                    deleted: false,
                    visible: true
                });

                expect(tableDataStorageService.getRowOptions(2)).toEqual({
                    selected: true,
                    deleted: false,
                    visible: true
                });
            });

            it('THEN depending the parameter it should set all rows selected', function(){
                tableDataStorageService.setAllRowsSelected(true);
                tableDataStorageService.setAllRowsSelected(false);

                //when
                expect(tableDataStorageService.getRowOptions(0)).toEqual({
                    selected: false,
                    deleted: false,
                    visible: true
                });

                //when
                expect(tableDataStorageService.getRowOptions(1)).toEqual({
                    selected: false,
                    deleted: false,
                    visible: true
                });

                //when
                expect(tableDataStorageService.getRowOptions(2)).toEqual({
                    selected: false,
                    deleted: false,
                    visible: true
                });
            });
        });
    });

    describe('WHEN calling `reverseRows`', function(){
        beforeEach(function(){
            //given
            tableDataStorageService = TableDataStorageFactory.getInstance();

            tableDataStorageService.addRowData(rowId, rowData);
            tableDataStorageService.addRowData(234, ['Something', 3, 6, 7]);
            tableDataStorageService.addRowData(987, ['Else', 1, 34, 99]);
        });

        it('THEN it should reverse the rows data', function(){
            //when
            tableDataStorageService.reverseRows();

            //then
            expect(tableDataStorageService.getRowData(0)).toEqual(['Else', 1, 34, 99]);
            expect(tableDataStorageService.getRowData(1)).toEqual(['Something', 3, 6, 7]);
            expect(tableDataStorageService.getRowData(2)).toEqual(rowData);
        });
    });

    describe('WHEN calling `sortByColumnIndex`', function(){
        var rowData1 = [{value: 'Song'}, {value: 3}, {value: 6}, {value: 7}];
        var rowData2 = [{value: 'Xert'}, {value: 3}, {value: 56}, {value: 2}];
        var rowData3 = [{value: 'Else'}, {value: 1}, {value: 34}, {value: 99}];

        beforeEach(function(){
            //given
            tableDataStorageService = TableDataStorageFactory.getInstance();

            tableDataStorageService.addRowData(324, rowData1);
            tableDataStorageService.addRowData(234, rowData2);
            tableDataStorageService.addRowData(987, rowData3);
        });

        it('THEN it should sort the rows', function(){
            //when
            tableDataStorageService.sortByColumnIndex(0);

            //then
            expect(tableDataStorageService.getRowData(0)).toEqual(rowData3);
            expect(tableDataStorageService.getRowData(1)).toEqual(rowData1);
            expect(tableDataStorageService.getRowData(2)).toEqual(rowData2);
        });
    });

    describe('WHEN calling `isAnyRowSelected`', function(){
        var rowData1 = ['Song', 3, 6, 7];
        var rowData2 = ['Xert', 3, 56, 2];
        var rowData3 = ['Else', 1, 34, 99];

        beforeEach(function(){
            //given
            tableDataStorageService = TableDataStorageFactory.getInstance();

            tableDataStorageService.addRowData(324, rowData1);
            tableDataStorageService.addRowData(234, rowData2);
            tableDataStorageService.addRowData(987, rowData3);
        });

        it('THEN it should return true when a row is selected', function(){
            //when
            tableDataStorageService.getRowOptions(1).selected = true;

            //then
            expect(tableDataStorageService.isAnyRowSelected()).toEqual(true);
        });

        it('AND it should return false when no rows selected', function(){
            //when/then
            expect(tableDataStorageService.isAnyRowSelected()).toEqual(false);
        });

        it('AND WHEN a row is deleted it should not included into the count', function(){
            //when
            tableDataStorageService.getRowOptions(1).selected = true;
            tableDataStorageService.deleteSelectedRows();

            //then
            expect(tableDataStorageService.isAnyRowSelected()).toEqual(false);
        });
    });

    describe('WHEN calling `getNumberOfSelectedRows`', function(){
        var rowData1 = ['Song', 3, 6, 7];
        var rowData2 = ['Xert', 3, 56, 2];
        var rowData3 = ['Else', 1, 34, 99];

        beforeEach(function(){
            //given
            tableDataStorageService = TableDataStorageFactory.getInstance();

            tableDataStorageService.addRowData(324, rowData1);
            tableDataStorageService.addRowData(234, rowData2);
            tableDataStorageService.addRowData(987, rowData3);
        });

        it('THEN it should return 0 if no rows are selected', function(){
            //when/then
            expect(tableDataStorageService.getNumberOfSelectedRows()).toEqual(0);
        });

        it('AND it should return 1 when a row selected', function(){
            tableDataStorageService.getRowOptions(1).selected = true;

            //when/then
            expect(tableDataStorageService.getNumberOfSelectedRows()).toEqual(1);
        });

        it('AND WHEN a row is deleted it should not included into the count', function(){
            //when
            tableDataStorageService.getRowOptions(1).selected = true;
            tableDataStorageService.deleteSelectedRows();

            //then
            expect(tableDataStorageService.getNumberOfSelectedRows()).toEqual(0);
        });
    });

    describe('WHEN calling `deleteSelectedRows`', function(){
        var rowData1 = ['Song', 3, 6, 7];
        var rowData2 = ['Xert', 3, 56, 2];
        var rowData3 = ['Else', 1, 34, 99];

        beforeEach(function(){
            //given
            tableDataStorageService = TableDataStorageFactory.getInstance();

            tableDataStorageService.addRowData(324, rowData1);
            tableDataStorageService.addRowData(234, rowData2);
            tableDataStorageService.addRowData(987, rowData3);
        });

        it('THEN it should not mark as deletes any rows when no rows are selected and return an empty array', function(){
            //when
            var deletedRows = tableDataStorageService.deleteSelectedRows();

            //then
            expect(tableDataStorageService.getRowOptions(0).deleted).toEqual(false);
            expect(tableDataStorageService.getRowOptions(1).deleted).toEqual(false);
            expect(tableDataStorageService.getRowOptions(2).deleted).toEqual(false);

            expect(deletedRows).toEqual([]);
        });

        it('AND it should return and mark as deleted the selected rows', function(){
            //when
            tableDataStorageService.getRowOptions(1).selected = true;
            tableDataStorageService.getRowOptions(2).selected = true;
            var deletedRows = tableDataStorageService.deleteSelectedRows();

            //then
            expect(tableDataStorageService.getRowOptions(0).deleted).toEqual(false);
            expect(tableDataStorageService.getRowOptions(1).deleted).toEqual(true);
            expect(tableDataStorageService.getRowOptions(2).deleted).toEqual(true);

            expect(deletedRows).toEqual([234, 987]);
        });
    });

    describe('WHEN calling `deleteSelectedRows` and rows has been added without ids', function(){
        var rowData1 = ['Song', 3, 6, 7];
        var rowData2 = ['Xert', 3, 56, 2];
        var rowData3 = ['Else', 1, 34, 99];

        beforeEach(function(){
            //given
            tableDataStorageService = TableDataStorageFactory.getInstance();

            tableDataStorageService.addRowData(null, rowData1);
            tableDataStorageService.addRowData(null, rowData2);
            tableDataStorageService.addRowData(null, rowData3);
        });

        it('AND it should mark deleted the selected row', function(){
            //when
            tableDataStorageService.getRowOptions(1).selected = true;
            var deletedRows = tableDataStorageService.deleteSelectedRows();

            //then
            expect(deletedRows).toEqual([rowData2]);
        });
    });
});