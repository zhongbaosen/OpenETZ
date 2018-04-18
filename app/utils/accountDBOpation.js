const wallet = require('ethereumjs-wallet')
const hdkey = require('ethereumjs-wallet/hdkey')
const util = require('ethereumjs-util')
const bip39 = require('bip39')
const randomBytes = require('randombytes')

import UserSQLite from '../utils/accountDB'

const sqLite = new UserSQLite()
let db

async function onImportAccount(options){
	const { importSuccess, importFailure, parames } = options

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

		    if(keyStore.crypto){
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
		    }else{
		    	user.cipher = keyStore.Crypto.cipher
		    	user.ciphertext = keyStore.Crypto.ciphertext
		    	user.kdf = keyStore.Crypto.kdf
				user.mac = keyStore.Crypto.mac
				user.dklen = keyStore.Crypto.kdfparams.dklen
				user.salt = keyStore.Crypto.kdfparams.salt
				user.n = keyStore.Crypto.kdfparams.n
				user.r = keyStore.Crypto.kdfparams.r
				user.p = keyStore.Crypto.kdfparams.p
				user.iv = keyStore.Crypto.cipherparams.iv
		    }
		    userData.push(user) 
	   	},1000)

	    setTimeout(() => {
	        sqLite.insertUserData(userData)
	    },1500)
	    setTimeout(() => {
	    	importSuccess(true)
	    },3000)
 	}
}


async function onDelAccount(options){
	const { parames, delSuccess, delFailure,curId } = options

	if(!db){  
      db = sqLite.open();  
    } 
    db.transaction((tx)=>{  
      tx.executeSql("delete from account where id = ? ", [parames.deleteId],(tx,results)=>{  
      		delSuccess(true)
      		if(parames.curId === parames.deleteId){
	      		db.transaction((tx) => {
	      			tx.executeSql(" select * from account ",[],(tx,selectRes) => {
						db.transaction((tx) => {
							tx.executeSql(" update account set is_selected = 1 where account_name = ? ",[selectRes.rows.item(0).account_name],(tx,updateRes) =>{
								//alert('删除其他账号后 更新accountInfo信息  如果删除的是当前账号  更新accountInfo后还需要将另外的一条信息的is_selected=1')
							},(error) => {
								console.error(error)
							})
						})
	      			})
	      		})
      		}
       })  
      },(error)=>{
      		delFailure(error)
        // console.error(error)
    }); 
}

// async function updateAssetsTotal (val,options) {
// 	const { passAccInfoSuc, passAccInfoFail} = options
// 	let res = await web3.eth.getBalance(`0x${val.address}`)
//     let newTotal = web3.utils.fromWei(res,'ether')
//     let name = val.account_name
//     db.transaction((tx) => {
//       tx.executeSql(" update account set assets_total = ? where account_name = ? ",[newTotal,name],(tx,results) => {
//       	passAccInfoSuc(true)
//       },(error) => {
//         console.log(error)
//       })
//     })  
// }

async function onPassAccInfo(options) {
	const { passAccInfoSuc, passAccInfoFail} = options
	if(!db){  
        db = sqLite.open();  
      }  
      db.transaction((tx) => {
        tx.executeSql("select * from account ", [], (tx,results) => {

          let len = results.rows.length 
          let allAccounts = [] 
          for(let i=0; i<len; i++){  
            let u = results.rows.item(i)
            allAccounts.push(u)

            // updateAssetsTotal(u,options)
          } 

            passAccInfoSuc(allAccounts)

        },(error) => {
        	passAccInfoFail(error)
        })
      }) 
}

async function onCreateAccount(options){
	const { parames, createSuccess, createFailure } = options
	const { userNameVal, psdVal, promptVal, } = parames
	
    let selected = 0 
	let mnemonic = await bip39.generateMnemonic();
    console.log('创建时生成的mnemonic==',mnemonic)
    
    let seed = await bip39.mnemonicToSeed(mnemonic)

    let hdWallet = await hdkey.fromMasterSeed(seed)


    let w = hdWallet.getWallet()
    let keyStore = await w.toV3(psdVal,{c:8192,n:8192})

    console.log('keyStore==',keyStore)

    if(!db){  
        db = sqLite.open();  
    }  
      
      

    db.transaction((tx)=>{  
      tx.executeSql("select * from account", [],(tx,results)=>{  
          console.log('有表')
      });  
    },(error)=>{
      console.log('无表')
      sqLite.createTable()
      selected = 1
    }); 

    let userData = [],  
        user = {};  
    setTimeout(() => {
	    user.mnemonic = mnemonic;
	    user.account_name = userNameVal;  
	    user.backup_status = 0;  
	    user.assets_total = '0';
	    user.is_selected = selected;
	    user.address = keyStore.address;  
	    user.kid = keyStore.id;  
	    user.version = keyStore.version;  
	    user.cipher = keyStore.crypto.cipher;  
	    user.ciphertext = keyStore.crypto.ciphertext;  
	    user.kdf = keyStore.crypto.kdf;  
	    user.mac = keyStore.crypto.mac;  
	    user.dklen = keyStore.crypto.kdfparams.dklen;  
	    user.salt = keyStore.crypto.kdfparams.salt;  
	    user.n = keyStore.crypto.kdfparams.n;  
	    user.r = keyStore.crypto.kdfparams.r;  
	    user.p = keyStore.crypto.kdfparams.p;  
	    user.iv = keyStore.crypto.cipherparams.iv;  
	    userData.push(user); 
    },100)
   // insert 
    setTimeout(() => {
        sqLite.insertUserData(userData)
    },500)

    setTimeout(()=>{
    	createSuccess(true)
    },1000)

}
const accountDBOpation = {
	importAccount:(options) => {
		onImportAccount(options)
	},
	deleteAccount:(options) => {
		onDelAccount(options)
	},
	passAccountsInfo:(options) => {
		onPassAccInfo(options)
	},
	createAccount:(options) => {
		onCreateAccount(options)
	},
}

export default accountDBOpation