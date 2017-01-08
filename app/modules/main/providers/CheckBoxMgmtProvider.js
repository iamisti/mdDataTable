(function(){
    'use strict';

    /**
     * @name CheckBoxMgmtProvider
     * @used as CheckBox management service
     */
    function CheckBoxMgmtProvider(){
        var service = this;

        service.getCheckOption = getCheckOption;
        function getCheckOption(storageData){
          var foundFalse = false;
             _.each(storageData, function(data){
               if(foundFalse){
                 return false;
               }
               _.each(data, function(subData){
                 if(subData.optionList.selected === false){
                     // find a way not to use css directly here
                    $('th md-checkbox').removeClass('md-checked');
                    foundFalse = true;
                    return false;
                 }else{
                    $('th md-checkbox').addClass('md-checked');
                 }
               })
             });
        }
    }

    angular
        .module('mdDataTable')
        .service('CheckBoxMgmtProvider', CheckBoxMgmtProvider);
})();
