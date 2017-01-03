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
             _.each(storageData, function(data){
                 if(data.optionList.selected === false){
                     // find a way not to use css directly here
                    //$('th md-checkbox').removeClass('md-checked');
                    return false;
                 }else{
                    //$('th md-checkbox').addClass('md-checked');
                 }
             });
        }
    }

    angular
        .module('mdDataTable')
        .service('CheckBoxMgmtProvider', CheckBoxMgmtProvider);
})();
