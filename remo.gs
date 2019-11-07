var access_token = ''// NatureRemnoのトークン
var spreadsheetId = ''// スプレッドシートのID

function remo() {
  var data = getNatureRemoData();　　　　//data取得
  var datetime = new Date();
   
  // 複数台対応
  for(var i=0 ;i <= data.length-1 ; i++){
    var lastData = getLastData();　　　　　//最終date取得
    setLaremoData(
      {
        datetime:datetime,
        na:data[i].name,                   //名前
        te:data[i].newest_events.te.val,　　//温度
        hu:data[i].newest_events.hu.val,　　//湿度
        il:data[i].newest_events.il.val,　　//照度
        mo:data[i].newest_events.mo.val,　　//モーション        
        te_datetime:data[i].newest_events.te.created_at,　　//温度日時
        hu_datetime:data[i].newest_events.hu.created_at,　　//湿度日時
        il_datetime:data[i].newest_events.il.created_at,　　//照度日時
        mo_datetime:data[i].newest_events.mo.created_at,　　//モーション日時        
      },
      lastData.row + 1//最終data追加作業
    );
  }
}

function getNatureRemoData() {
  var url = "https://api.nature.global/1/devices";
  var headers = {
    "Content-Type" : "application/json;",
    'Authorization': 'Bearer ' + access_token,
  };

  var postData = {

  };

  var options = {
    "method" : "get",
    "headers" : headers,
  };

  var data = JSON.parse(UrlFetchApp.fetch(url, options));
  Logger.log(data[0].updated_at)
  Logger.log(data[0].newest_events.te.created_at)
  Logger.log(data[0].newest_events.hu.created_at)
  Logger.log(data[0].newest_events.il.created_at) 

  return data;

}

function getLastData() {
  var datas = SpreadsheetApp.openById(spreadsheetId).getSheetByName('log').getDataRange().getValues()　　
  var data = datas[datas.length - 1]

  return {
    totalpoint:data[1],
    coupon:data[2],
    row:datas.length,
  }
}

function setLaremoData(data, row) {
  SpreadsheetApp.openById(spreadsheetId).getSheetByName('log').getRange(row, 1).setValue(data.datetime)//A2に実行日時
  SpreadsheetApp.openById(spreadsheetId).getSheetByName('log').getRange(row, 2).setValue(data.na)　　//B2に名前追加
  SpreadsheetApp.openById(spreadsheetId).getSheetByName('log').getRange(row, 3).setValue(data.te)　　//C2に温度追加
  SpreadsheetApp.openById(spreadsheetId).getSheetByName('log').getRange(row, 4).setValue(data.hu)　　//D2に湿度追加(幅があるけど気にしない)
  SpreadsheetApp.openById(spreadsheetId).getSheetByName('log').getRange(row, 5).setValue(data.il)　　//E2に照度追加
  SpreadsheetApp.openById(spreadsheetId).getSheetByName('log').getRange(row, 6).setValue(data.mo)　　//E2に照度追加  
  SpreadsheetApp.openById(spreadsheetId).getSheetByName('log').getRange(row, 7).setValue(data.te_datetime)　　//C2に温度追加
  SpreadsheetApp.openById(spreadsheetId).getSheetByName('log').getRange(row, 8).setValue(data.hu_datetime)　　//D2に湿度追加(幅があるけど気にしない)
  SpreadsheetApp.openById(spreadsheetId).getSheetByName('log').getRange(row, 9).setValue(data.il_datetime)　　//E2に照度追加
  SpreadsheetApp.openById(spreadsheetId).getSheetByName('log').getRange(row, 10).setValue(data.mo_datetime)　　//E2に照度追加  
}
