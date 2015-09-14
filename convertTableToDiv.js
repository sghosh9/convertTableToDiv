$.fn.convertTableToDiv = function() {
    // Lets use vars for $(this), its id and class.
    this_table = $(this);
    this_table_id = (this_table.attr('id') === undefined) ? 'TableToDiv' : 'TableToDiv-' + this_table.attr('id');
    this_table_class = (this_table.attr('class') === undefined) ? '' : this_table.attr('class');

    // Here you go, inserting our div placeholder for all the table data.
    new_TableToDiv = $('<div id="' + this_table_id + '" class="' + this_table_class + '"></div>').insertBefore(this_table);

    // It's time to parse through the table looking for rows. We are intentionally excluding the head
    // because we will use its text as data labels.
    this_table.find('tbody tr').each(function(i){
        // Holding the current row in a var.
        this_row = $(this);
        // Creating the group wrapper here to stash in all the related data.
        $("<div/>", { class: "table-group table-group-"+ i}).appendTo("#" + this_table_id);

        // And finally parse the row for cells and capture it's data and throw them in the current group.
        this_row.find('td').each(function(j){
            // Again, holding the current cell.
            this_cell = $(this);

            // Let's create the html for the group.
            // 1. the wrapper div. Yeah, we'll use the cell classes here.
            this_cell_class = this_cell.attr('class') === undefined) ? '' : this_cell.attr('class');;
            group_html = '<div class="' + this_cell_class + '">';
            // 2. next,the label. We'll use the corresponding table head value.
            group_html += '<span class="table-group-entry-label">' + this_table.find('thead th').eq(j).text() + '</span>';
            // 3. the data. Simple.
            group_html += '<div class="table-group-entry-data">' + this_cell.html() + '</div>';;
            // 4. close it ofcourse!
            group_html += '</div>';
            // And, we append all of that cell content in the group
            $('#' + this_table_id + ' .table-group-' + i).append(group_html);
        });
    });
    // Well, I am assuming we would like to hide the original table.
    this_table.hide();

    // Let's just return the new element!
    return new_TableToDiv;
};
