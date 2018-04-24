import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Platform,
  RefreshControl,
  Button,
  BackHandler,
} from 'react-native'

import { pubS,DetailNavigatorStyle,MainThemeNavColor,ScanNavStyle } from '../../styles/'
import { setScaleText, scaleSize } from '../../utils/adapter'
import Drawer from 'react-native-drawer'
import { connect } from 'react-redux'
import { onSwitchDrawerAction } from '../../actions/onSwitchDrawerAction'
import SwitchWallet from './SwitchWallet'
import { switchDrawer } from '../../utils/switchDrawer'
import TokenSQLite from '../../utils/tokenDB'
import { toSplash } from '../../root'
import { splitDecimal } from '../../utils/splitNumber'
const tkSqLite = new TokenSQLite()
let tk_db
import { insertToTokenAction,initSelectedListAction,refreshTokenInfoAction } from '../../actions/tokenManageAction'
let etzTitle = "ETZ"
import I18n from 'react-native-i18n'
import Toast from 'react-native-toast'

import { onExitApp } from '../../utils/exitApp'

import accountDB from '../../db/account_db'

import { globalAllAccountsInfoAction,globalCurrentAccountInfoAction } from '../../actions/accountManageAction'
class Assets extends Component{
  constructor(props){
    super(props)
    this.state = {
      etzBalance: '0',
      navTitle: '',
      selectedAssetsList: [],
      isRefreshing: false,
      curAddr: '',
    }
  }

  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress',this.onBack)
    this.props.navigator.setTabButton({
      tabIndex: 0,
      label: I18n.t('assets')
    })
    this.props.navigator.setTabButton({
      tabIndex:1,
      label: I18n.t('mine')
    })
    this.setState({
      isRefreshing: true
    })
    
    this.getAllAccounts()
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress',this.onBack)
  }

  async getAllAccounts(){
    //所有的账户数据
    let findAccountsList = await accountDB.selectAccountTable('select * from account')
    this.props.dispatch(globalAllAccountsInfoAction(findAccountsList))

    findAccountsList.map((value,index) => {
      if(value.is_selected === 1){
        this.setState({
          navTitle: value.account_name,
          etzBalance: web3.utils.fromWei(value.assets_total,'ether')
        })
        //当前账户信息
        this.props.dispatch(globalCurrentAccountInfoAction(value))
      }
    })
  }

  onBack(){
    onExitApp()
  }

  //获取 token表数据 
  onFetch = (addr) => {
    if(!tk_db){
        tk_db = tkSqLite.open()
    }
    tk_db.transaction((tx) => {
      tx.executeSql(" select * from token ",[],(tx,results) => {
        let len = results.rows.length
        let selArr = []
        for(let i = 0; i < len; i ++ ){
          let data = results.rows.item(i)
          if(data.tk_selected === 1){
            selArr.push(data)
          }         
        }
        this.setState({
          selectedAssetsList: selArr
        })
        this.props.dispatch(refreshTokenInfoAction(addr))
        this.props.dispatch(initSelectedListAction(selArr,addr))
      },(error) => {
        // console.error(error)
        this.props.dispatch(insertToTokenAction(addr))
      })
    })
  }

  componentWillReceiveProps(nextProps){
    const { selectedAssetsList } = this.state //  willmount拉去的数据库中的数据   
    const { selectedList,refreshEnd } = this.props.tokenManageReducer //选中或取消选中操作后得到的数据
    if(selectedList !== nextProps.tokenManageReducer.selectedList){
      this.setState({
        selectedAssetsList:  nextProps.tokenManageReducer.selectedList
      })
    }


    if(refreshEnd !== nextProps.tokenManageReducer.refreshEnd && nextProps.tokenManageReducer.refreshEnd){
      this.setState({
        isRefreshing: false
      })

      web3.eth.getBalance(`0x${this.state.curAddr}`).then((res,rej)=>{
        this.setState({
          etzBalance: web3.utils.fromWei(res,'ether')
        })
      })

    }

    if(this.props.accountManageReducer.accountInfo !== nextProps.accountManageReducer.accountInfo){
      toSplash()
    }



    //删除了当前账号
    const { globalAccountsList, currentAccount } = nextProps.accountManageReducer

    if(this.props.accountManageReducer.deleteCurrentAccount !== nextProps.accountManageReducer.deleteCurrentAccount && nextProps.accountManageReducer.deleteCurrentAccount){
      this.setState({
        navTitle: globalAccountsList[0].account_name
      })
    }
    //切换账号
    if(this.props.accountManageReducer.currentAccount.account_name !== currentAccount.account_name){
      this.setState({
        navTitle: currentAccount.account_name
      })
    }
  }


 
  toAssetsDetail = (title,balance,token) => {
    this.props.navigator.push({
      screen: 'asset_detail_list',
      title,
      navigatorStyle: MainThemeNavColor,
      passProps:{
        etzBalance: balance,
        etz2rmb: 0,
        curToken: token,
      }
    })
  }

  onScan = () => {
    this.props.navigator.push({
      screen: 'scan_qr_code',
      title:I18n.t('scan'),
      navigatorStyle: Object.assign({},DetailNavigatorStyle,{
        navBarTextColor:'#fff',
        navBarBackgroundColor:'#000',
        statusBarColor:'#000',
        statusBarTextColorScheme:'light',
      }),
    })
  }

  onPay = () => {
    this.props.navigator.push({
      screen: 'on_payment',
      title:I18n.t('send'),
      navigatorStyle: DetailNavigatorStyle,
      passProps:{
        curToken: 'ETZ'
      }
    })
  }
  onCollection = () => {
    this.props.navigator.push({
      screen: 'on_receive',
      title:I18n.t('receive'),
      navigatorStyle: DetailNavigatorStyle,
    })
  }
  onTradingRecord = () => {
    this.props.navigator.push({
      screen: 'trading_record',
      title:I18n.t('tx_records'),
      navigatorStyle: Object.assign({},MainThemeNavColor,{navBarNoBorder:true}),
      // navigatorButtons: {
      //   rightButtons: [
      //     {
      //       icon: require('../../images/xhdpi/nav_ico_transactionrecords_picker_def.png'),
      //       id: 'calendar_picker'
      //     }
      //   ]
      // }
    })
  }
  
  addAssetsBtn = () => {
    this.props.navigator.push({
      screen: 'add_assets',
      title:I18n.t('add_assets'),
      navigatorStyle: DetailNavigatorStyle,
      // navigatorButtons: {
      //   rightButtons: [
      //     {
      //       id: 'search_token',
      //       icon: require('../../images/xhdpi/nav_search_addasset_def.png')
      //     }
      //   ]
      // }
    })
  }

  onDrawerCloseStart = () => {
    switchDrawer(false)
  }
  onDrawerOpenStart = () => {
    switchDrawer(true)
  }
  onCloseDrawer = () => {
    this._drawer.close()
  }
  onLeftDrawer = () => {
    this.props.navigator.push({
      screen:'msg_center_list',
      title:I18n.t('msg_center'),
      navigatorStyle: DetailNavigatorStyle,
      navigatorButtons: {
        rightButtons: [
          {
              title:'Readed All',
              id: 'readed_all'
          }
        ],
      },
    })
  }

  onRightDrawer = () => {
    this._drawer.open()
  }

  onRefresh = () => {
    this.setState({
        isRefreshing: true
    })
    this.props.dispatch(refreshTokenInfoAction(this.state.curAddr))
  }
  render(){
    const { selectedAssetsList,etzBalance, isRefreshing} = this.state
    
    const { currentAccount, globalAccountsList } = this.props.accountManageReducer
    console.log('当前账户',currentAccount)
    console.log('所有账户',globalAccountsList)
    return(
      <View style={{backgroundColor:'#F5F7FB',flex:1}}>
        {
          Platform.OS === 'ios' ? 
          <View style={{height: scaleSize(40),backgroundColor:'#144396'}}/>
          : null
        }
        <Drawer
          ref={(ref) => this._drawer = ref}
          type="overlay"
          openDrawerOffset={0.4}
          side={'right'}
          tapToClose={true}
          ref={(ref) => this._drawer = ref}
          content={<SwitchWallet thisPorps={this} onCloseSwitchDrawer={this.onCloseDrawer}/>}
          onCloseStart={this.onDrawerCloseStart}
          onOpenStart={this.onDrawerOpenStart}
        >
          <ScrollView 
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={this.onRefresh}
                tintColor={"#144396"}
                title={I18n.t('loading')}
                // titleColor="#00ff00"
                colors={['#fff']}
                progressBackgroundColor={"#1d53a6"}
              />
            }
          >
            <View style={[styles.navbarStyle,pubS.center,{paddingLeft: scaleSize(24),paddingRight: scaleSize(24)}]}>
              {
                // <TouchableOpacity activeOpacity={.6} onPress={this.onLeftDrawer}>
                //   <Image source={require('../../images/xhdpi/nav_ico_home_message_def.png')}style={styles.navImgStyle}/>
                // </TouchableOpacity>
                
              }
              <Text style={pubS.font30_1}>{this.state.navTitle}</Text>
              <TouchableOpacity activeOpacity={.6} onPress={this.onRightDrawer} style={styles.drawerStyle}>
                <Image source={require('../../images/xhdpi/nav_ico_home_more_def.png')} style={styles.navImgStyle}/>
              </TouchableOpacity>
            </View>
            <View>
              <View style={[styles.assetsTotalView,pubS.center,{height: Platform.OS === 'ios' ? scaleSize(260) : scaleSize(300)}]}>
                  <Text style={pubS.font72_1}>≈0</Text>
                  <Text style={pubS.font26_3}>{I18n.t('total_assets')}(¥)</Text>
              </View>

              <View style={[styles.optionView,pubS.center]}>
                  <View style={[pubS.rowCenterJus,{width: scaleSize(650)}]}>
                    <TouchableOpacity activeOpacity={.7} onPress={this.onScan} style={[styles.optionItem]}>
                      <Image source={require('../../images/xhdpi/btn_ico_home_scan_def.png')} style={styles.itemImageStyle}/>
                      <Text style={[pubS.font24_2,]}>{I18n.t('scan')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.7} onPress={this.onPay} style={[styles.optionItem]}>
                      <Image source={require('../../images/xhdpi/btn_ico_home_payment_def.png')} style={styles.itemImageStyle}/>
                      <Text style={[pubS.font24_2,]}>{I18n.t('send')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.7} onPress={this.onCollection} style={[styles.optionItem]}>
                      <Image source={require('../../images/xhdpi/btn_ico_home_collection_def.png')} style={styles.itemImageStyle}/>
                      <Text style={[pubS.font24_2,]}>{I18n.t('receive')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.7} onPress={this.onTradingRecord} style={[styles.optionItem]}>
                      <Image source={require('../../images/xhdpi/btn_ico_home_transactionrecords_def.png')} style={styles.itemImageStyle}/>
                      <Text style={[pubS.font24_2,]}>{I18n.t('tx_records')}</Text>
                    </TouchableOpacity>
                  </View>
              </View>
            </View>
            <AssetsItem
              shortName={etzTitle}
              fullName={'EtherZero'}
              coinNumber={splitDecimal(etzBalance)}
              price2rmb={0}
              onPressItem={() => this.toAssetsDetail(etzTitle,splitDecimal(etzBalance),'ETZ')}
            />
            {
              // selectedAssetsList.map((res,index) => {
              //   return(
              //     <AssetsItem
              //       key={index}
              //       shortName={res.tk_symbol}
              //       fullName={res.tk_name}
              //       coinNumber={splitDecimal(res.tk_number)}
              //       price2rmb={0}
              //       onPressItem={() => this.toAssetsDetail(res.tk_symbol,splitDecimal(res.tk_number),res.tk_symbol)}
              //     />
              //   )
              // })
            }
            <TouchableOpacity style={[styles.whStyle,styles.addBtnStyle,pubS.center]} activeOpacity={.7} onPress={this.addAssetsBtn}>
              <Text style={pubS.font24_3}>{`+ ${I18n.t('add_assets')}`}</Text>
            </TouchableOpacity>
          </ScrollView>
        </Drawer>
          
        
      </View>
    )
  }
}

class AssetsItem extends Component {
  render(){
    const { shortName, fullName, coinNumber, price2rmb, onPressItem} = this.props
    return(
      <TouchableOpacity style={[styles.listItemView,styles.whStyle]} activeOpacity={.7} onPress={onPressItem}>
        <Image source={require('../../images/xhdpi/etz_logo.png')} style={pubS.logoStyle}/>
        <View style={[styles.listItemTextView]}>
          <View style={pubS.rowCenterJus}>
            <Text style={pubS.font36_2}>{shortName}</Text>
            <Text style={pubS.font36_2}>{coinNumber}</Text> 
          </View>
          <View style={pubS.rowCenterJus}>
            <Text style={pubS.font24_2}>{fullName}</Text>
            <Text style={pubS.font24_2}>{`≈ ¥${price2rmb}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  drawerStyle:{
    // borderColor:'#fff',
    // borderWidth:1,
    height: scaleSize(87),
    width: scaleSize(160),
    position:"absolute",
    top: 0,
    right:scaleSize(24),
    alignItems:'flex-end',
    justifyContent:'center'
  },
  navImgStyle: {
    width:scaleSize(40),
    height: scaleSize(40)
  },
  navbarStyle:{
    height: scaleSize(87),
    backgroundColor: '#144396',
  },
  addBtnStyle:{
    borderStyle:'dashed',
    borderColor:'#B1CBFF',
    borderWidth: 1,
    borderRadius:4,
    marginTop: scaleSize(20),
    alignSelf:'center',
  },
  whStyle: {
    height: scaleSize(120),
    width: scaleSize(702),
  },
  listItemTextView:{
    width: scaleSize(618),
    marginLeft:scaleSize(18),
    paddingTop: scaleSize(15),
    paddingBottom: scaleSize(22),
    // borderColor:'red',
    // borderWidth:1,
  },
  listItemView:{
    backgroundColor:'#fff',
    paddingLeft: scaleSize(22),
    paddingRight: scaleSize(22),
    justifyContent:'center',
    flexDirection:'row',
    borderRadius: 4,
    alignSelf:'center',
    marginTop: scaleSize(20),
  },
  itemImageStyle:{
    height: scaleSize(90),
    width: scaleSize(90)
  },
  optionItem: {

    alignItems:'center',
    // borderColor:'blue',
    // borderWidth:1,
  },
  optionView: {
    height: scaleSize(180),
    paddingLeft: scaleSize(50),
    paddingRight: scaleSize(50),
    backgroundColor:'#fff',
    // borderColor:'red',
    // borderWidth:1,
  },
  assetsTotalView: {
    
    backgroundColor:'#144396',
    // backgroundColor:'red',

  }
})
export default connect(
  state => ({
    accountManageReducer: state.accountManageReducer,
    tokenManageReducer: state.tokenManageReducer
  })
)(Assets)
