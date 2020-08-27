import _ from 'lodash'

// XXX投顾老师的XXX产品今日调出6*****（或3*****/0*****）股票，股票在池时间XX天，点击了解更多产品详情！
  // XXX投顾老师的XXX产品今日调入6*****（或3*****/0*****）股票，点击了解更多产品详情！
  // XXX投顾老师的XXX产品今日调出6*****（或3*****/0*****）股票，股票在池时间XX天；调入6*****（或3*****/0*****）股票，点击了解更多产品详情！

// const test = rows => {
//   const rowsStr = '';
//   for (const row of rows) {
//     let fixStr = '';
//     let operStr = dict.TIPS_OPER_TYPE[row.type];
//     if (row.type === 3) {
//       const winDiff = row.adjustWinLimit - row.stopWinLimit;
//       const lostDiff = row.adjustLossLimit - row.stopLossLimit;
//       if (winDiff !== 0) {
//         operStr = winDiff > 0 ? '调高' : '调低';
//         fixStr = `止盈位${Number(row.stopWinLimit).toFixed(2)}至${Number(row.adjustWinLimit).toFixed(2)}`;
//       }
//       if (lostDiff !== 0) {
//         operStr = lostDiff > 0 ? '调高' : '调低';
//         fixStr = `止损位${Number(row.stopLossLimit).toFixed(2)}至${Number(row.adjustLossLimit).toFixed(2)}`;
//       }
//       return `${operStr} ${row.stockName}（${row.stockCode}） ${fixStr}`;
//     }
//     if (row.type === 2) {
//       const stayDay = 0;
//       fixStr = `股票在池时间${stayDay}天`;
//     }
//     return `${operStr} ${row.stockName}（${row.stockCode.substr(0, 1)}*****） ${fixStr}`;
//   }
// };

const arr = [{
	"id": 0,
	"contentId": 1472,
	"stockCode": "002312",
	"stockName": "三泰控股",
	"stopLossLimit": 12,
	"stopWinLimit": 122,
	"type": 3,
	"adjustLossLimit": 12,
	"adjustWinLimit": 111,
	"createTime": "2020-05-29 16:01:39"
}, {
	"id": 0,
	"contentId": 1472,
	"stockCode": "002312",
	"stockName": "三泰控股",
	"stopLossLimit": 12,
	"stopWinLimit": 122,
	"type": 3,
	"adjustLossLimit": 11,
	"adjustWinLimit": 122,
	"createTime": "2020-05-29 16:01:39"
}, {
	"id": 0,
	"contentId": 1472,
	"stockCode": "300419",
	"stockName": "浩丰科技",
	"stopLossLimit": 123,
	"stopWinLimit": 321,
	"type": 3,
	"adjustLossLimit": 123,
	"adjustWinLimit": 222,
	"createTime": "2020-05-29 16:01:39"
}, {
	"id": 0,
	"contentId": 1472,
	"stockCode": "300419",
	"stockName": "浩丰科技",
	"stopLossLimit": 123,
	"stopWinLimit": 321,
	"type": 3,
	"adjustLossLimit": 111,
	"adjustWinLimit": 321,
	"createTime": "2020-05-29 16:01:39"
}, {
	"id": 0,
	"contentId": 1472,
	"stockCode": "002571",
	"stockName": "德力股份",
	"stopLossLimit": 1,
	"stopWinLimit": 111,
	"type": 1,
	"adjustLossLimit": 0,
	"adjustWinLimit": 0,
	"createTime": "2020-05-29 16:01:39"
}, {
	"id": 0,
	"contentId": 1472,
	"stockCode": "300228",
	"stockName": "富瑞特装",
	"stopLossLimit": 333,
	"stopWinLimit": 555,
	"type": 1,
	"adjustLossLimit": 0,
	"adjustWinLimit": 0,
	"createTime": "2020-05-29 16:01:39"
}]

console.log( _.groupBy(arr, item => item.type) )