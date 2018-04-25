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

import accountDB from '../db/account_db'

class Splash extends Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }

  
  componentWillMount(){
    // this.onDelete()
    // this.onDrop1()
    // this.onDrop2()

    
    
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
  onCreate = () => {
    accountDB.createAmountTable()
  }
  async onInsert(){
    let userData = [],  
        user = {};  

        user.mnemonic = 'mnemonic';
        user.account_name = 'userNameVal';  
        user.backup_status = 0;  
        user.assets_total = '0';
        user.is_selected = 1;
        user.address = 'keyStore.address';  
        user.kid = 'keyStore.id';  
        user.version = 3;  
        user.cipher = 'keyStore.crypto.cipher';  
        user.ciphertext = 'keyStore.crypto.ciphertext';  
        user.kdf = 'keyStore.crypto.kdf';  
        user.mac = 'keyStore.crypto.mac';  
        user.dklen = 100;  
        user.salt = 'keyStore.crypto.kdfparams.salt';  
        user.n = 123;  
        user.r = 456;  
        user.p = 789;  
        user.iv = 666;  
        userData.push(user); 


    let res = await accountDB.insertToAccontTable(userData)
    if(res){
      console.log('insert语句返回结果',res)
    }
  }
  async onFind(){
    let res = await accountDB.selectTable({
      sql: 'select id,address,account_name from account',
      parame: []
    })
    // if(res.length === 0){
      //还没有账户信息
    // }else{
      console.log('select语句结果',res)
      
    // }
  }
  onDrop1 = () => {
    accountDB.dropAccountTable({
      sql: 'drop table token'
    })
  }
  onDrop2 = () => {
    accountDB.dropAccountTable({
      sql: 'drop table account'
    })
  }
  onDelete = () => {
    accountDB.deleteAccount({
      sql: 'delete from account where id = ?',
      d_id: [17]
    })
  }
  componentDidMount(){
    this.getAccounts()
  } 
  async getAccounts(){
    let res = await accountDB.selectTable({
      sql: 'select id,address,account_name from account',
      parame: []
    })
    if(res.length === 0){
      //还没有账户信息
      toLogin()  

      //此时  没有任何账户信息  

    }else{
      console.log('select语句结果',res)

      this.updateAssetsTotal(res)

    }
  }
  async updateAssetsTotal(infos){
    let updateRes = false
    for(let i = 0; i < infos.length; i ++){
      let balance = await web3.eth.getBalance(`0x${infos[i].address}`)
      let newTotal = web3.utils.fromWei(balance,'ether')

      updateRes = await accountDB.updateTable({
        sql: 'update account set assets_total = ? where account_name = ?',
        parame:[newTotal, infos[i].account_name]
      })
    }

    console.log('更新结果',updateRes)
    if(updateRes === 'success'){
      // setTimeout(() => {
        toHome()
      // },2000)
    }else{
      console.log('还没有更新完')
    }
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


  render(){
  	return(
      <View style={{flex:1}}>
        {
          // <Button
          //   title={'create'}
          //   onPress={this.onCreate}
          // />
          // <Button
          //   title={'insert'}
          //   onPress={this.onInsert}
          // />
          // <Button
          //   title={'find'}
          //   onPress={this.onFind}
          // />
          // <Button
          //   title={'drop'}
          //   onPress={this.onDrop}
          // />
          // <Button
          //   title={'delete'}
          //   onPress={this.onDelete}
          // />
        }
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
