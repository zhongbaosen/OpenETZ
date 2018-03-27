import { GET_LOCAL_KEY_STORE } from  '../constants/getLocalDataConstant'
const getLocalDataAction = (store,name) => {
	const getLocalDate = () => {
		return {
			type: GET_LOCAL_KEY_STORE,
			payload: {
				keyStore: store,
				name,
			}
		}
	}
	return(dispatch,getState) => {
		dispatch(getLocalDate())
	}
}
export {
	getLocalDataAction
}