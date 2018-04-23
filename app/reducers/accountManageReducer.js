import * as types from  '../constants/accountManageConstant'
const wallet = require('ethereumjs-wallet')
const hdkey = require('ethereumjs-wallet/hdkey')
const util = require('ethereumjs-util')
const bip39 = require('bip39')
import UserSQLite from '../utils/accountDB'

const sqLite = new UserSQLite()
let db

const initState = {
	accountInfo: [],
	currentAddr: '',
	importStatus: '',
	// deleteFinished: false,
	updateBackupSucc: false,
	isLoading: false,
	deleteSuc: false,
	passAccInfoSuc: '',
	createSucc: false,
	delMnemonicSuc: false,
}
export default function accountManageReducer (state = initState,action) {
	switch(action.type){
		case types.GET_ACCOUNT_INFO:
			return getAccInfo(state,action)
			break
		case types.ON_SWITCH_ACCOUNT:
			return onSwitch(state,action)
			break
		case types.ON_DELETE_ACCOUNT_START:
			return onDelStart(state,action)
			break
		case types.ON_DELETE_ACCOUNT_SUC:
			return onDelSuc(state,action)
			break
		case types.ON_DELETE_ACCOUNT_FAIL:
			return onDelFail(state,action)
			break
		case types.RESET_DELETE_STATUS:
			return onReset(state,action)
			break
		case types.UPDATE_BACKUP_STATUS:
			return onUpateBackup(state,action)
			break
		case types.PASS_ACCOUNTS_INFO_START:
			return passInfoStart(state,action)
			break
		case types.PASS_ACCOUNTS_INFO_SUC:
			return passInfoSuc(state,action)
			break
		case types.PASS_ACCOUNTS_INFO_FAIL:
			return passInfoFail(state,action)
			break
		case types.CREATE_ACCOUNT_START:
			return createStart(state,action)
			break
		case types.CREATE_ACCOUNT_SUC:
			return createSuc(state,action)
			break
		case types.CREATE_ACCOUNT_FAIL:
			return createFail(state,action)
			break
		case types.IMPORT_ACCOUNT_START:
			return importStart(state,action)
			break
		case types.IMPORT_ACCOUNT_SUC:
			return importSuc(state,action)
			break
		case types.IMPORT_ACCOUNT_FAIL:
			return importFail(state,action)
			break
		case types.DELETE_MNEMONIC:
			return onDelMneMonic(state,action)
			break
		default:
			return state
			break

	}
}

const onDelMneMonic = (state,action) => {
	const { addr } = action.payload
	if(!db){  
	      db = sqLite.open();  
	} 
    db.transaction((tx)=>{  
      	tx.executeSql("update account set mnemonic = '' where address= ? ", [addr],(tx,results)=>{  
			
       	})  
      	},(error)=>{
        console.error(error)
    }) 
	return {
		...state,
		delMnemonicSuc: true
	}
}
const createStart = (state,action) => {
	console.log('创建开始',)
	return {
		...state,
		isLoading: true,
		createSucc: false
	}
}
const createSuc = (state,action) => {
	console.log('创建完成')
	return {
		...state,
		isLoading: false,
		createSucc: true
	}
}
const createFail = (state,action) => {
	return {
		...state,
		isLoading: false,
		createSucc: false
	}
}
const onUpateBackup = (state,action) => {
	const { addr } = action.payload
	let status = false
	if(!db){  
       db = sqLite.open();  
    } 
	db.transaction((tx)=>{  
      tx.executeSql("update account set backup_status = 1 where address= ? ", [addr],(tx,results)=>{  
        console.log('更新成功')  
        // status = true
      }) 
    },(error)=>{
      console.log('更新失败',error)
    })


	return {
		...state,
		updateBackupSucc: true
	}
}
const onReset = (state,action) => {
	return {
		...state,
		importStatus: '',
		updateBackupSucc: false,
		deleteSuc: false,
		createSucc: false,
		delMnemonicSuc: false,
	}
}

const onDelStart = (state,action) => {
	return {
		...state,
		isLoading: true
	}
}
const onDelSuc = (state,action) => {
	const { data } = action.payload

	return {
		...state,
		isLoading: false,
		deleteSuc: true
	}
}
const onDelFail = (state,action) => {
	const { msg } = action.payload
	console.log('删除失败')
	return {
		...state,
		isLoading: false,
		deleteSuc: false
	}
}
	
const getAccInfo = (state,action) => {
	return {
		...state,
		accountInfo: action.payload.info
	}
}

const passInfoStart = (state,action) => {
	return {
		...state,
	}
}
const passInfoSuc = (state,action) => {
	const { data } = action.payload
	console.log('data passInfoSuc====',data)
	return {
		...state,
		accountInfo: data,
		passAccInfoSuc: 'home',
	}
}
const passInfoFail = (state,action) => {
	return {
		...state,
		passAccInfoSuc: 'login'
	}
}

const onSwitch = (state,action) => {
	const addr = action.payload.addr
	const newState = Object.assign({},state)
	let curr =  ''

	newState.accountInfo.map((val,index) => {
		if(addr === val.address){
			curr = val.address

			if(!db){  
		        db = sqLite.open();  
		    }  
		    db.transaction((tx)=>{  
		      tx.executeSql("update account set is_selected = 1 where address= ? ", [curr],(tx,results)=>{  
		        db.transaction((tx) => {
		        	tx.executeSql("update account set is_selected = 0 where address != ? ", [curr],(tx,results)=>{
		        	})
		        }, (error) => {
		        	console.error(error)
		        })
		      });  
		    },(error)=>{
		      console.error(error)
		    })
		}	
	})
	return {
		...state,
		currentAddr: curr,
	}
}


const importStart = (state,action) => {
	return {
		...state,
		importStatus: '',
	}
}
const importSuc = (state,action) => {
	return {
		...state,
		importStatus: 'success',
	}
}
const importFail = (state,action) => {
	return {
		...state,
		importStatus: 'fail',
	}
}