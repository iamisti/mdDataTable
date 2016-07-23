import * as _ from 'lodash';
import ILogService = angular.ILogService;

export class RowData {
    public rowId:string;
    public optionList:any;
    public data:any;
}

export class TableDataStorageService {
    public static $inject:string[] = ['$log'];

    private $log:ILogService;

    public storage:RowData[];
    public header:any[];
    public customCells:any;
    public sortByColumnLastIndex:any;
    public orderByAscending:boolean;

    constructor($log:ILogService) {
        this.$log = $log;

        this.storage = [];
        this.header = [];
        this.customCells = {};

        this.sortByColumnLastIndex = null;
        this.orderByAscending = true;
    }

    public addHeaderCellData(ops:any): void {
        this.header.push(ops);
    };

    public addRowData(explicitRowId:any, rowArray:any): void {
        if (!(rowArray instanceof Array)) {
            this.$log.error('`rowArray` parameter should be array');
            return;
        }

        var rowData = new RowData();
            rowData.rowId = explicitRowId;
            rowData.optionList = {
                selected: false,
                deleted: false,
                visible: true
            };
            rowData.data = rowArray;

        this.storage.push(rowData);
    };

    public getRowData(index:any): any {
        if (!this.storage[index]) {
            this.$log.error('row is not exists at index: ' + index);
            return;
        }

        return this.storage[index].data;
    };

    public getRowOptions(index:any): any {
        if (!this.storage[index]) {
            this.$log.error('row is not exists at index: ' + index);
            return;
        }

        return this.storage[index].optionList;
    };

    public setAllRowsSelected(isSelected:any, isPaginationEnabled:any): void {
        if (typeof isSelected === 'undefined') {
            this.$log.error('`isSelected` parameter is required');
            return;
        }

        _.each(this.storage, function (rowData) {
            if (isPaginationEnabled) {
                if (rowData.optionList.visible) {
                    rowData.optionList.selected = isSelected ? true : false;
                }
            } else {
                rowData.optionList.selected = isSelected ? true : false;
            }
        });
    };

    public reverseRows(): void {
        this.storage.reverse();
    };

    public sortByColumn(columnIndex:any, iteratee:any): number {
        if (this.sortByColumnLastIndex === columnIndex) {
            this.reverseRows();

            this.orderByAscending = !this.orderByAscending;
        } else {
            this.sortByColumnIndex(columnIndex, iteratee);

            this.sortByColumnLastIndex = columnIndex;
            this.orderByAscending = true;
        }

        return this.orderByAscending ? -1 : 1;
    };

    public sortByColumnIndex(index:any, iteratee:any): void {

        var sortFunction:any;
        if (typeof iteratee === 'function') {
            sortFunction = function (rowData:any) {
                return iteratee(rowData.data[index], rowData, index);
            };
        } else {
            sortFunction = function (rowData:any) {
                return rowData.data[index];
            };
        }

        var res = _.sortBy(this.storage, sortFunction);

        this.storage = res;
    };

    public isAnyRowSelected(): boolean {
        return _.some(this.storage, function (rowData:any) {
            return rowData.optionList.selected === true && rowData.optionList.deleted === false;
        });
    };

    public getNumberOfSelectedRows(): number {
        var res = _.countBy(this.storage, function (rowData:RowData) {
            return rowData.optionList.selected === true && rowData.optionList.deleted === false ? 'selected' : 'unselected';
        });

        return res['selected'] ? res['selected'] : 0;
    };

    public deleteSelectedRows(): any {
        var deletedRows:string[] = [];

        _.each(this.storage, function (rowData:any) {
            if (rowData.optionList.selected && rowData.optionList.deleted === false) {

                if (rowData.rowId) {
                    deletedRows.push(rowData.rowId);

                    //Fallback when no id was specified
                } else {
                    deletedRows.push(rowData.data);
                }

                rowData.optionList.deleted = true;
            }
        });

        return deletedRows;
    };

    public getSelectedRows(): any {
        var selectedRows:string[] = [];

        _.each(this.storage, function (rowData:any) {
            if (rowData.optionList.selected && rowData.optionList.deleted === false) {

                if (rowData.rowId) {
                    selectedRows.push(rowData.rowId);

                    //Fallback when no id was specified
                } else {
                    selectedRows.push(rowData.data);
                }
            }
        });

        return selectedRows;
    };

    public getSavedRowData(rowData:any): any {
        var rawRowData:string[] = [];

        _.each(rowData.data, function (aCell:any) {
            rawRowData.push(aCell.value);
        });

        return rawRowData;
    };
}

class TableDataStorageFactory {
    public static FactoryId: string = 'mdDataTable.TableDataStorageFactory';
    public static $inject: string[] = ['$log'];

    private $log:ILogService;

    constructor($log:ILogService) {
        this.$log = $log;
    }

    public getInstance(): TableDataStorageService {
        return new TableDataStorageService(this.$log);
    }
}

angular
    .module('mdDataTable')
    .factory(TableDataStorageFactory.FactoryId, TableDataStorageFactory);