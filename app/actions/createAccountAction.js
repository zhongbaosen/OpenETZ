import { CREATE_ACCOUNT } from '../constants/createAccountConstant'
const createAccountAction = (parames) => {
	const onCreate = () => {
		return {
			type: CREATE_ACCOUNT,
			payload: {
				userNameVal: parames.userNameVal,
				psdVal: parames.psdVal,
				promptVal: parames.promptVal,
			}
		}
	}
	return(dispatch,getState) => {
		dispatch(onCreate())
	}
}


export {
	createAccountAction,
	
}