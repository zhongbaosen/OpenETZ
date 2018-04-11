import * as types from '../constants/tokenManageConstant'
import TokenSQLite from '../utils/tokenDB'
import { contractAbi } from '../utils/contractAbi'
const tkSqLite = new TokenSQLite()
let tk_db

const initState = {
	isLoading: true,
	assetsList: [],
	selectedList: [],
	refreshEnd: false
}


export default function tokenManageReducer(state=initState,action){
	switch(action.type){
		case types.INSERT_TO_TOKEN_DB:
			return onInsterDB(state,action)
			break
		case types.GET_ASSETS_LIST:
			return getAssetsList(state,action)
			break
		// case types.SELECTED_TOKEN_LIST:
		// 	return onSelectedList(state,action)
		// 	break
		case types.DELETE_TOKEN_LIST:
			return onDelSelected(state,action)
			break
		case types.ADD_TOKEN_LIST:
			return onAddSelected(state,action)
			break
		case types.INIT_SELECTED_LIST:
			return onInitSelectedList(state,action)
			break
		case types.REFRESH_TOKEN_INFO:
			return onRefresh(state,action)
			break
		case types.REFRESH_TOKEN_SUCCESS:
			return onRefreshSuc(state,action)
			break
		default:
			return state
			break
	}
}
const onInitSelectedList = (state,action) => {
	const { initList,curAddr } = action.payload
	return {
		...state,
		selectedList: initList
	}
}
const onDelSelected = (state,action) => {
	const { delAddr,asList } = action.payload

	let newState = Object.assign({},state)
	let newList = []

	asList.map((val,idx) => {
		if(val.tk_address === delAddr){
			newState.selectedList.splice(idx,1)
		}
	})
	newList = newState.selectedList
	if(!tk_db){
       tk_db = tkSqLite.open()
    }
    tk_db.transaction((tx) => {
    	tx.executeSql( " update token set tk_selected = 0 where tk_address = ? ",[delAddr], (tx,results) => {

    	},error => {
    		console.error('delete select token error ',error)
    	})
    })

	return {
		...state,
		selectedList: newList
	}
}
const onAddSelected = (state,action) => {
	const { addAddr,asList } = action.payload

	let newState = Object.assign({},state)
	let newList = []

	asList.map((val,idx) => {
		if(val.tk_address === addAddr){
			newState.selectedList.push(val)
		}
	})

	newList = newState.selectedList

	if(!tk_db){
       tk_db = tkSqLite.open()
    }
    tk_db.transaction((tx) => {
    	tx.executeSql( " update token set tk_selected = 1 where tk_address = ? ",[addAddr], (tx,results) => {

    	},error => {
    		console.error('delete select token error ',error)
    	})
    })

	return {
		...state,
		selectedList: newList
	}
}
// const onSelectedList = (state,action) => {
// 	const { sele } = action.payload
// 	let newList = []
// 	// let newState = Object.assign({},state)
// 	// newState.selectedList.push(sele)
// 	newList.push(sele)
// 	return {
// 		...state,
// 		selectedList: newList
// 	}
// }
const getAssetsList = (state,action) => {
	if(!tk_db){
       tk_db = tkSqLite.open()
    }
    let resArr = []

    tk_db.transaction((tx) => {
       tx.executeSql(" select * from token ",[], (tx,results)=>{
          let len = results.rows.length
          for(let i = 0; i < len; i ++){
            resArr.push(results.rows.item(i)) 
          } 
       },error => {
        console.error('search token error',error)
       })
    })
	return {
		...state,
		assetsList: resArr,
		isLoading: false 
	}
}
const onInsterDB = (state,action) => {
	const { currentAddress } = action.payload
	if(!tk_db){
       tk_db = tkSqLite.open()
	}
	let insertRes = []
	let tokenNumber = []
	tkSqLite.createTable()
	fetch('http://54.193.114.251/token-list.txt', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {   	
    	console.log('接口返回数据response==',response)
    	for(let i = 0; i < response.length; i++){
    		let myContract = new web3.eth.Contract(contractAbi, response[i].address)
    		myContract.methods.balanceOf(currentAddress).call((error,result) => {
    			let number = result / Math.pow(10,response[i].decimals)
	    		console.log('number==',number)
	    		let res = {}
	    		res.tk_address = response[i].address
	    		res.tk_decimals = response[i].decimals
	    		res.tk_name = response[i].name
	    		res.tk_price = response[i].price
	    		res.tk_symbol = response[i].symbol
	    		res.tk_selected = 0
	    		res.tk_number = number
	    		insertRes.push(res)
    		})
    	}

    	setTimeout(() => {
	    	tkSqLite.insertTokenListData(insertRes)
    	},1000)

    })


	return {
		...state,
		isLoading: false,
		refreshEnd: true,
	}
}

const onRefresh = (state,action) => {

	return {
		...state,
		refreshEnd: false
	}
}

const onRefreshSuc = (state,action) => {
	const {data} = action.payload
	return {
		...state,
		selectedList: data,
		refreshEnd: true
	}
}