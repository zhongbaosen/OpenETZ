import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Button
} from 'react-native'
import { toHome, toLogin} from '../root'
import { getLocalDataAction } from '../actions/getLocalDataAction' 
import { connect } from 'react-redux'
import UserSQLite from '../utils/accountDB'
import TradingSQLite from '../utils/tradingDB'
import { getAccountInfoAction } from '../actions/accountManageAction'
const sqLite = new UserSQLite();  
let db;  
const tSqLite = new TradingSQLite()
let t_db

 class Splash extends Component{
  constructor(props){
    super(props)
    this.state = {
      // accountData: null
    }
  }
 	// componentWillMount(){
 	// 	localStorage.remove({
		// 	key: 'account'
		// });
 	// }
  

  componentDidMount(){

    toHome()
    // web3.eth.getTransaction('0x59eaf968a7b4d1f54daf8dcb31961c5df898cd39d42bf5589c9695c821274b26').then((res,rej)=>{//5388393
    //   console.log('getTransaction',res)

    //   web3.eth.getBlock(res.blockNumber).then((bres,brej) => {
    //     console.log('bres==',bres)
    //     console.log('brej==',brej)
    //   })
    //   console.log('rej=======',rej)
    // })
      
      // if(!t_db){
      //   t_db = tSqLite.open()
      // }
      // tSqLite.dropTable()
      // tSqLite.deleteData()    



      
    // setTimeout(() => {
    //   if(!db){  
    //     db = sqLite.open();  
    //   }  
    //   // sqLite.dropTable()
    //   // sqLite.deleteData()

    //   db.transaction((tx) => {
    //     tx.executeSql("select * from account ", [], (tx,results) => {

    //       let len = results.rows.length 
    //       let allAccounts = [] 
    //       for(let i=0; i<len; i++){  
    //         let u = results.rows.item(i)
    //         allAccounts.push(u)

    //         this.updateAssetsTotal(u)

    //       } 
    //       this.props.dispatch(getAccountInfoAction(allAccounts))
    //       toHome()
    //     },(error) => {
    //       toLogin()
    //     })
    //   })

    // },2000)
  } 


  async updateAssetsTotal(val){
    let res = await web3.eth.getBalance(`0x${val.address}`)
    let newTotal = web3.utils.fromWei(res,'ether')
    db.transaction((tx) => {
      tx.executeSql(" update account set assets_total = ? where id > -1  ",[newTotal],(tx,results) => {

      },(error) => {
        console.log(error)
      })
    })     
  }
  compennetWillUnmount(){  
    sqLite.close();  
  } 

  render(){
  	return(
      <View style={{flex:1}}>
      	 <Image source={require('../images/xhdpi/splash.png')} style={{width: '100%', height:'100%'}}/>
      </View>
  	)
  }
}
export default connect(
  state => ({
    // accountManageReducer: state.accountManageReducer
  })
)(Splash)
