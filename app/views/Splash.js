import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Button,
  BackHandler,
  ToastAndroid
} from 'react-native'
import { toHome, toLogin} from '../root'
import { getLocalDataAction } from '../actions/getLocalDataAction' 
import { connect } from 'react-redux'
import UserSQLite from '../utils/accountDB'
import TradingSQLite from '../utils/tradingDB'
import { getAccountInfoAction } from '../actions/accountManageAction'
import { DetailNavigatorStyle} from '../styles/'
const sqLite = new UserSQLite()  
let db  
const tSqLite = new TradingSQLite()
let t_db
import TokenSQLite from '../utils/tokenDB'

const tkSqLite = new TokenSQLite()
let tk_db
class Splash extends Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }

  
  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    // if(!db){  
    //     db = sqLite.open();  
    //   }
    // db.transaction((tx) => {
    //   tx.executeSql(" update account set assets_total = '0' ",[],(tx,results) => {

    //   },(error) => {
    //     console.log(error)
    //   })
    // })
  }
  onBackAndroid = () => {

    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {

      //最近2秒内按过back键，可以退出应用。

      return false;

    }

    this.lastBackPressed = Date.now();

    ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);

    return true;

  }
  componentDidMount(){
    // tkSqLite.deleteData()
    // tkSqLite.dropTable()
    //   sqLite.dropTable()
    //   sqLite.deleteData()    

    // toHome()
    // this.props.navigator.push({
    //   screen: 'import_account',
    //   title:'import',
    //   navigatorStyle: DetailNavigatorStyle,
    // })

    // this.props.navigator.push({
    //   screen: 'back_up_account',
    //   title: 'name',
    //   navigatorStyle: DetailNavigatorStyle,
    //   passProps: {
    //     userName: 'name',
    //     address: 'address',
    //     b_id: 'id',
    //   },
    //   navigatorButtons: {
    //     rightButtons: [
    //       {
    //         title: 'save',
    //         id: 'save_back_up_info'
    //       }
    //     ]
    //   }
    // })


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


  async updateAssetsTotal(val){
    let res = await web3.eth.getBalance(`0x${val.address}`)
    let newTotal = web3.utils.fromWei(res,'ether')
    //let newTotal = '0.9348' // "0.0352"
    let name = val.account_name
    db.transaction((tx) => {
      tx.executeSql(" update account set assets_total = ? where account_name = ? ",[newTotal,name],(tx,results) => {

      },(error) => {
        console.log(error)
      })
    })     
  }
  compennetWillUnmount(){
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);  
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
