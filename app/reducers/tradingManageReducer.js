import * as types from '../constants/tradingManageConstant'
import TradingSQLite from '../utils/tradingDB'
import UserSQLite from '../utils/accountDB'
const tradingSqLite = new TradingSQLite()  
let t_db

const sqLite = new UserSQLite();  
let db  

const initState = {
	saveRecordSuc: false
}
export default function tradingManageReducer (state = initState,action) {
	switch(action.type){
		case types.SAVE_TO_RECORD_START:
			return saveStart(state,action)
			break
    case types.SAVE_TO_RECORD_SUC:
      return saveSuc(state,action)
      break
    case types.SAVE_TO_RECORD_FAIL:
      return saveFail(state,action)
      break
		default:
			return state
			break

	}
}

const saveSuc = (state,action) => {
  return {
    ...state,
    saveRecordSuc: true
  }
}
const saveFail = (state,action) => {
  return {
    ...state,
    saveRecordSuc: false
  }
}
const saveStart = (state,action) => {
	return state
}