(function() {
    'use strict';

    function mdtColumnSelectorDirective(ColumnSelectorFeature, ColumnFilterFeature, PaginatorTypeProvider){
        return{
            restrict: 'E',
            templateUrl: '/main/templates/mdtColumnSelector.html',
            scope: true,
            link: function($scope, element){
                ColumnSelectorFeature.positionElement(element);

                $scope.headerRowsData = _.map($scope.dataStorage.header, function(item){
                    //excluded content should also be in, since we use the index of the array to apply the changes. Do not exclude them.

                    return {
                        columnName: item.columnName,
                        isVisible: item.columnSelectorFeature.isVisible,
                        isExcluded: item.columnSelectorFeature.isExcluded
                    };
                });

                //destroying scope doesn't remove element, since it belongs to the body directly
                $scope.$on('$destroy', function(){
                    element.remove();
                });

                $scope.checked = function (item) {
                    return item.isVisible;
                };

                $scope.toggle = function (item) {
                    item.isVisible = !item.isVisible;
                };

                $scope.selectAll = function($event){
                    $event.preventDefault();

                    _.each($scope.headerRowsData, function(item){
                        if(item.isExcluded){
                            return;
                        }

                        item.isVisible = true;
                    });
                };

                $scope.clearAll = function($event){
                    $event.preventDefault();

                    _.each($scope.headerRowsData, function(item){
                        if(item.isExcluded){
                            return;
                        }

                        item.isVisible = false;
                    });
                };

                $scope.isAllSelected = function(){
                    var result = _.find($scope.headerRowsData, function(item){
                        if(item.isExcluded){
                            return false;
                        }

                        return item.isVisible === false;
                    });

                    return result ? false : true;
                };

                $scope.isNothingSelected = function(){
                    var result = _.find($scope.headerRowsData, function(item){
                        if(item.isExcluded){
                            return false;
                        }

                        return item.isVisible === true;
                    });

                    return result ? false : true;
                };

                $scope.confirmCallback = function(params){
                    var paginator = params.paginator;
                    var isAnyResetHappened = false;

                    _.each($scope.dataStorage.header, function(item, index){
                        item.columnSelectorFeature.isVisible = $scope.headerRowsData[index].isVisible;

                        if(!item.columnSelectorFeature.isVisible){
                            var result = ColumnFilterFeature.resetFiltersForColumn($scope.dataStorage, index);

                            if(result){
                                isAnyResetHappened = true;
                            }
                        }
                    });

                    $scope.columnSelectorFeature.isActive = false;

                    if(isAnyResetHappened){
                        if(paginator.paginatorType === PaginatorTypeProvider.AJAX){
                            paginator.getFirstPage();
                        }else{
                            // no support for non-ajax yet
                        }
                    }
                };

                $scope.cancelCallback = function(){
                    $scope.columnSelectorFeature.isActive = false;
                };
            }
        }
    }

    angular
        .module('mdDataTable')
        .directive('mdtColumnSelector', mdtColumnSelectorDirective);
})();