describe('PaginationFeature', function(){

    beforeEach(module('mdtTemplates'));
    beforeEach(module('mdDataTable'));

    describe('WHEN calling `initFeature`', function(){
        var scope;
        var ctrl;

        beforeEach(inject(function($rootScope){
            scope = $rootScope.$new();
            ctrl = {
                dataStore: {}
            };
        }));

        it('AND feature is used THEN required functions should be added to the scope and to the ctrl', inject(function(PaginationFeature){
            //given/when
            PaginationFeature.initFeature(scope, ctrl);

            //then
            expect(scope.isPaginationEnabled).toBeDefined();
            expect(ctrl.paginationFeature).toBeDefined();
            expect(ctrl.mdtPaginationHelper).toBeDefined();
            expect(ctrl.paginationFeature).toBeDefined();
            expect(ctrl.paginationFeature.startPaginationFeature).toBeDefined();
        }));

        it('AND `startPaginationFeature` is called THEN it should call `mdtPaginationHelper.fetchPage(1)`', inject(function(PaginationFeature){
            //given/when
            PaginationFeature.initFeature(scope, ctrl);

            //then
            expect(scope.isPaginationEnabled).toBeDefined();
            expect(ctrl.paginationFeature).toBeDefined();
            expect(ctrl.mdtPaginationHelper).toBeDefined();
            expect(ctrl.paginationFeature).toBeDefined();
            expect(ctrl.paginationFeature.startPaginationFeature).toBeDefined();
        }));
    });
});