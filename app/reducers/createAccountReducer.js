import { CREATE_ACCOUNT } from '../constants/createAccountConstant'
const bip39 = require('bip39')
const hdkey = require('ethereumjs-wallet/hdkey')
const util = require('ethereumjs-util')
const randomBytes = require('randombytes')
// import Realm from 'realm'
// const AccuontSchema = {
//   name: 'account',
//   properties:{
//     a_id: {type: 'int',default: 0},
//     userName: 'string',
//     address: 'string',
//     id: 'string',
//     version: {type: 'int'},
//     cipher: 'string',
//     ciphertext: 'string',
//     kdf: 'string',
//     mac: 'string',
//     dklen: {type: 'int'},
//     salt: 'string',
//     n: {type: 'int'},
//     r: {type: 'int'},
//     p: {type: 'int'},
//     iv: 'string',
//   }
// }

const initState = {
	isLoading: true,
	mnemonicWord: '',
	address: '',
	privateKey: '',
	userName: '',
	psd: '',
	prompt: '',
	
}

export default function createAccountReducer(state = initState,action){
	switch(action.type){
		case 'CREATE_ACCOUNT':
			return onCreate(state,action)
			break
		
		default:
			return state
			break
	}
}



const onCreate = (state,action) => {
	const { userNameVal, psdVal, promptVal,fromLogin } = action.payload
	let mnemonic = bip39.generateMnemonic();
    console.log('mnemonic==',mnemonic)
    
    let seed = bip39.mnemonicToSeed(mnemonic)
    // console.log('seed==',seed)
    let hdWallet = hdkey.fromMasterSeed(seed)
    console.log('hdWallet==',hdWallet)

    let w = hdWallet.getWallet()
    let keyStore = w.toV3(psdVal)
    if(fromLogin){
	    localStorage.save({
	    	key: 'account',
	    	data:{
	    		keyStore: keyStore,
	    		userName: userNameVal,
	    	},
	    	expires: null,
	    })
    }else{//add other accounts

    }
    // console.log('keyStore==',keyStore)

    //创建之前先查询  是否已经存在账号 不存在 则a_id=0  存在 则在存在的a_id基础上+1

    // Realm.open({schema: [AccuontSchema]}).then((realm) => {
    //   realm.write(() => {
    //     let accountData = realm.create('account', {
    //       a_id: 0,
    //       userName: 'zhangsan',
    //       address: '56869761f1b1c688c1867ed8daa9197d3425f591',
    //       id: '12e89265-98a2-4d89-b2a5-9d847e8be2dd',
    //       version: 3,
    //       cipher: 'aes-128-ctr',
    //       ciphertext: '5f604dc82248b01fc19398d4fcd0b6e720e328c61fefd023af2e925f82adc527',
    //       kdf: 'scrypt',
    //       mac: '1d67e3d8ee8ff2ba22ee0138b0842fb9b88c40eef56c72e0cf9312cedf66ca89',
    //       dklen: 32,
    //       salt: '39b6262212b8f4904b9b1d9422b40db96c454bde5e567bb2f3e308616d9cc7bb',
    //       n: 262144,
    //       r: 8,
    //       p: 1,
    //       iv: '14505732ae3bb81aa555f3f65b10b320',
    //     });
    //     // console.log('accountData===',accountData)
    //   })
    // })



    // let key1 = hdWallet.derivePath("m/44'/60'/0'/0/0")

    // let pKey = key1._hdkey._privateKey.toString('hex')
    // console.log("私钥:", pKey)

    // let address1 = util.pubToAddress(key1._hdkey._publicKey, true)

    // address1 = util.toChecksumAddress(address1.toString('hex'))

    // console.log('地址',address1);

	return {
		...state,
		isLoading: false,
		// address: address1,
		// privateKey: pKey,
		// userName: userNameVal,
		// psd: psdVal,
		// prompt: promptVal,
	}
}