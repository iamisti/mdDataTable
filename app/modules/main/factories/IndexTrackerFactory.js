(function(){
    'use strict';

    function IndexTrackerFactory(){

        function IndexTrackerService(){
            this.indexValue = 0;
        }

        IndexTrackerService.prototype.increaseIndex = function(){
            this.indexValue++;
        };

        IndexTrackerService.prototype.getIndex = function(){
            return this.indexValue;
        };

        return {
            getInstance: function(){
                return new IndexTrackerService();
            }
        };
    }

    angular
        .module('mdDataTable')
        .service('IndexTrackerFactory', IndexTrackerFactory);
}());