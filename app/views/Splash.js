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
import { passAccountsInfoAction,getAccountInfoAction } from '../actions/accountManageAction'
import { switchLanguageAction } from '../actions/switchLanguageAction'
import { DetailNavigatorStyle} from '../styles/'
const sqLite = new UserSQLite()  
let db  
const tSqLite = new TradingSQLite()
let t_db
import TokenSQLite from '../utils/tokenDB'

const tkSqLite = new TokenSQLite()
let tk_db
import I18n from 'react-native-i18n'
class Splash extends Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }

  
  componentWillMount(){

    // tkSqLite.deleteData()
    // tkSqLite.dropTable()
      // sqLite.dropTable()
      // sqLite.deleteData() 

    // this.props.dispatch(passAccountsInfoAction())

    // localStorage.remove({
    //   key: 'lang'
    // })


    localStorage.load({
      key: 'lang',
      autoSync: true,
    }).then( ret => {
      I18n.locale  = `${ret.selectedLan}`
      // this.props.dispatch(switchLanguageAction(ret.selectedLan))
    }).catch (err => {
      this.setDefaultLang()
    })
    
  }
  
  componentDidMount(){
    // tSqLite.deleteData()
    // tSqLite.dropTable()
    // tkSqLite.deleteData()
    // tkSqLite.dropTable()
  //   sqLite.dropTable()
  //   sqLite.deleteData()    

    setTimeout(() => {
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
            this.updateAssetsTotal(u)
          } 
          this.props.dispatch(getAccountInfoAction(allAccounts))
          toHome()
        },(error) => {
          toLogin()
        })
      })

    },2000)
  } 

  setDefaultLang = () => {
    I18n.locale  = 'en-US'
    localStorage.save({
      key: 'lang',
      data:{
        selectedLan: 'en-US'
      }
    })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.accountManageReducer.passAccInfoSuc === 'login'){
        toLogin()
    }else{
      if(nextProps.accountManageReducer.passAccInfoSuc === 'home'){
        toHome()
      }
    }
  }

  async updateAssetsTotal(val){
    let res = await web3.eth.getBalance(`0x${val.address}`)
    let newTotal = web3.utils.fromWei(res,'ether')
    // let newTotal = '0.9348' // "0.0352"
    let name = val.account_name
    db.transaction((tx) => {
      tx.executeSql(" update account set assets_total = ? where account_name = ? ",[newTotal,name],(tx,results) => {

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
    accountManageReducer: state.accountManageReducer
  })
)(Splash)
