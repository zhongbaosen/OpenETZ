import TokenSQLite from './tokenDB'
import { contractAbi } from './contractAbi'
const tkSqLite = new TokenSQLite()
let tk_db

async function fetchFunc(options){
	const { parames, refreshSuccess } = options
	if(!tk_db){
       tk_db = tkSqLite.open()
	}

	let res = await fetch('http://54.193.114.251/token-list.txt',{
		method: 'GET',
	    headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json',
	    }
	})
	let response = null
	response = await res.json()
	for(let i = 0; i < response.length; i++){
		let tokenAddr = response[i].address
		
		let myContract = new web3.eth.Contract(contractAbi, tokenAddr)
		myContract.methods.balanceOf(parames.addr).call((error,result) => {
			let number = result / Math.pow(10,response[i].decimals)

    		tk_db.transaction((tx) => {
    			tx.executeSql(" update token set tk_number = ? where tk_address = ? ",[number,tokenAddr],(tx,results)=>{
    			},(error) => {
    				console.error(error)
    			})
    		})

		})
	}

   setTimeout(() => {
    	tk_db.transaction((tx) => {
	    	tx.executeSql(" select * from token ", [],(tx,results)=>{
	    		let len = results.rows.length
	    		let list = []
	    		for(let i = 0; i < len; i++){
	    			let data = results.rows.item(i)
	    			if(data.tk_selected === 1){
	    				list.push(data)
	    			}
	    		}
	    		refreshSuccess(list)
	    	},(error) => {	
	    		console.error(error)
	    	})
	    })
    },1000)

}

const tokenDBOpation = {
	refresh: (options) => {
		fetchFunc(options)
	},
}
export default tokenDBOpation