import * as types from '../constants/tokenManageConstant'
import tokenDBOpation from '../utils/tokenDBOpation'
const insertToTokenAction = (addr) => {
	const onInsert = () => {
		return {
			type: types.INSERT_TO_TOKEN_DB,
			payload: {	
				currentAddress: addr
			}
		}
	}
	return(dispatch,getState) => {
		dispatch(onInsert())
	}
}
const gloablTokenList = (list) => {
	const getList = () => {
		return {
			type: types.GLOBAL_TOKEN_LIST,
			payload: {
				list
			}
		}
	}
	return (dispatch,getState) => {
		dispatch(getList())
	}
}
const fetchTokenAction = (addr) => {
	const onFetchStart = () => {
		return {
			type: types.FETCH_TOKEN_LIST,
			payload: {
				addr
			}
		}
	}
	const suc = (list) => {
		return {
			type: types.FETCH_TOKEN_LIST_SUC,
			payload: {
				list
			}	
		}
	}
	const err = () => {
		return {
			type: types.FETCH_TOKEN_LIST_ERR,
			payload: {

			}	
		}
	}
	return (dispatch,getState) => {
		dispatch(onFetchStart())
		tokenDBOpation.fetchToken({
			parames: {
				addr
			},
			fetchTokenSuccess: (list) => {dispatch(suc(list))},
			fetchTokenFail: (msg) => {dispatch(err(msg))}
		})
	}
}
const getAssetsListAction = () => {
	const onGet = () => {
		return {
			type: types.GET_ASSETS_LIST,
		}
	}
	return(dispatch,getState) => {
		dispatch(onGet())
	}
}


const deleteSelectedToListAction = (delAddr) => {
	const onDelete = () => {
		return {
			type: types.DELETE_TOKEN_LIST,
			payload:{
				delAddr,
			}
		}
	}
	
	return(dispatch,getState) => {
		tokenDBOpation.deleteSelectedToken({
			parames: {
				delAddr
			},
			deleteSelected: (data) => {dispatch(onDelete(data))}
		})
	}
}

const addSelectedToListAction = (addAddr) => {
	const onAdd = () => {
		return {
			type: types.ADD_TOKEN_LIST,
			payload:{
				addAddr
			}
		}
	}
	return(dispatch,getState) => {
		tokenDBOpation.addSelectedToken({
			parames: {
				addAddr
			},
			addSelected: (data) => {dispatch(onAdd(data))}
		})
	}
}
const initSelectedListAction = () => {
	const onInitSel = (data) => {
		return {
			type: types.INIT_SELECTED_LIST,
			payload: {
				data
			}
		}
	}
	return(dispatch,getState) => {
		tokenDBOpation.initSelectedToken({
			parames: {

			},
			initSelectedTokenList: (data) => {dispatch(onInitSel(data))}
		})
	}
}

const refreshTokenAction = (addr,tokenlist) => {
	const onRef = () => {
		return {
			type: types.REFRESH_TOKEN_INFO,
			payload:{
				addr
			}
		}
	}
	const suc = (data) => {
		return {
			type: types.REFRESH_TOKEN_SUCCESS,
			payload: {
				data
			}
		}
	}
	const fail = (msg) => {
		return {
			type: types.REFRESH_TOKEN_FAIL,
			payload: {
				msg
			}
		}
	}
	return(dispatch,getState) => {
		dispatch(onRef())
		tokenDBOpation.tokenRefresh({
			parames:{
				addr,
				tokenlist
			},
			refreshSuccess: (data) => { dispatch(suc(data))},
			refreshFail: (msg) => { dispatch(fail(msg))}
		})
	}
}

const switchTokenAction = (addr) => {
	const onSwitchStart = () => {
		return {
			type:types.SWITCH_TOKEN_LIST_START,
		}
	}
	const onSwitch = (data) => {
		return {
			type: types.SWITCH_TOKEN_LIST,
			payload: {
				data
			}
		}
	}
	return(dispatch,getState) => {
		dispatch(onSwitchStart())
		tokenDBOpation.switchTokenList({
			parames: {
				addr
			},
			switchTokenSuc: (data) => { dispatch(onSwitch(data))}
		})
	}
}
export {
	insertToTokenAction,
	getAssetsListAction,
	deleteSelectedToListAction,
	addSelectedToListAction,
	initSelectedListAction,
	refreshTokenAction,
	fetchTokenAction,
	gloablTokenList,
	switchTokenAction,
}