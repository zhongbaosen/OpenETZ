import { CREATE_ACCOUNT } from '../constants/createAccountConstant'
const bip39 = require('bip39')
const hdkey = require('ethereumjs-wallet/hdkey')
const util = require('ethereumjs-util')
const randomBytes = require('randombytes')
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
    console.log('keyStore==',keyStore)

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