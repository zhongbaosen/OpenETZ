const wallet = require('ethereumjs-wallet')
const hdkey = require('ethereumjs-wallet/hdkey')
const util = require('ethereumjs-util')
const bip39 = require('bip39')
import UserSQLite from '../utils/accountDB'

const sqLite = new UserSQLite()
let db

async function onImportAcccount(options){
	const { success, failure, parames } = options
	const { privateKey, privatePassword, privateUserName,type,mnemonicVal, mnemonicPsd, mnemonicUserName,keystoreVal, keystoreUserName } = parames
	let selected = 0
	let keyStore = {}
	let createFinished = false
	let userName = ''
	if(type === 'private'){
		let buf = new Buffer(privateKey, 'hex')

		let w = wallet.fromPrivateKey(buf)
	    let p_keystore = w.toV3(privatePassword,{c:8192,n:8192})
	    console.log('私钥导入p_keystore====',p_keystore)
	    keyStore = p_keystore
	    userName = privateUserName
	    createFinished = true
	}else{
		if(type === 'mnemonic'){
			let seed = bip39.mnemonicToSeed(mnemonicVal)
		    let hdWallet = hdkey.fromMasterSeed(seed)
		    let w = hdWallet.getWallet()
		    let m_keystore = w.toV3(mnemonicPsd,{c:8192,n:8192})
		    console.log('助记词导入',m_keystore)
		    keyStore = m_keystore
		    userName = mnemonicUserName
		    createFinished = true
		}else{
			keyStore = JSON.parse(keystoreVal)
			userName = keystoreUserName
			createFinished  = true
			console.log('keyStore导入完成')
		}
	}

	// console.log('createFinished======',createFinished)
	if(createFinished){
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
	   	},10)

	    setTimeout(() => {
	        sqLite.insertUserData(userData)
	    },20)
	    success(true)
 	}
}
const accountDBOpation = {
	importAcccount:(options) => {
		onImportAcccount(options)
	}
}

export default accountDBOpation