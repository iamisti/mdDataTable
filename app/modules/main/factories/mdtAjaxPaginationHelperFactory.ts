import {IPaginationHelper} from './IPaginationHelper';
import {TableDataStorageService, RowData} from './TableDataStorageFactory';
import * as _ from 'lodash';
import IPromise = angular.IPromise;

class AjaxPaginationHelper implements IPaginationHelper {

    private tableDataStorageService:TableDataStorageService;
    private rowOptions:any;
    private paginatorFunction:any;
    private mdtRowPaginatorErrorMessage:string;
    private mdtRowPaginatorNoResultsMessage:string;
    private mdtTriggerRequest:any;
    private rowsPerPageValues:number[];
    private rowsPerPage:number;
    private page:number;
    private totalResultCount:number;
    private totalPages:number;
    private isLoading:boolean;

    constructor(params:any) {
        this.tableDataStorageService = params.tableDataStorageService;
        this.rowOptions = params.mdtRowOptions;
        this.paginatorFunction = params.mdtRowPaginatorFunction;
        this.mdtRowPaginatorErrorMessage = params.mdtRowPaginatorErrorMessage || 'Ajax error during loading contents.';
        this.mdtRowPaginatorNoResultsMessage = params.mdtRowPaginatorNoResultsMessage || 'No results.';
        this.mdtTriggerRequest = params.mdtTriggerRequest;

        if (params.paginationSetting &&
            params.paginationSetting.hasOwnProperty('rowsPerPageValues') &&
            params.paginationSetting.rowsPerPageValues.length > 0) {

            this.rowsPerPageValues = params.paginationSetting.rowsPerPageValues;
        }else {
            this.rowsPerPageValues = [10, 20, 30, 50, 100];
        }

        this.rowsPerPage = this.rowsPerPageValues[0];
        this.page = 1;
        this.totalResultCount = 0;
        this.totalPages = 0;

        this.isLoading = false;

        //fetching the 1st page
        this.fetchPage(this.page);

        //triggering ajax call manually
        if (this.mdtTriggerRequest) {
            params.mdtTriggerRequest({
                loadPageCallback: this.fetchPage.bind(this)
            });
        }
    }

    public getStartRowIndex(): number {
        return (this.page - 1) * this.rowsPerPage;
    }

    public getEndRowIndex(): number {
        return this.getStartRowIndex() + this.rowsPerPage - 1;
    }

    public getTotalRowsCount(): number {
        return this.totalPages;
    }

    public getRows():Array<RowData> {
        return this.tableDataStorageService.storage;
    }

    public previousPage(): void {
        var that = this;
        if (this.page > 1) {
            this.fetchPage(this.page - 1).then(function() {
                that.page--;
            });
        }
    }

    public nextPage(): void {
        var that = this;
        if (this.page < this.totalPages) {
            this.fetchPage(this.page + 1).then(function() {
                that.page++;
            });
        }
    }

    public fetchPage = function(page:number):IPromise<any> {
        this.isLoading = true;
        var that = this;

        return this.paginatorFunction({page: page, pageSize: this.rowsPerPage})
            .then(function(data:any) {
                that.tableDataStorageService.storage = [];
                that.setRawDataToStorage(that, data.results, that.rowOptions['table-row-id-key'], that.rowOptions['column-keys']);
                that.totalResultCount = data.totalResultCount;
                that.totalPages = Math.ceil(data.totalResultCount / that.rowsPerPage);

                if (that.totalResultCount === 0) {
                    that.isNoResults = true;
                }else {
                    that.isNoResults = false;
                }

                that.isLoadError = false;
                that.isLoading = false;

            }, function() {
                that.tableDataStorageService.storage = [];

                that.isLoadError = true;
                that.isLoading = false;
                that.isNoResults = true;
            });
    };

    public setRawDataToStorage(that:any, data:any, tableRowIdKey:any, columnKeys:Array<string>) {
        var rowId:any;
        var columnValues:Array<any> = [];

        _.each(data, function(row:any) {
            rowId = _.get(row, tableRowIdKey);
            columnValues = [];

            _.each(columnKeys, function(columnKey:string) {
                //TODO: centralize adding column values into one place.
                // Duplication occurs at mdtCellDirective's link function.
                columnValues.push({
                    attributes: {
                        editableField: false
                    },
                    columnKey: columnKey,
                    value: _.get(row, columnKey)
                });
            });

            that.tableDataStorageService.addRowData(rowId, columnValues);
        });
    };

    public setRowsPerPage(rowsPerPage:number) {
        this.rowsPerPage = rowsPerPage;
        this.page = 1;

        this.fetchPage(this.page);
    };
}

class AjaxPaginationHelperFactory {
    public static FactoryId: string = 'mdDataTable.AjaxPaginationHelperFactory';
    public static $inject: string[] = [];

    public getInstance(params:any): AjaxPaginationHelper {
        return new AjaxPaginationHelper(params);
    }
}

angular
    .module('mdDataTable')
    .factory(AjaxPaginationHelperFactory.FactoryId, AjaxPaginationHelperFactory);