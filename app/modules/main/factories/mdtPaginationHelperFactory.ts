import {TableDataStorageService, RowData} from './TableDataStorageFactory';
import {IPaginationHelper} from './IPaginationHelper';

export class PaginationHelper implements IPaginationHelper {
    public static $inject:string[] = [];

    private tableDataStorageService:TableDataStorageService;
    private paginationSettings:any;
    private rowsPerPageValues:number[];
    private rowsPerPage:number;
    private page:number;

    constructor(tableDataStorageService:TableDataStorageService, paginationSettings:any) {
        this.tableDataStorageService = tableDataStorageService;
        this.paginationSettings = paginationSettings;

        if (this.paginationSettings &&
           this.paginationSettings.hasOwnProperty('rowsPerPageValues') &&
           this.paginationSettings.rowsPerPageValues.length > 0) {

            this.rowsPerPageValues = this.paginationSettings.rowsPerPageValues;
        }else {
            this.rowsPerPageValues = [10, 20, 30, 50, 100];
        }

        this.rowsPerPage = this.rowsPerPageValues[0];
        this.page = 1;
    }

    private calculateVisibleRows(): void {
        var that = this;

        _.each(this.tableDataStorageService.storage, function (rowData, index) {
            if (index >= that.getStartRowIndex() && index <= that.getEndRowIndex()) {
                rowData.optionList.visible = true;
            } else {
                rowData.optionList.visible = false;
            }
        });
    }

    public getStartRowIndex(): number {
        return (this.page - 1) * this.rowsPerPage;
    }

    public getEndRowIndex(): number {
        return this.getStartRowIndex() + this.rowsPerPage - 1;
    }

    public getTotalRowsCount(): number {
        return this.tableDataStorageService.storage.length;
    }

    public getRows(): Array<RowData> {
        this.calculateVisibleRows();

        return this.tableDataStorageService.storage;
    }

    public previousPage(): void {
        if (this.page > 1) {
            this.page--;
        }
    }

    public nextPage(): void {
        var totalPages = Math.ceil(this.getTotalRowsCount() / this.rowsPerPage);

        if (this.page < totalPages) {
            this.page++;
        }
    };

    public setRowsPerPage(rowsPerPage:number): void {
        this.rowsPerPage = rowsPerPage;
        this.page = 1;
    }
}

export class PaginationHelperFactory {
    public static FactoryId: string = 'mdDataTable.PaginationHelperFactory';
    public static $inject: string[] = [];

    public getInstance(tableDataStorageService:TableDataStorageService, paginationSetting:any): PaginationHelper {
        return new PaginationHelper(tableDataStorageService, paginationSetting);
    }
}

angular
    .module('mdDataTable')
    .service(PaginationHelperFactory.FactoryId, PaginationHelperFactory);