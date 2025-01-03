export default function (value) {

    var sortBy = value.pagination.sortBy;
    var descending = value.pagination.descending;
    var page = value.pagination.page;
    var rowsPerPage = value.pagination.rowsPerPage;

    var filter = value.filter ? value.filter : '';

    var sortByField = sortBy

    if (descending == true) {
        sortByField = '-' + sortByField
    }

    var offset = (page - 1) * rowsPerPage

    var params = {
                    limit: rowsPerPage <= 0 ? 999999999 : rowsPerPage,//rows_per_page 0 means show all
                    offset: offset,
                    ordering: sortByField,
                    search: filter
                };

    return params;

}
