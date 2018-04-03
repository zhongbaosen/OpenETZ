import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native'

import { pubS,DetailNavigatorStyle } from '../../styles/'
import { setScaleText, scaleSize } from '../../utils/adapter'
import { toHome } from '../../root'
import { connect } from 'react-redux'
import { sliceAddress } from '../../utils/splitNumber'
const Wallet = require('ethereumjs-wallet')
import UserSQLite from '../../utils/accountDB'
const sqLite = new UserSQLite();  
let db; 
class AccountCard extends Component {
  render(){
    const { accountName, accountPsd, accountTotal, accountUnit, accountBackUp, backupState} = this.props
    return(
      <TouchableOpacity style={styles.cardView} activeOpacity={.7} onPress={accountBackUp}>
        <View style={[styles.cardTopView,pubS.bottomStyle,pubS.rowCenterJus]}>
          <View style={[pubS.rowCenter]}>
            <Image source={require('../../images/xhdpi/Penguin.png')} style={{height: scaleSize(55),width: scaleSize(55)}}/>
            <View style={{marginLeft: scaleSize(30)}}>
              <Text style={pubS.font28_3}>{accountName}</Text>
              <Text style={pubS.font22_4}>{accountPsd}</Text>
            </View>
          </View>
          <Image source={require('../../images/xhdpi/btn_ico_payment_select_def.png')} style={{width:scaleSize(16),height: scaleSize(30)}}/>
        </View>
        <View style={[styles.cardBottomView,pubS.rowCenterJus]}>
          {
            backupState===0 ? 
            <View style={[styles.backupBtn,pubS.center]}>
              <Text style={pubS.font22_5}>backup</Text>
            </View>
            : <View/>
          }
          <View style={pubS.rowCenter}>
            <Text style={pubS.font34_1}>{accountTotal}</Text>
            <Text style={[pubS.font24_5,{marginLeft: 2,marginTop:2,}]}>{accountUnit}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

class AccountManage extends Component{
  constructor(props){
    super(props)
    this.state = {
      cardItems: []
    } 
  }

  componentWillMount(){

    

    this.searchAccountList()

  }

  componentWillReceiveProps(nextProps){
    if(this.props.accountManageReducer.deleteFinished !== nextProps.accountManageReducer.deleteFinished && nextProps.accountManageReducer.deleteFinished){
      this.searchAccountList()
    }
    if(this.props.accountManageReducer.updateBackupSucc !== nextProps.accountManageReducer.updateBackupSucc && nextProps.accountManageReducer.updateBackupSucc){
      this.searchAccountList()
    }
  }
  searchAccountList = () => {
    const { cardItems } = this.state
    if(!db){  
      db = sqLite.open()  
    }  
    db.transaction((tx)=>{  
      tx.executeSql("select * from account ", [],(tx,results)=>{
        var len = results.rows.length 
        let empty = [] 
        for(let i=0; i<len; i++){  
          var u = results.rows.item(i)
          empty.push(u)
          this.setState({
            cardItems: empty
          })
        }  
      })  
    },(error)=>{
      console.log('打印异常信息 ',error) 
    })
  }
  toDetail = (address,name,id) => {
    this.props.navigator.push({
      screen: 'back_up_account',
      title: name,
      navigatorStyle: DetailNavigatorStyle,
      passProps: {
        userName: name,
        address: address,
        b_id: id,
      },
      // navigatorButtons: {
      //   rightButtons: [
      //     {
      //       title: 'save',
      //       id: 'save_back_up_info'
      //     }
      //   ]
      // }
    })
  }

  createAccountBtn = () => {
    this.props.navigator.push({
      screen: 'create_account',
      title:'create',
      navigatorStyle: DetailNavigatorStyle,
    })
  }
  importAccountBtn = () => {
    this.props.navigator.push({
      screen: 'import_account',
      title:'import',
      navigatorStyle: DetailNavigatorStyle,
    })
  }

  renderItem = (item) => {
    let res = item.item
    // console.log('1111111111111111111111',res)
    return(
      <AccountCard
        accountName={res.account_name}
        accountPsd={sliceAddress(`0x${res.address}`,10)}
        accountTotal={res.assets_total}
        accountUnit={'ether'}
        accountBackUp={() => this.toDetail(res.address,res.account_name,res.id)}
        backupState={res.backup_status}
      />
    )
  }
  render(){
    // const { localKeyStore, userName } = this.props.getLocalDataReducer
    const { cardItems } = this.state
    console.log('cardItems111111111111111',cardItems)
    return(
      <View style={[pubS.container,{backgroundColor:'#F5F7FB'}]}>
        <View style={{marginBottom: scaleSize(96)}}>
          <FlatList
            data={cardItems}
            renderItem={this.renderItem}
            keyExtractor = {(item, index) => index}
            // ListFooterComponent={this.ListFooterComponent}
            // ListHeaderComponent={this.ListHeaderComponent}
          />
        </View>
        <View style={[{width: '100%',bottom:0,position:'absolute'},pubS.rowCenter]}>
          <TouchableOpacity activeOpacity={.7} onPress={this.createAccountBtn} style={[styles.btnStyle,pubS.center,{backgroundColor:'#2B8AFF'}]}>
            <Text style={pubS.font30_3}>create</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.7} onPress={this.importAccountBtn} style={[styles.btnStyle,pubS.center,{backgroundColor:'#2B58FF'}]}>
            <Text style={pubS.font30_3}>import</Text>
          </TouchableOpacity>
       </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btnStyle:{
    height: scaleSize(96),
    width: '50%',
  },
  backupBtn:{
    height: scaleSize(34),
    width:scaleSize(84),
    borderWidth:1,
    borderColor: '#FF6060',
    borderRadius: scaleSize(6),

  },
  cardBottomView: {
    height: scaleSize(114),
    width: scaleSize(620),
    alignSelf:'center',
  },
  cardTopView: {
    height: scaleSize(140),
    width: scaleSize(620),
    alignSelf:'center',

  },
  cardView: {
    width: scaleSize(702),
    height: scaleSize(255),
    backgroundColor: '#fff',
    borderRadius: 4,
    alignSelf:'center',
    marginTop: scaleSize(30),
  },
})
export default connect(
  state => ({
    accountManageReducer: state.accountManageReducer
  })
)(AccountManage)
