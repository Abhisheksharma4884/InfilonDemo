import { takeEvery, call, put } from 'redux-saga/effects'
import {getTableData} from '../api/api';

function* fetchTable(action) {
   try {
      const data = yield call(getTableData);
      console.log("data:", data);
      yield put({type: "GET_TABLE_DATA_ASYNC", payload: data});
   } catch (e) {
      console.log("Error fetching table data");
   }
}

function* mySaga() {
  yield takeEvery("GET_TABLE_DATA", fetchTable);
}

export default mySaga;