// 顧客情報更新
// 引数
// productName：更新する商品名

var updateDb = function () {
	var sql = "";
	var params = [];

	// 更新時のデータが不正な数
	var resultUpdateTableNGLength = 0;

	// アウトプット表示
	showOutput();

	// メッセージの初期化
	refreshMessage();
};

// 顧客情報検索
// 引数
// productName：検索した商品名

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

		if(company && person){
			// 会社名と担当者名が両方とも入力されている場合
			company = "%" + company + "%";
			person = "%" + person + "%";
			sql = "select id,company,person from tblkokyaku where company like ? and person like ?;";
			params = [company, person];
		}else if (company) {
			// 会社名が入力されている場合
			company = "%" + company + "%";
			sql = "select id,company, person from tblkokyaku where company like ?;";
			params = [company];
		}else if(person){
			// 担当者名が入力されている場合
			person = "%" + person + "%";
			sql = "select id,company, person from tblkokyaku where person like ?;";
			params = [person];
		}else {
			// 値が両方とも空の場合
			sql = "select id,company, person from tblkokyaku ;";
			params = [];
		}

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

		// idの取得
		productId = document.createElement("td");
		productId.appendChild(document.createTextNode(item.id));
		resultRow.appendChild(productId);

		// 会社名の取得
		companyName = document.createElement("td");
        companyName.appendChild(document.createTextNode(item.company));
        resultRow.appendChild(companyName);

        // 名前の取得
		personName = document.createElement("td");
        personName.appendChild(document.createTextNode(item.person));
        resultRow.appendChild(personName);
        

		// テーブルに一列追加
		resultTable.appendChild(resultRow);
	}
};
