import IServiceProvider = angular.IServiceProvider;
import ITimeoutService = angular.ITimeoutService;
import IDialogService = angular.material.IDialogService;
import IFormController = angular.IFormController;

//TODO: cellData type
//TODO: position type
class InlineEditModalCtrl {
    public static ControllerId: string = 'InlineEditModalCtrl';
    public static $inject: string[] = ['position', 'cellData', '$timeout', '$mdDialog'];

    public cellData:any;
    public $mdDialog:IDialogService;
    public editFieldForm:IFormController;

    constructor(position:any, cellData:any, $timeout:ITimeoutService, $mdDialog:IDialogService) {
        $timeout(function() {
            var el = $('md-dialog');
            el.css('position', 'fixed');
            el.css('top', position['top']);
            el.css('left', position['left']);

            el.find('input[type="text"]').focus();
        });

        this.cellData = cellData;
        this.$mdDialog = $mdDialog;
    }

    public saveRow(): void {
        if (this.editFieldForm.$valid) {
            this.$mdDialog.hide(this.cellData.value);
        }
    }

    public cancel(): void {
        this.$mdDialog.cancel();
    }
}

angular
    .module('mdDataTable')
    .controller(InlineEditModalCtrl.ControllerId, InlineEditModalCtrl);