// テーブル作成
var createDb = function () {

  // メッセージの初期化
  refreshMessage();

  sql = 'create table tblkokyaku(id integer not null primary key autoincrement,company,person );';
  params = [];

  // トランザクション実行
  // transaction(callback, errorCallback, successCallback)
  db.transaction(
    function (tx) {
      tx.executeSql(sql, []);
    },

    // errorCallBack
    function (err) {
      error.push(CREATE_DB_NG_MESSAGE);
      showErrorMessage();
    },
    // successCallBack
    function () {
      success.push(CREATE_DB_OK_MESSAGE);
      showOKMessage();
    }
  );

};

var deleteDb = function () {



  // メッセージの初期化
  refreshMessage();

  sql = 'drop table tblkokyaku;';
  params = [];

  // トランザクション実行
  // transaction(callback, errorCallback, successCallback)
  db.transaction(
    function (tx) {
      tx.executeSql(sql, []);
    },

    // errorCallBack
    function (err) {
      error.push(DELETE_DB_NG_MESSAGE);
      showErrorMessage();
    },
    // successCallBack
    function () {
      success.push(DELETE_DB_OK_MESSAGE);
      showOKMessage();
    }
  );

};