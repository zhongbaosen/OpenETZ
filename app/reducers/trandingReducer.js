

import { GET_TRANDING_RECEIPT } from '../constants/trandingConstant'

const initState = {
	blockNum: 0,
	fromAddress: '',
	toAddress: '',
}
export default function trandingReducer (state = initState,action) {
	switch(action.type){
		case 'GET_TRANDING_RECEIPT':
			return getTraningReceipt(state,action)
			break
		default:
			return state
			break

	}
}

const getTraningReceipt = (state,action) => {
	const { hash } = action.payload
	let block = 0,
		sender = '',
		receiver = '';
	let res = web3.eth.getTransactionReceipt(hash)

	// block = res.blockNumber
	// sender = res.from
	// receiver = res.to

	console.log('res.blockNumber==',res.blockNumber)
	return {
		...state,
		blockNum: res.blockNumber,
		fromAddress: res.from,
		toAddress: res.to,
	} 
}