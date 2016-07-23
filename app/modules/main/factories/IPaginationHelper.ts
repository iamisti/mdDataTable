import {RowData} from './TableDataStorageFactory';

export interface IPaginationHelper {

    /**
     * Calculates the first index of the current page.
     */
    getStartRowIndex():number;

    /**
     * Calculates the last index of the current page.
     */
    getEndRowIndex():number;

    /**
     * Returns with the total amount of items we have.
     */
    getTotalRowsCount():number;

    /**
     * Returns with the entire collection of items we have.
     */
    getRows():Array<RowData>;
}
