// データベース名
const name = "nsw";
// データベースのバージョン
const version = "1.0";
// データベースの説明
const description = "tblkokyaku";
// データベースのサイズ
const size = 5 * 1024 * 1024;
// データベース接続
var db = openDatabase(name, version, description, size);
// 実行結果エリア
var messageArea = document.getElementById("message");
// 結果のフォームエリア
var resultForm = document.getElementById("result-form");
// テーブルエリア
var resultTable = document.getElementById("result-tbody");
// 結果エリア
var outputArea = document.getElementById("output");
// 成功メッセージを格納するリスト
var success = [];
// エラーメッセージを格納するリスト
var error = [];

// メッセージ
const SEARCH_OK_MESSAGE = "データが検索されました。";
const SEARCH_NG_MESSAGE = "データの検索に失敗しました。";
const SHOW_OK_MESSAGE = "データ一覧が表示されました。";
const SHOW_NG_MESSAGE = "データ一覧の表示に失敗しました。";
const REGISTER_OK_MESSAGE = "データが登録されました。";
const REGISTER_NG_MESSAGE = "データの登録に失敗しました。";
const UPDATE_OK_MESSAGE = "データが更新されました。";
const UPDATE_NG_MESSAGE = "データの更新に失敗しました。";
const DELETE_OK_MESSAGE = "データが削除されました。";
const DELETE_NG_MESSAGE = "データの削除に失敗しました。";
const CREATE_DB_OK_MESSAGE = "テーブルが作成されました。";
const CREATE_DB_NG_MESSAGE = "テーブルの作成に失敗しました。";
const DELETE_DB_OK_MESSAGE = "テーブルが削除されました。";
const DELETE_DB_NG_MESSAGE = "テーブルの削除に失敗しました。";

const ERROR_COMPANY_MAX = "会社名は40文字以下で入力してください。";
const ERROR_COMPANY_REQUIRED = "会社名は必須です。";
const ERROR_PERSON_MAX = "担当者名は20文字以下で入力してください。";
const ERROR_PRODUCT2_MAX = "会社名は40文字以下、担当者名は20文字以下で入力してください。";
const ERROR_PRODUCT3_MAX = "空白が入っています。";
const ERROR_PERSON_REQUIRED = "担当者名は必須です。";
const ERROR_ITEM = "項目が不正です。";
const ERROR_ORDER = "順序が不正です。";
const ERROR_CHECKBOX = "更新対象のデータがありません。";

// アウトプットの表示
var showOutput = function () {
	outputArea.classList.remove("d-none");
};

// アウトプットの表示
var hiddenOutput = function () {
	outputArea.classList.add("d-none");
};

//成功メッセージの表示
var clearInput = function () {
	var companyNameRegisterInput = document.getElementById("company");
	companyNameRegisterInput.value = "";
	var personNameRegisterInput = document.getElementById("person");
	personNameRegisterInput.value = "";
};

// メッセージエリアの初期化
var refreshMessage = function () {
	// メッセージリストの初期化
	success = [];
	error = [];

	while (messageArea.hasChildNodes()) {
		messageArea.removeChild(messageArea.firstChild);
	}
};

// 結果テーブルの初期化
var refreshTable = function () {
	while (resultTable.hasChildNodes()) {
		resultTable.removeChild(resultTable.firstChild);
	}
};

// エラーメッセージ表示
var showErrorMessage = function () {
	if (error.length > 0) {
		for (var i = 0; i < error.length; i++) {
			var messageDiv = document.createElement("div");
			messageDiv.className = "alert alert-warning";
			messageDiv.appendChild(document.createTextNode(error[i]));
			messageArea.appendChild(messageDiv);
		}
	}
};

//成功メッセージの表示
var showOKMessage = function () {
	if (success.length > 0) {
		for (var i = 0; i < success.length; i++) {
			var messageDiv = document.createElement("div");
			messageDiv.className = "alert alert-success";
			messageDiv.appendChild(document.createTextNode(success[i]));
			messageArea.appendChild(messageDiv);
		}
	}
};

//検索入力のバリデーション
var checkSearchError = function (company, person) {
	// 商品名の長さチェック
	if ((company.length > 40) && (person.length > 20)) {
		error.push(ERROR_PRODUCT2_MAX);
		return false;
	}

	if (company.length > 40) {
		error.push(ERROR_PRODUCT_MAX);
	}
	
	if(person.length > 20){
		error.push(ERROR_PRODUCT1_MAX);
	}

	
	if (error.length > 0) {
		// エラーがある場合はfalse
		return false;
	}
	return true;
};

//メッセージを表示する関数
var checkShowError = function (order) {
	// 順序入力チェック
	if (order != "降順" && order != "昇順") {
		error.push(ERROR_ORDER);
	}

	if (error.length > 0) {
		// エラーがある場合はfalse
		return false;
	}
	return true;
};

//メッセージを表示する関数
var checkInputError = function (company, person) {
	// 会社名チェック
	if (company.length <= 0) {
		error.push(ERROR_COMPANY_REQUIRED);
	} else if (company.length > 40) {
		error.push(ERROR_COMPANY_MAX);
	}

	//担当者名チェック
	if (person.length <= 0) {
		error.push(ERROR_PERSON_REQUIRED);
	} else if (person.length > 20) {
		error.push(ERROR_PERSON_MAX);
	}

	if (error.length > 0) {
		return false;
	}
	return true;
};

