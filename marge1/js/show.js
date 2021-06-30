// 顧客情報一覧表示
// 引数
// order：順序
// selectName：会社名か担当者名
var showDb = function (order, selectName) {
	var sql = "";
	var params = [];

	// 出力の表示
	showOutput();

	// メッセージの初期化
	refreshMessage();
	// 検索結果テーブルの初期化
	refreshTable();

	if (checkShowError(order)) {
		showOutput();

		if (selectName == "会社名") {
			if (order == "昇順") {
				sql = "select id,company,person from tblkokyaku order by company asc;";
			}
			if (order == "降順") {
				sql = "select id,company,person from tblkokyaku order by company desc;";
			}

		} else if (selectName == "担当者名") {
			if (order == "昇順") {
				sql = "select id,company,person from tblkokyaku order by person asc;";
			}
			if (order == "降順")
				sql = "select id,company,person from tblkokyaku order by person desc;";
		}

		// トランザクション実行
		// transaction(callback, errorCallback, successCallback)

		db.transaction(
			function (tx) {
				// SQL実行
				tx.executeSql(sql, params, function (tx, results) {
					// 検索結果のレコード数の回数を繰り返す
					for (i = 0; i < results.rows.length; i++) {
						// tableに1レコードづつ追加
						resultTable.appendChild(searchItem(results.rows[i]));
					}
				});
			},
			// errorCallBack
			function (err) {
				error.push(SHOW_NG_MESSAGE);
				showErrorMessage();
			},
			// successCallBack
			function () {
				success.push(SHOW_OK_MESSAGE);
				showOKMessage();
			}
		);

		// checkShowError(order)のFalse
	} else {
		showErrorMessage();
	}
};

// 検索結果の一項目

var searchItem = function (resultList) {
	var resultItem = document.createElement("tr");

	// idの取得
	productId = document.createElement("td");
	productId.appendChild(document.createTextNode(resultList.id));
	resultItem.appendChild(productId);

	// 会社名の取得
	var company = document.createElement("td");
	company.appendChild(
		document.createTextNode(resultList.company)
	);
	resultItem.appendChild(company);

	// 担当者名の取得
	var person = document.createElement("td");
	person.appendChild(
		document.createTextNode(resultList.person)
	);
	resultItem.appendChild(person);

	return resultItem;
};
