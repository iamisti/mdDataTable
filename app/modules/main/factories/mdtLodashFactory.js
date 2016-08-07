(function(){
    'use strict';

    function mdtLodashFactory($window){
        if(!$window._){
            throw Error('Lodash does not found. Please make sure you load Lodash before any source for mdDataTable');
        }

        return $window._;
    }

    angular
        .module('mdDataTable')
        .factory('_', mdtLodashFactory);
}());