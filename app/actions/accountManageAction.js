import * as types from  '../constants/accountManageConstant'
const getAccountInfoAction = (info) => {
	console.log('5555555555555',info)
	const getInfo = () => {
		return {
			type: types.GET_ACCOUNT_INFO,
			payload: {
				info,
			}
		}
	}
	return(dispatch,getState) => {
		dispatch(getInfo())
	}
}

const switchAccountAction = (addr) => {
	const getInfo = () => {
		return {
			type: types.ON_SWITCH_ACCOUNT,
			payload: {
				addr,
			}
		}
	}
	return(dispatch,getState) => {
		dispatch(getInfo())
	}
}
const importAccountAction = (data) => {
	const getInfo = () => {
		return {
			type: types.ON_IMPORT_ACCOUNT,
			payload: {
				privKey: data.privKey,
				password: data.password,
				userName: data.userName,
			}
		}
	}
	return(dispatch,getState) => {
		dispatch(getInfo())
	}
}
export {
	getAccountInfoAction,
	switchAccountAction,
	importAccountAction,
}