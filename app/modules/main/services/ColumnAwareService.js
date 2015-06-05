(function(){
    'use strict';

    function ColumnAwareService(){
        var service = this;

        service.addColumnOption = addColumnOption;
        service.subscribeToOptionListChange = subscribeToOptionListChange;
        service.initialize = initialize;

        function addColumnOption(columnOption){
            service.scope.optionsList.push(columnOption);
        }

        function subscribeToOptionListChange(callback){
            service.scope.subscribers.push(callback);
        }

        function initialize(scope){
            service.scope = scope;

            service.scope.optionsList = [];
            service.scope.subscribers = [];

            service.scope.$watch('optionsList', function(newVal){
                _.each(service.scope.subscribers, function(callback){
                    callback(newVal);
                });
            }, true);
        }
    }

    angular
        .module('mdDataTable')
        .service('ColumnAwareService', ColumnAwareService);
}());