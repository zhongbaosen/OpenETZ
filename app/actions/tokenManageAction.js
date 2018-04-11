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
// const selectedTokenListAction = (sele) => {
// 	console.log('发出的action',sele)
// 	const list = () => {
// 		return {
// 			type: types.SELECTED_TOKEN_LIST,
// 			payload:{
// 				sele
// 			}
// 		}
// 	}
// 	return(dispatch,getState) => {
// 		dispatch(list())
// 	}
// }

const deleteSelectedToListAction = (delAddr,asList) => {
	const onDelete = () => {
		return {
			type: types.DELETE_TOKEN_LIST,
			payload:{
				delAddr,
				asList
			}
		}
	}
	return(dispatch,getState) => {
		dispatch(onDelete())
	}
}

const addSelectedToListAction = (addAddr,asList) => {
	const onAdd = () => {
		return {
			type: types.ADD_TOKEN_LIST,
			payload:{
				addAddr,
				asList
			}
		}
	}
	return(dispatch,getState) => {
		dispatch(onAdd())
	}
}
const initSelectedListAction = (data,addr) => {
	// console.log('initSelectedListAction',data)
	// console.log('initSelectedListAction',addr)
	const onInit = () => {
		return {
			type: types.INIT_SELECTED_LIST,
			payload: {
				initList: data,
				curAddr: addr
			}
		}
	}
	return(dispatch,getState) => {
		dispatch(onInit())
	}
}

const refreshTokenInfoAction = (addr) => {
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
	return(dispatch,getState) => {
		dispatch(onRef())
		tokenDBOpation.refresh({
			parames:{
				addr,
			},
			refreshSuccess: (data) => { dispatch(suc(data))}
		})
	}
}
export {
	insertToTokenAction,
	getAssetsListAction,
	deleteSelectedToListAction,
	addSelectedToListAction,
	initSelectedListAction,
	refreshTokenInfoAction,
}