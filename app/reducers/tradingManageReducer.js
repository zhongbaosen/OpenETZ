import * as types from '../constants/tradingManageConstant'
import TradingSQLite from '../utils/tradingDB'
import UserSQLite from '../utils/accountDB'
const tradingSqLite = new TradingSQLite()  
let t_db

const sqLite = new UserSQLite();  
let db  

const initState = {
	
}
export default function tradingManageReducer (state = initState,action) {
	switch(action.type){
		case types.INSERT_TO_DB:
			return insertToDB(state,action)
			break
		default:
			return state
			break

	}
}

const insertToDB = (state,action) => {
	const { tx_hash, tx_value, tx_sender, tx_receiver, tx_note, } = action.payload
	let currentAccount = ''
	if(!t_db){  
        t_db = tradingSqLite.open();  
    }	

    

    t_db.transaction((tx)=>{  
        tx.executeSql("select * from trading", [],(tx,results)=>{  

        })
    },(error)=>{
       tradingSqLite.createTable()
    })

    if(!db){
      db = sqLite.open()
    }

     db.transaction((tx) => {
        tx.executeSql("select account_name from account where is_selected=1 ", [], (tx,results) => {


        	console.log('results.rows.item(0)======',results.rows.item(0))
            currentAccount = results.rows.item(0).account_name

        },(error) => {

        })
      })



	let tradingData = [],  
  		trading = {},
  		time = '',
  		result = 1,
		block = 0;

	web3.eth.getTransaction(tx_hash).then((res,rej)=>{
      web3.eth.getBlock(res.blockNumber).then((bres,brej) => {
      	block = bres.number
		time = bres.timestamp
      })
    })


   	setTimeout(() => {
   		trading.tx_account_name = currentAccount
   		trading.tx_time = time
   		trading.tx_result = result
   		trading.tx_hash = tx_hash
   		trading.tx_value = tx_value
   		trading.tx_sender = tx_sender
   		trading.tx_receiver = tx_receiver
   		trading.tx_note = tx_note
   		trading.tx_block_number = block	
	    tradingData.push(trading) 
   	},1500)


      // insert 
    setTimeout(() => {
        tradingSqLite.insertTradingData(tradingData)
    },2000)

	return {
		...state
	}
}