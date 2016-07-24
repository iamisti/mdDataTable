export class ColumnAlignmentHelper {
    public static ServiceId: string = 'ColumnAlignmentHelper';
    public static $inject: string[] = ['ColumnOptionProvider'];

    private ColumnOptionProvider:any;

    constructor(ColumnOptionProvider:any) {
        this.ColumnOptionProvider = ColumnOptionProvider;
    }

    public getColumnAlignClass(alignRule:any):string {
        if (alignRule === ColumnOptionProvider.ALIGN_RULE.ALIGN_RIGHT) {
            return 'rightAlignedColumn';
        } else {
            return 'leftAlignedColumn';
        }
    }
}

angular
    .module('mdDataTable')
    .service(ColumnAlignmentHelper.ServiceId, ColumnAlignmentHelper);