// 顧客情報更新
// 引数
// company：更新する会社名

var updateDb = function () {
	var sql = "";
	var params = [];

	// 更新時のデータが不正な数
	var resultUpdateTableNGLength = 0;

	// アウトプット表示
	showOutput();

	// メッセージの初期化
	refreshMessage();

	var updateCheckboxes = document.getElementsByName("update-checkbox");
	var companyInput = document.getElementsByName("company");
	var personInput = document.getElementsByName("person");

	// トランザクション実行
	// transaction(callback, errorCallback, successCallback)

	db.transaction(
		function (tx) {
			for (var k = 0; k < updateCheckboxes.length; k++) {
				if (updateCheckboxes[k].checked) {
					if (!checkInputError(companyInput[k].value, personInput[k].value)) {
						resultTable.rows[k].className = "table-danger";
						resultUpdateTableNGLength++;
					}
				}
			}

			if (resultUpdateTableNGLength == 0) {
				for (var k = 0; k < updateCheckboxes.length; k++) {
					if (updateCheckboxes[k].checked) {
						tx.executeSql("update tblkokyaku set company = ?, person = ? where id = ?;", [
							companyInput[k].value,
							personInput[k].value,
							updateCheckboxes[k].value,
						]);
						resultTable.rows[k].className = "";
					}
				}
			}
		},
		// errorCallBack
		function (err) {
			// error.push(UPDATE_NG_MESSAGE);
			showErrorMessage();
		},

		// successCallBack
		function () {
			if (resultUpdateTableNGLength > 0) {
				//error.push(UPDATE_NG_MESSAGE);
				showErrorMessage();
			} else {
				success.push(UPDATE_OK_MESSAGE);
				showOKMessage();
			}
		}
	);
};

// 顧客情報検索
// 引数
// company：検索した会社名

var searchDbUpdate = function (company, person) {
	var sql = "";
	var params = [];

	// メッセージの初期化
	refreshMessage();
	// 表の初期化
	refreshTable();

	if (checkSearchError(company, person)) {
		// アウトプット表示
		showOutput();

		if (company && person) {
			// 会社名と担当者名が入力されている場合
			company = "%" + company + "%";
			person = "%" + person + "%";
			sql = "select id,company,person from tblkokyaku where company like ? and person like ?;";
			params = [company, person];
		} else if (company) {
			//　会社名のみが入力されている場合
			company = "%" + company + "%";
			sql = "select id,company,person from tblkokyaku where company like ?;";
			params = [company];
		} else if (person) {
			//　担当者名のみが入力されている場合
			person = "%" + person + "%";
			sql = "select id,company,person from tblkokyaku where person like ?;";
			params = [person];
		} else {
			// 値が両方とも空の場合
			sql = "select id,company,person from tblkokyaku;";
			params = [];
		}

		// トランザクション実行
		// transaction(callback, errorCallback, successCallback)
		db.transaction(
			function (tx) {
				// SQL実行
				tx.executeSql(sql, params, function (tx, results) {
					// 検索結果の表示
					addResultForUpdate(results);
				});
			},
			// errorCallBack
			function (err) {
				error.push(SEARCH_NG_MESSAGE);
				showErrorMessage();
				hiddenOutput();
			},
			// successCallBack
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

// 検索結果の項目
// results:SQLの実行結果

var addResultForUpdate = function (results) {
	for (var i = 0; i < results.rows.length; i++) {
		var item = results.rows.item(i);
		var resultRow = document.createElement("tr");

		// チェックフラグの設定
		var updateFlag = document.createElement("td");
		var updateCheckbox = document.createElement("input");
		updateCheckbox.value = item.id;
		updateCheckbox.type = "checkbox";
		updateCheckbox.name = "update-checkbox";
		updateFlag.appendChild(updateCheckbox);
		resultRow.appendChild(updateFlag);

		// idの取得
		var kokyakuId = document.createElement("td");
		kokyakuId.appendChild(document.createTextNode(item.id));
		resultRow.appendChild(kokyakuId);

		// 会社名の取得
		var resultCompany = document.createElement("td");
		var companyUpdate = document.createElement("input");
		companyUpdate.setAttribute("type", "text");
		companyUpdate.name = "company";
		companyUpdate.className = "form-control";
		companyUpdate.value = item.company;
		resultCompany.appendChild(companyUpdate);
		resultRow.appendChild(resultCompany);

		// 担当者名の取得
		var resultPerson = document.createElement("td");
		var personUpdate = document.createElement("input");
		personUpdate.setAttribute("type", "text");
		personUpdate.name = "person";
		personUpdate.className = "form-control";
		personUpdate.value = item.person;
		resultPerson.appendChild(personUpdate);
		resultRow.appendChild(resultPerson);


		// テーブルに一列追加
		resultTable.appendChild(resultRow);
	}
};
