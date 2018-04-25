import * as types from '../constants/tradingManageConstant'
import tradingDBOpation from '../utils/tradingDBOpation'
const insert2TradingDBAction = (data) => {
	const start = () => {
		return {
			type: types.SAVE_TO_RECORD_START,
			payload: {
				// tx_hash: data.tx_hash,
				// tx_value: data.tx_value,
				// tx_sender: data.tx_sender,
				// tx_receiver: data.tx_receiver,
				// tx_note: data.tx_note,
				// tx_token: data.tx_token,
				// tx_result: data.tx_result,
			}
		}
	}
	const suc = (sucdata) => {
		return {
			type: types.SAVE_TO_RECORD_SUC,
			payload: {
				sucdata
			}
		}
	}
	const fail = (msg) => {
		return {
			type: types.SAVE_TO_RECORD_FAIL,
			payload: {
				msg
			}
		}
	}
	return(dispatch,getState) => {
		dispatch(start()),
		tradingDBOpation.tradingSaveToRecord({
			parames: {
				data
			},
			saveSuccess: (sucdata) => {dispatch(suc(sucdata))},
			saveFail: (msg) => {dispatch(fail(msg))}
		})
	}
}


export {
	insert2TradingDBAction,
	
}