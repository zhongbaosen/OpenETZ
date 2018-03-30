import { GET_TRANDING_RECEIPT } from '../constants/trandingConstant'
const tradingAction = (hash) => {
	const onTranding = () => {
		return {
			type: GET_TRANDING_RECEIPT,
			payload: {
				hash
			}
		}
	}
	return(dispatch,getState) => {
		dispatch(onTranding())
	}
}


export {
	tradingAction,
	
}