import * as types from  '../constants/accountManageConstant'
const wallet = require('ethereumjs-wallet')
const hdkey = require('ethereumjs-wallet/hdkey')
const util = require('ethereumjs-util')
import UserSQLite from '../utils/accountDB'

const sqLite = new UserSQLite()
let db

const initState = {
	accountInfo: [],
	currentAddr: '',
	importSucc: false,
	deleteFinished: false,
	updateBackupSucc: false,
}
export default function accountManageReducer (state = initState,action) {
	switch(action.type){
		case types.GET_ACCOUNT_INFO:
			return getAccInfo(state,action)
			break
		case types.ON_SWITCH_ACCOUNT:
			return onSwitch(state,action)
			break
		case types.ON_IMPORT_ACCOUNT:
			return onImport(state,action)
			break
		case types.ON_DELETE_ACCOUNT:
			return onDelete(state,action)
			break
		case types.RESET_DELETE_STATUS:
			return onReset(state,action)
			break
		case types.UPDATE_BACKUP_STATUS:
			return onUpateBackup(state,action)
			break
		default:
			return state
			break

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
		deleteFinished: false,
		updateBackupSucc: false,
	}
}
const onDelete = (state,action) => {
	const { deleteId } = action.payload
	if(!db){  
      db = sqLite.open();  
    } 
    db.transaction((tx)=>{  
      tx.executeSql("delete from account where id= ? ", [deleteId],(tx,results)=>{  
          
       })  
      },(error)=>{
        console.error(error)
    }); 

	return {
		...state,
		deleteFinished: true
	}
}	
const getAccInfo = (state,action) => {
	// console.log('222222222222222222222==',action.payload.info)
	return {
		...state,
		accountInfo: action.payload.info
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

const onImport = (state,action) => {
	let succ = false
	let selected = 0
	const { privKey, password, userName, } = action.payload
	let buf = new Buffer(privKey, 'hex')
    // let hdWallet = hdkey.fromMasterSeed(buf)

	let w = wallet.fromPrivateKey(buf)
    // let w = hdWallet.getWallet()
    let keyStore = w.toV3(password,{c:8192,n:8192})

    console.log('import keyStore====',keyStore)


    if(!db){  
        db = sqLite.open();  
    }  
      
    

   	db.transaction((tx)=>{  
        tx.executeSql("select * from account", [],(tx,results)=>{  

        })
    },(error)=>{
       selected = 1
       sqLite.createTable()
    })

	let userData = [],  
  		user = {};  
   	setTimeout(() => {
	    user.account_name = userName  
	    user.backup_status = 0  
	    user.is_selected = selected
	    user.assets_total = '0'
	    user.address = keyStore.address
	    user.kid = keyStore.id 
	    user.version = keyStore.version
	    user.cipher = keyStore.crypto.cipher 
	    user.ciphertext = keyStore.crypto.ciphertext 
	    user.kdf = keyStore.crypto.kdf 
	    user.mac = keyStore.crypto.mac 
	    user.dklen = keyStore.crypto.kdfparams.dklen
	    user.salt = keyStore.crypto.kdfparams.salt
	    user.n = keyStore.crypto.kdfparams.n 
	    user.r = keyStore.crypto.kdfparams.r 
	    user.p = keyStore.crypto.kdfparams.p
	    user.iv = keyStore.crypto.cipherparams.iv  
	    userData.push(user) 
   	},1000)


      // insert 
    setTimeout(() => {
        sqLite.insertUserData(userData)
    },2000)

    succ = true

	return {
		...state,
		importSucc: succ
	}
}