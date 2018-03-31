import * as types from '../constants/tradingManageConstant'
const insert2TradingDBAction = (data) => {
	const onInsert = () => {
		return {
			type: types.INSERT_TO_DB,
			payload: {
				tx_hash: data.tx_hash,
				tx_value: data.tx_value,
				tx_sender: data.tx_sender,
				tx_receiver: data.tx_receiver,
				tx_note: data.tx_note,
			}
		}
	}
	return(dispatch,getState) => {
		dispatch(onInsert())
	}
}


export {
	insert2TradingDBAction,
	
}