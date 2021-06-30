// 商品情報登録
// 引数　
// productName：登録する商品名

var registerDb = function (company, person) {

  var sql = '';
  var params = [];

  // メッセージの初期化
  refreshMessage();

  if (checkInputError(company, person)) {

    sql = 'insert into tblkokyaku (company,person) values (?,?)';
    params = [company, person];

    // トランザクション実行
    // transaction(callback, errorCallback, successCallback)

    db.transaction(
      function (tx) {
        tx.executeSql(sql, params);
      },
      // errorCallBack
      function (err) {
        error.push(REGISTER_NG_MESSAGE);
        showErrorMessage();
      },
      // successCallBack
      function () {
        success.push(REGISTER_OK_MESSAGE);
        showOKMessage();
        clearInput();
      }
    );
  } else {
    showErrorMessage();
  }
}