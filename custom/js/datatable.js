(function($) {
    "use strict";

    var appended;
    $.fn.DataTable = function(options) {

        var opts = $.extend({}, defaults, options);
        var tbid = this[0].id;
        $("#" + this[0].id).addClass("data-table");

        this.initialize = function() {
            (opts.searching == true) ? this.search(): "";
            (opts.sorting == true) ? this.sort(): "";
            (opts.bordered == true) ? this.showborder(): "";
            (opts.paginate == true) ? this.doPagination(opts.pagesize): "";
            (opts.searchbox == true) ? this.showsearch(tbid): "";
            (opts.stripped == true) ? this.table_stripped(): "";
            (opts.hoverable == true) ? this.table_hover(): "";
            (opts.pagesize_adjust == true) ? this.showsizebox(): "";
            (opts.excel_themed == true) ? this.excelify(): "";
            return this;
        };

        this.table_hover = function() {
            $("#" + this[0].id).addClass("hoverable");
        };

        this.table_stripped = function() {
            $("#" + this[0].id).addClass("stripped");
        };

        this.doPagination = function(psize) {
            console.log(psize);
        };

        this.showborder = function() {
            $("#" + this[0].id).addClass("table-border");
        };

        var appendRow = function(table_name, section, pos, type = null) {
            var tbl = document.getElementById(table_name).getElementsByTagName(section)[0];
            var row = tbl.insertRow(pos);
            if (type == null) {
                for (h = 0; h < tbl.rows[1].cells.length; h++) {
                    $(row).append("<th class='borderless'>&nbsp;</th>");
                }
            }
            if (type == 'label') {
                var xchar = 65;
                $(row).append("<th>R/C</th>");
                for (var h = 0; h < tbl.rows[1].cells.length - 1; h++) {
                    $(row).append("<th>" + String.fromCharCode(xchar + h) + "</th>");
                }
            }
            if (type == "toolbar") {
                var tl = tbl.rows[1].cells.length - 6;
                $(row).append("<th class='borderless' colspan='3'>&nbsp;</th>");
                $(row).append("<th class='borderless' colspan='" + tl + "'>&nbsp;</th>");
                $(row).append("<th class='borderless' colspan='3'>&nbsp;</th>");
                showsearch(tbl);
                showsizebox(tbl);
                showtools(tbl);
            }
        };

        this.showsearch = function(tbl = null) {
            var txt = $("<input type='text' />");
            txt.addClass("search-box");
            txt.on('keyup', function() {
                $(document.getElementById(pid)).DataTable().search(this.value, opts.searchIndex);
            });
            if (!is_null(tbl)) {
                var pid = tbl.offsetParent.id;
                var tfcell = tbl.rows[0].cells[0];
                $(tfcell).append(txt);
            }

        };

        var showsizebox = function(tab) {
            var tid = tab.offsetParent.id;
            var tbcell = tab.rows[0].cells[2];
            var sizes = [10, 25, 30, 50, 100, 'all'];
            var ser = $("<select></select>");
            for (var t = 0; t < sizes.length; t++) {
                var opt = $("<option value='" + sizes[t] + "'>" + sizes[t] + "</option>");
                ser.append(opt);
            }
            ser.addClass("size-box");
            ser.on('change', function() {
                $(document.getElementById(tid)).DataTable().doPagination(this.value);
            });
            $(tbcell).append(ser);
        };

        var showtools = function(tl) {
            var sid = tl.offsetParent.id;
            var tolcell = tl.rows[0].cells[1];
            var pdf = $("<i></i>");
            var excel = $("<i></i>");
            var html = $("<i></i>");
            var print = $("<i></i>");
            pdf.addClass("fa fa-2x fa-cogs");
            excel.addClass("fa fa-2x fa-user");
            html.addClass("fab fa-2x fa-html5");
            print.addClass("fa fa-2x fa-print");
            $(tolcell).append(pdf);
            $(tolcell).append(excel);
            $(tolcell).append(html);
            $(tolcell).append(print);

        };

        var appendColumn = function(table_name, section, idx) {
            var tbl = document.getElementById(table_name);
            var rows = $("#" + table_name + " " + section + " tr");
            for (var k = 0; k < rows.length; k++) {
                if (section == "thead") {
                    appended = k + 2;
                    $(rows[k]).prepend("<th>" + (k + 1) + "</th>");
                } else if (section == 'tbody') {
                    $(rows[k]).prepend("<td>" + (k + appended) + "</td>");
                } else {
                    //discard footer;
                }
            }
        };

        var deleteRow = function(table_name, section, pos) {
            var tbl = document.getElementById(table_name).getElementsByTagName(section)[0];
            tbl.deleteRow(pos);
        };

        this.excelify = function() {
            var xlsid = this[0].id;
            appendColumn(xlsid, 'thead', 0);
            appendColumn(xlsid, 'tbody', 0);
            appendRow(xlsid, 'thead', 0, 'label');
            appendRow(xlsid, 'thead', 0);
            appendRow(xlsid, 'thead', 0, 'toolbar');
            $("#" + xlsid).addClass("xls");
        };

        this.sort = function() {
            var sortid = this[0].id;
            var table_header = $("#" + this[0].id + " thead tr th");
            $(table_header).each(function(idx) {
                var sortIcon = document.createElement("i");
                sortIcon.className = "fas fa-sort";

                sortIcon.addEventListener('click', function() {
                    $(document.getElementById(sortid)).DataTable().sorting(idx);
                });
                $(this).append(sortIcon);
            });
        };

        this.sorting = function(obj) {
            var rows, switching, i, x, y, shouldSwitch;
            var sortId = this[0].id;
            var table = document.getElementById(sortId);
            var body = table.getElementsByTagName("tbody")[0];
            rows = body.getElementsByTagName("tr");

            switching = true;

            while (switching) {
                switching = false;
                for (i = 0; i < (rows.length - 1); i++) {
                    shouldSwitch = false;

                    x = rows[i].getElementsByTagName("td")[obj].innerHTML;
                    y = rows[i + 1].getElementsByTagName("td")[obj].innerHTML;
                    if (x > y) {
                        shouldSwitch = true;
                        break;
                    }
                }

                if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                }
            }
        };

        this.search = function(txtIn = "", columnIndex = 1) {
            var objid = this[0].id;
            var table = document.getElementById(objid);
            var tr = table.getElementsByTagName("tr");
            for (var i = 0; i < tr.length; i++) {
                var td = tr[i].getElementsByTagName("td")[columnIndex];
                if (td) {
                    var txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(txtIn.toUpperCase()) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        };
        return this.initialize();
    }
    var defaults = {
        searching: false,
        sorting: false,
        bordered: false,
        paginate: false,
        pagesize: 25,
        searchbox: false,
        striped: false,
        hoverable: false,
        pagesize_adjust: false,
        excel_themed: false,
        searchIndex: 1,
    };
})(jQuery);