> New version! v0.2.4 - Added pagination support, animated sort icon, ripple effect and so on.

[![Build Status](https://travis-ci.org/iamisti/md-data-table.svg?branch=master)](https://travis-ci.org/iamisti/md-data-table) 
[![Code Climate](https://codeclimate.com/github/iamisti/md-data-table/badges/gpa.svg)](https://codeclimate.com/github/iamisti/md-data-table) 
[![Test Coverage](https://codeclimate.com/github/iamisti/md-data-table/badges/coverage.svg?branch=master)](https://codeclimate.com/github/iamisti/md-data-table/coverage) 
[![Dependency Status](https://gemnasium.com/iamisti/md-data-table.svg)](https://gemnasium.com/iamisti/md-data-table)
[![Codacy Badge](https://www.codacy.com/project/badge/055f7343f2ef4b168706056a69a2875c)](https://www.codacy.com/app/programtervezo/md-data-table)

Angular material table. Complete implementation of google material design based on angular material components.

> Live demo http://iamisti.github.io/md-data-table/

## Install

1. `bower install md-data-table` or [download the source](https://github.com/iamisti/md-data-table/archive/master.zip).
2. Make sure the `md-data-table` lib is loaded. It's served in three different files: `md-data-table-style.css`, `md-data-table.js`, `md-data-table-templates.js`
3. Add `mdDataTable` as a dependency of your app.

## UI&UX driven by google data table specification
http://www.google.com/design/spec/components/data-tables.html

## Table of contents
[Overview](#overview)
[Table attributes](#table-attributes)
 - selectable-rows
 - delete-row-callback
 - sortable-columns
 - animate-sort-icon
 - ripple-effect
 - ! title-overflow-handler
 - table-card 
 - paginated-rows
 - alternate-headers
[Column attributes (`md-data-table-column`)](#column-attributes)
 - align-rule
 - column-definition
 - ! sortable-rows-default
 - sort-by
[Data-Row attributes (`md-data-table-row`)](#data-row-attributes)
 - table-row-id
[Data-Cell attributes (`md-data-table-cell`)](#data-cell-attributes)
 - ! inline-menu
 - ! editable-field
 - html-content

## Overview [overview]
### (not finalized yet, if you have improvement ideas, let me know)

In its simplest form, a data table contains a top row of column names, and rows for data.
![A selected table row](http://material-design.storage.googleapis.com/publish/material_v_4/material_ext_publish/0B3mOPoJlxiFhV25CdGNXYzA4cXM/components_datatables_structure_basictable.png)

## Table attributes [table-attributes]

| Available        | Params                                         | Type          | Details       |
| ---------------- | ---------------------------------------------- | ------------- | ------------- |
|:white_check_mark:| selectable-rows                                | Boolean       | optional, checkboxes accompany each row if need to select or manipulate data |
|:white_check_mark:| delete-row-callback                            | Function      | optional, callback function when deleting rows. The callback will be called with the array of the deleted row ids. Don't forget to specify `table-row-id` for `md-data-table-row`. If you do, it will return the deleted rows data. |
![alt tag](http://material-design.storage.googleapis.com/publish/material_v_4/material_ext_publish/0B3mOPoJlxiFhcWNyQl9xYmRkQnc/components_datatables_interaction_selectedrow.png)

| Available        | Params                                         | Type          | Details       |
| ---------------- | ---------------------------------------------- | ------------- | ------------- |
|:white_check_mark:| sortable-columns                               | Boolean       | optional, if enabled, sort data and display a sorted state in the column header. If the user clicks on a column that is already sorted, reverse the sort order and rotate the sort icon. Use `sortable-rows-default` attribute directive on a column which intended to be the default sortable column |
|:white_check_mark:| animate-sort-icon                              | Boolean       | optional, if enabled, sort icon will be animated on change |
|:white_check_mark:| ripple-effect                                  | Boolean       | optional, if enabled, ripple effect will be applied on the column names when clicked |
![Table with an ascending sorted column](http://material-design.storage.googleapis.com/publish/material_v_4/material_ext_publish/0B3mOPoJlxiFhMW1haUJDRWJKLUk/components_datatables_interaction_sortedcolumn.png)

| Available        | Params                             | ChildParams                     | Type          | Details       |
| ---------------- | ---------------------------------- | ------------------------------- | ------------- | ------------- |
|:x:               | title-overflow-handler             |                                 | String        | optional, Sometimes, column names don’t fit in a container in between columns. There are two options to handle this |
|:x:               |                                    | _(default)_ truncateColumnNames | -             | Shorten the column name and display it in full on hover |
|:x:               |                                    | useHorizontalScrollingOnTable   | -             | Display the full column name and enable horizontal scrolling in the table container |
![Long column names truncated with an ellipse](http://material-design.storage.googleapis.com/publish/material_v_4/material_ext_publish/0B3mOPoJlxiFhMkVuNC1Zd3QyZ1k/components_datatables_interaction_longtitle1.png)
![Hovering over a truncated column name](http://material-design.storage.googleapis.com/publish/material_v_4/material_ext_publish/0B3mOPoJlxiFhclI1SGllZkZQTkE/components_datatables_interaction_longtitle2.png)

| Available        | Params                                     | ChildParams                     | Type          | Details       |
| -----------------| ------------------------------------------ | ------------------------------- | ------------- | ------------- |
|:white_check_mark:| table-card                                 |                                 | Object        | optional, tables can be embedded within a card, with table navigation and data manipulation tools available at the top and bottom. |
|:white_check_mark:|                                            | title                           | String        | The title of the table card |
|:x:               |                                            | actionIcons                     | Boolean       | Card action icons (header and footer) |
|:white_check_mark:|                                            | visible                         | Boolean       | The visibility of the table card |
![Table card with header and footer](http://material-design.storage.googleapis.com/publish/material_v_4/material_ext_publish/0B3mOPoJlxiFhUTEwa21JUEtza0k/components_datatables_cards_tablecard.png)

| Available        | Params                                     | ChildParams                     | Type          | Details|
| -----------------| ------------------------------------------ | ------------------------------- | ------------- | ------ |
|:white_check_mark:| paginated-rows                             |                                 | Boolean       | optional, if true, then basic pagination will applied to the bottom of the table. |
|:white_check_mark:|                                            | isEnabled                       | Boolean       | Optional, if provided then basic pagination will applied to the bottom of the table |
|:white_check_mark:|                                            | rowsPerPageValues               | Array         | Optional, if provided then it will apply the rows per page values from the given arguments. Example: [5,10,20] |
![Table card with header and footer](http://material-design.storage.googleapis.com/publish/material_v_4/material_ext_publish/0B3mOPoJlxiFhUTEwa21JUEtza0k/components_datatables_cards_tablecard.png)


| Available        | Params                             | ChildParams                     | Type          | Details       |
| ---------------- |----------------------------------- | ------------------------------- | ------------- | ------------- |
|:white_check_mark:| alternate-headers                  |                                 | String        | optional, some table cards may require headers with actions instead of titles. Two possible approaches to this are to display persistent actions, or a contextual header that activates when items are selected |
|:x:               |                                    | persistentActions               | -             | Shows persistent action buttons in header |
|:white_check_mark:|                                    | contextual                      | -             | Shows contextual content depending on what has been selected |
![persistent and contextual headers](http://material-design.storage.googleapis.com/publish/material_v_4/material_ext_publish/0B3mOPoJlxiFhemNvbnZOcXNpODQ/components_datatables_cards_altheaders.png)


## Column attributes (`md-data-table-column` attributes) [column-attributes]

| Available        | Params                                         | ChildPArams         | Type         | Details         |
| ---------------- | ---------------------------------------------- | --------------------|------------- | --------------- |
|:white_check_mark:| align-rule                                     |                     |String        | if provided, align the text to the needed direction for the entire column (note, that it aligns the data that belongs to the column) |
|:white_check_mark:|                                                | _(default)_ left    |              | left-align content 
|:white_check_mark:|                                                | right               |              | right-align content 


| Available        | Params                                         | Type          | Details         |
| ---------------- | ---------------------------------------------- | ------------- | --------------- |
|:white_check_mark:| column-definition                              | String        | if provided, display a tooltip on hover. If sorting is enabled, display a light sort icon upon hover, which indicates that the column is sortable. |
![Column definition on hover](http://material-design.storage.googleapis.com/publish/material_v_4/material_ext_publish/0B3mOPoJlxiFhenh5SWhFdFlyajg/components_datatables_interaction_tooltip.png)

| Available        | Params                                         | Type          | Details         |
| -----------------| ---------------------------------------------- | ------------- | --------------- |
|:x:               | sortable-rows-default                          | -             | When sortable-columns is applied to the table, it marks the column as the default sorting column |
|:white_check_mark:| sort-by                                        | Function      | if provided, used as the iteratee during sort operations to transform the cell value to a value that can be ranked in order. |


# Data-Row attributes (`md-data-table-row` attributes) [data-row-attributes]

| Available        | Params                                         | Type          | Details         |
| ---------------- | ---------------------------------------------- | ------------- | --------------- |
|:white_check_mark:| table-row-id                                   | String|Integer| defines the id of the row. Useful if you specified the callback function (`delete-row-callback`) for deleting a row. |


# Data-Cell attributes (`md-data-table-cell` attributes) [data-cell-attributes]

| Available        | Params                                         | ChildParams        | Type          | Details         |
| ---------------- | ---------------------------------------------- | ------------------ | ------------- | --------------- |
|:x:               | inline-menu                                    |                    | Array         | if provided, users can select from a predefined list of options. In this scenario, a menu component directly embedded in the table |
![A table with inline menus](http://material-design.storage.googleapis.com/publish/material_v_4/material_ext_publish/0B3mOPoJlxiFhblJlanhBSHYzNWs/components_datatables_interaction_inlinemenus1.png)
![An expanded inline menu](http://material-design.storage.googleapis.com/publish/material_v_4/material_ext_publish/0B3mOPoJlxiFhV200T3NSWG9TZFU/components_datatables_interaction_inlinemenus2.png)

| Available               | Params                                         | ChildParams        | Type          | Details         |
| ----------------------- | ---------------------------------------------- | ------------------ | ------------- | --------------- |
|:x:                      | editable-field                                 |                    | String        | if provided, provides basic text editing. Include editable fields within a table and denote them using placeholder text(if empty). You can use a simple edit dialog with just a text field, or display a full dialog component on click. |
|:x:                      |                                                | textInput          | -             | An editable table cell with placeholder text |
|:x:                      |                                                | smallEditDialog    | -             | A simple, one-field edit dialog on click |
|:x:                      |                                                | largeEditDialog    | -             | A complex, flexible edit edit dialog on click |
|:x:                   |                                                | editIcon           | -             | Inline edit icon |
![An editable table cell with placeholder text](http://material-design.storage.googleapis.com/publish/material_v_4/material_ext_publish/0B3mOPoJlxiFhZTViOVFXZTNucGs/components_datatables_interaction_editing1.png)
![A simple, one-field edit dialog](http://material-design.storage.googleapis.com/publish/material_v_4/material_ext_publish/0B3mOPoJlxiFhZHhJSVhoT2JuTkE/components_datatables_interaction_editing2.png)
![A complex, flexible edit dialog](http://material-design.storage.googleapis.com/publish/material_v_4/material_ext_publish/0B3mOPoJlxiFhZkY4b1VkME5QcXM/components_datatables_interaction_editing3.png)
![Icon-based edit affordance](http://material-design.storage.googleapis.com/publish/material_v_4/material_ext_publish/0B3mOPoJlxiFhazJZa2VmSU5ldTQ/components_datatables_interaction_editing4.png)

| Available        | Params                                         | ChildParams        | Type          | Details         |
| ---------------- | ---------------------------------------------- | ------------------ | ------------- | --------------- |
|:white_check_mark:| html-content                                   |                    | Boolean       | When the cell content is not a simple value (html content) |

## Example usage:
    <md-data-table
        selectable-rows="true"
        table-card="{title: Nutrition, actionIcons: true}">

        <md-data-table-header-row>
            <!-- defining column descriptions, align content to the left -->
            <md-data-table-column
                align-rule="left"
                column-definition="The total amount of food energy in the given serving size.">
                Dessert (100g serving)
            </md-data-table-column>

            <!-- in case of inline menu -->
            <md-data-table-column inline-menu="[ {iceCream: 'Ice Cream', pastry: 'Pastry', other: 'Other'} ]">Type</md-data-table-column>

            <!-- inline text editing -->
            <md-data-table-column editable-field="textInput">
                Calories
            </md-data-table-column>

            <!-- in case of sortable columns, we can set the defaultly sortable column -->
            <md-data-table-column sortable-rows-default>
                Fat (g)
            </md-data-table-column>
            <md-data-table-column>Carbs (g)</md-data-table-column>
            <md-data-table-column>Protein (g)</md-data-table-column>
        </md-data-table-header-row>

        <md-data-table-row ng-repeat="nutrition in nutritionList">
            <md-data-table-cell>Frozen Joghurt</md-data-table-cell>
            <md-data-table-cell>159</md-data-table-cell>
            <md-data-table-cell>6</md-data-table-cell>
            <md-data-table-cell>24</md-data-table-cell>
            <md-data-table-cell>4</md-data-table-cell>
            <md-data-table-cell>87</md-data-table-cell>
        </md-data-table-row>

    </md-data-table>
