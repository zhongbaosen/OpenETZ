import * as types from  '../constants/accountManageConstant'
import accountDBOpation from '../utils/accountDBOpation'
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
const passAccountsInfoAction = () => {
	const passStart = () => {
		return {
			type: types.PASS_ACCOUNTS_INFO_START,
			payload:{

			}
		}
	} 
	const passSuc = (data) => {
		return {
			type: types.PASS_ACCOUNTS_INFO_SUC,
			payload:{
				data
			}	
		}
	}
	const passFail = (msg) => {
		return {
			type: types.PASS_ACCOUNTS_INFO_FAIL,
			payload:{
				msg
			}
		}
	}
	return(dispatch,getState) => {
		dispatch(passStart())
		accountDBOpation.passAccountsInfo({
			passAccInfoSuc: (data) => {dispatch(passSuc(data))},
			passAccInfoFail: (msg) => {dispatch(passFail(msg))},
		})
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
	// const getInfo = () => {
	// 	return {
	// 		type: types.ON_IMPORT_ACCOUNT,
	// 		payload: {
	// 		}
	// 	}
	// }
	const importStart = () => {
		return {
			type: types.IMPORT_ACCOUNT_START,
			payload: {

			}
		}
	}
	const importSuc = (data) => {
		return {
			type: types.IMPORT_ACCOUNT_SUC,
			payload: {
				data
			}
		}
	}
	const importFail = (msg) => {
		return {
			type: types.IMPORT_ACCOUNT_FAIL,
			payload: {
				msg
			}
		}
	}
	return(dispatch,getState) => {
		dispatch(importStart())
		accountDBOpation.importAccount({
			parames: {
				privateKey: data.privateKey,
				privatePassword: data.privatePassword,
				privateUserName: data.privateUserName,
				type: data.type,
				mnemonicVal: data.mnemonicVal,
				mnemonicPsd: data.mnemonicPsd,
				mnemonicUserName: data.mnemonicUserName,
				keystoreVal: data.keystoreVal,
				keystoreUserName: data.keystoreUserName,
			},
			importSuccess: (data) => {dispatch(importSuc(data))},
			importFailure: (msg) => {dispatch(importFail(msg))}
		})
	}
}

const deleteAccountAction = (deleteId,accountsNum,curId) => {
	// const onDelete = () => {
	// 	return {
	// 		type: types.ON_DELETE_ACCOUNT,
	// 		payload: {
	// 			deleteId
	// 		}
	// 	}
	// }
	const onDelStart = () => {
		return {
			type: types.ON_DELETE_ACCOUNT_START,
			payload: {

			}
		}
	}
	const delSuc = (data) => {
		return {
			type: types.ON_DELETE_ACCOUNT_SUC,
			payload: {
				data
			}
		}
	}
	const delFail = (msg) => {
		return {
			type: types.ON_DELETE_ACCOUNT_FAIL,
			payload: {
				msg
			}
		}
	}
	return(dispatch,getState) => {
		// dispatch(onDelete())

		dispatch(onDelStart())
		accountDBOpation.deleteAccount({
			parames: {
				deleteId,
				accountsNum,
				curId,
			},
			delSuccess: (data) => {dispatch(delSuc(data))},
			delFailure: (msg) => {dispatch(delFail(msg))}
		})
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


const createAccountAction = (par) => {
	const onStart = () => {
		return {
			type: types.CREATE_ACCOUNT_START,
			payload: {
				
			}
		}
	}
	const createSucc = (data) => {
		return {
			type: types.CREATE_ACCOUNT_SUC,
			payload: {
				data
			}
		}
	}
	const createFail = (msg) => {
		return {
			type: types.CREATE_ACCOUNT_FAIL,
			payload: {
				msg
			}
		}
	}
	return(dispatch,getState) => {
		dispatch(onStart())
		accountDBOpation.createAccount({
			parames: {
				userNameVal: par.userNameVal,
				psdVal: par.psdVal,
				promptVal: par.promptVal,
			},
			createSuccess: (data) => {dispatch(createSucc(data))},
			createFailure: (msg) => {dispatch(createFail(msg))}
		})
	}
}


export {
	getAccountInfoAction,
	switchAccountAction,
	importAccountAction,
	deleteAccountAction,
	resetDeleteStatusAction,
	updateBackupStatusAction,
	passAccountsInfoAction,
	createAccountAction,
}