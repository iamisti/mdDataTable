describe('EditCellFeature', function(){

    beforeEach(module('mdtTemplates'));
    beforeEach(module('mdDataTable'));

    describe('WHEN calling `addRequiredFunctions`', function(){
        var scope;

        beforeEach(inject(function($rootScope){
            scope = $rootScope.$new();
        }));

        it('AND feature is used THEN required functions should be added to the scope', inject(function($rootScope, EditCellFeature){
            //given/when
            EditCellFeature.addRequiredFunctions(scope);

            //then
            expect(scope.saveRow).toBeDefined();
            expect(scope.showEditDialog).toBeDefined();
        }));

        describe('WHEN `saveRow` is called', function(){
            var rowDataToSave;
            var rawRowData;
            var ctrl;

            beforeEach(function(){
                scope.saveRowCallback = angular.noop;

                rowDataToSave = {
                    'some': 'data'
                };

                rawRowData = {
                    'other': 'thing here'
                };

                ctrl = {
                    dataStorage: {
                        getSavedRowData: angular.noop
                    }
                };

                spyOn(ctrl.dataStorage, 'getSavedRowData').and.returnValue(rawRowData);
                spyOn(scope, 'saveRowCallback');
            });

            it('THEN it should save the result into the data storage', inject(function(EditCellFeature){
                //given
                EditCellFeature.addRequiredFunctions(scope, ctrl);

                //when
                scope.saveRow(rowDataToSave);

                //then
                expect(ctrl.dataStorage.getSavedRowData).toHaveBeenCalledWith(rowDataToSave);
            }));

            it('THEN it should publish the result by calling the callback', inject(function(EditCellFeature){
                //given
                EditCellFeature.addRequiredFunctions(scope, ctrl);

                //when
                scope.saveRow(rowDataToSave);

                //then
                expect(scope.saveRowCallback).toHaveBeenCalledWith({row: rawRowData});
            }));
        });
    });
});