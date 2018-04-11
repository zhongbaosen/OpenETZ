import * as types from  '../constants/accountManageConstant'
const getAccountInfoAction = (info) => {
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
				privateKey: data.privateKey,
				privatePassword: data.privatePassword,
				privateUserName: data.privateUserName,
				type: data.type,
				mnemonicVal: data.mnemonicVal,
				mnemonicPsd: data.mnemonicPsd,
				mnemonicUserName: data.mnemonicUserName,
				keystoreVal: data.keystoreVal,
				keystoreUserName: data.keystoreUserName,
			}
		}
	}
	return(dispatch,getState) => {
		dispatch(getInfo())
	}
}

const deleteAccountAction = (deleteId) => {
	const onDelete = () => {
		return {
			type: types.ON_DELETE_ACCOUNT,
			payload: {
				deleteId
			}
		}
	}
	return(dispatch,getState) => {
		dispatch(onDelete())
	}
}

const resetDeleteStatusAction = () => {
	const onReset = () => {
		return {
			type: types.RESET_DELETE_STATUS,
		}
	}
	return(dispatch,getState) => {
		dispatch(onReset())
	}
}
const updateBackupStatusAction = (addr) => {
	const onUpdate = () => {
		return {
			type: types.UPDATE_BACKUP_STATUS,
			payload: {
				addr,
			}
		}
	}
	return(dispatch,getState) => {
		dispatch(onUpdate())
	}
}



export {
	getAccountInfoAction,
	switchAccountAction,
	importAccountAction,
	deleteAccountAction,
	resetDeleteStatusAction,
	updateBackupStatusAction,
}