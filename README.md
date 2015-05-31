# md-data-table
Angular data table implementation of google material design.

# google data table specification
http://www.google.com/design/spec/components/data-tables.html

# Basic idea (not finalized yet, if you have improvement ideas, let me know)

      <md-data-table
          selectable-rows="true"
          sortable-columns="true"
          column-overflow-handler="useHorizontalScrollingOnTable|truncateColumnNames"
          table-card="{title: Nutrition, actionIcons: true|false, pagination: true|false, paginationLabels: true|false}"
          alternate-headers="persistentActions|contextual">

          <!-- defining column descriptions -->
          <md-data-table-column column-definition="The total amount of food energy in the given serving size.">
              Dessert (100g serving)
          </md-data-table-column>

          <!-- inline text editing -->
          <md-data-table-column editable-field="textInput|smallEditDialog|largeEditDialog|editIcon">
              Calories
          </md-data-table-column>

          <!-- in case of inline menu -->
          <md-data-table-column inline-menu="[ {iceCream: 'Ice Cream', pastry: 'Pastry', other: 'Other'} ]">
              Type
          </md-data-table-column>
    
          <md-data-table-column>Fat (g)</md-data-table-column>
          <md-data-table-column>Carbs (g)</md-data-table-column>
          <md-data-table-column>Protein (g)</md-data-table-column>
</md-data-table>


# Milestones
- Structure
- Interaction
- Tables within cards
