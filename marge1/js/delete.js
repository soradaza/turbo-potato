var deleteDb = function () {
    var sql = "";
    var params = [];

    showOutput();

    refreshMessage();

    var deleteCheckboxes = document.getElementsByName("delete-checkbox");

    db.transaction(
        function (tx) {
            for (var k = 0; k < deleteCheckboxes.length; k++) {
                if (deleteCheckboxes[k].checked) {
                    tx.executeSql("delete from tblkokyaku where id = ?;", [
                        deleteCheckboxes[k].value,
                    ]);
                    resultTable.rows[k].className = "";
                    outputArea.classList.add("d-none");

                }
            }

        },
        function (err) {
            error.push(DELETE_NG_MESSAGE);
            showErrorMessage();
        },

        function () {
            success.push(DELETE_OK_MESSAGE);
            showOKMessage();
            clearInput();
        }
    );
};

var searchDbDelete = function (company, person) {
    var sql = "";
    var params = [];


    refreshMessage();
    refreshTable();

    if (checkSearchError(company, person)) {
        showOutput();

        if (company && person) {
            company = "%" + company + "%";
            person = "%" + person + "%";
            sql = "select id,company,person from tblkokyaku where company like ? and person like ?;";
            params = [company, person];
        } else if (company) {
            company = "%" + company + "%";
            sql = "select id,company,person from tblkokyaku where company like ?;";
            params = [company];
        } else if (person) {
            person = "%" + person + "%";
            sql = "select id,company,person from tblkokyaku where person like ?;";
            params = [person]
        } else {
            sql = "select id,company,person from tblkokyaku;";
            params = [];
        }

        db.transaction(
            function (tx) {
                tx.executeSql(sql, params, function (tx, results) {
                    addResultForDelete(results);
                });
            },
            function (err) {
                error.push(SEARCH_NG_MESSAGE);
                showErrorMessage();
                hiddenOutput();
            },
            function () {
                success.push(SEARCH_OK_MESSAGE);
                showOKMessage();
            }
        );
    } else {
        showErrorMessage();
        hiddenOutput();
    }

};

var addResultForDelete = function (results) {
    for (var i = 0; i < results.rows.length; i++) {
        var item = results.rows.item(i);
        var resultRow = document.createElement("tr");
        var deleteFlag = document.createElement("td");
        var deleteCheckbox = document.createElement("input");
        deleteCheckbox.value = item.id;
        deleteCheckbox.type = "checkbox";
        deleteCheckbox.name = "delete-checkbox";
        deleteFlag.appendChild(deleteCheckbox);
        resultRow.appendChild(deleteFlag);
        id = document.createElement("td");
        id.appendChild(document.createTextNode(item.id));
        resultRow.appendChild(id);

        var resultCompany = document.createElement("td");
        resultCompany.appendChild(document.createTextNode(item.company));
        resultRow.appendChild(resultCompany);

        var resultPerson = document.createElement("td");
        resultPerson.appendChild(document.createTextNode(item.person));
        resultRow.appendChild(resultPerson);
        resultTable.appendChild(resultRow);

    }

};
