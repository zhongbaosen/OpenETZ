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
const tkSqLite = new TokenSQLite()
let tk_db
import { insertToTokenAction,initSelectedListAction,refreshTokenInfoAction } from '../../actions/tokenManageAction'
let etzTitle = "ETZ"

// import { passAccountsInfoAction } from '../../actions/accountManageAction' 
class Assets extends Component{
  constructor(props){
    super(props)
    this.state = {
      etzBalance: 0,
      navTitle: '',
      selectedAssetsList: [],
      isRefreshing: false,
      curAddr: '',
    }
    // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }
  componentWillMount(){
    // this.props.dispatch(passAccountsInfoAction())

  }

  componentDidMount(){
    const { accountInfo } = this.props.accountManageReducer

    console.log('accountInfo  Assets111', accountInfo)

    this.setState({
      isRefreshing: true
    })
    accountInfo.map((val,index) => {
      if(val.is_selected === 1){
        this.onFetch(val.address)
        
        this.setState({
          navTitle: val.account_name,
          curAddr: val.address
        })
        web3.eth.getBalance(`0x${val.address}`).then((res,rej)=>{
          // console.log('res==',res)
          this.setState({
            etzBalance: web3.utils.fromWei(res,'ether')
          })
        })
      }
    })

  }

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
      title:'Scan',
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
      title:'Send',
      navigatorStyle: DetailNavigatorStyle,
      
    })
  }
  onCollection = () => {
    this.props.navigator.push({
      screen: 'on_collection',
      title:'Receive',
      navigatorStyle: DetailNavigatorStyle,
    })
  }
  onTradingRecord = () => {
    this.props.navigator.push({
      screen: 'trading_record',
      title:'Transaction Records',
      navigatorStyle: MainThemeNavColor,
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
      title:'Add Assets',
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
    // this.props.dispatch(onSwitchDrawerAction(0))
  }
  onDrawerOpenStart = () => {
    switchDrawer(true)
    // this.props.dispatch(onSwitchDrawerAction(1))
  }
  onCloseDrawer = () => {
    this._drawer.close()
  }
  onLeftDrawer = () => {
    this.props.navigator.push({
      screen:'msg_center_list',
      title:'MessageCenter',
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
    

    return(
      <View style={[pubS.container,{backgroundColor:'#F5F7FB'}]}>
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
                tintColor="#144396"
                title="Loading..."
                // titleColor="#00ff00"
                colors={['#fff']}
                progressBackgroundColor="#1d53a6"
              />
            }
          >
            <View style={[styles.navbarStyle,pubS.rowCenterJus,{paddingLeft: scaleSize(24),paddingRight: scaleSize(24)}]}>
              {
                // <TouchableOpacity activeOpacity={.6} onPress={this.onLeftDrawer}>
                //   <Image source={require('../../images/xhdpi/nav_ico_home_message_def.png')}style={styles.navImgStyle}/>
                // </TouchableOpacity>
                
              }
              <View style={styles.navImgStyle}/>
              <Text style={pubS.font30_1}>{this.state.navTitle}</Text>
              <TouchableOpacity activeOpacity={.6} onPress={this.onRightDrawer}>
                <Image source={require('../../images/xhdpi/nav_ico_home_more_def.png')} style={styles.navImgStyle}/>
              </TouchableOpacity>
            </View>
            <View>
              <View style={[styles.assetsTotalView,pubS.center]}>
                  <Text style={pubS.font72_1}>≈0</Text>
                  <Text style={pubS.font26_3}>Total Assets(¥)</Text>
              </View>

              <View style={[styles.optionView,pubS.center]}>
                  <View style={[pubS.rowCenterJus,{width: scaleSize(650)}]}>
                    <TouchableOpacity activeOpacity={.7} onPress={this.onScan} style={[styles.optionItem]}>
                      <Image source={require('../../images/xhdpi/btn_ico_home_scan_def.png')} style={styles.itemImageStyle}/>
                      <Text style={[pubS.font24_2,]}>Scan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.7} onPress={this.onPay} style={[styles.optionItem]}>
                      <Image source={require('../../images/xhdpi/btn_ico_home_payment_def.png')} style={styles.itemImageStyle}/>
                      <Text style={[pubS.font24_2,]}>Send</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.7} onPress={this.onCollection} style={[styles.optionItem]}>
                      <Image source={require('../../images/xhdpi/btn_ico_home_collection_def.png')} style={styles.itemImageStyle}/>
                      <Text style={[pubS.font24_2,]}>Receive</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.7} onPress={this.onTradingRecord} style={[styles.optionItem]}>
                      <Image source={require('../../images/xhdpi/btn_ico_home_transactionrecords_def.png')} style={styles.itemImageStyle}/>
                      <Text style={[pubS.font24_2,]}>Records</Text>
                    </TouchableOpacity>
                  </View>
              </View>
            </View>
            <AssetsItem
              shortName={etzTitle}
              fullName={'EtherZero'}
              coinNumber={etzBalance}
              price2rmb={0}
              onPressItem={() => this.toAssetsDetail(etzTitle,this.state.etzBalance,'ETZ')}
            />
            {
              selectedAssetsList.map((res,index) => {
                return(
                  <AssetsItem
                    key={index}
                    shortName={res.tk_symbol}
                    fullName={res.tk_name}
                    coinNumber={res.tk_number}
                    price2rmb={0}
                    onPressItem={() => this.toAssetsDetail(res.tk_symbol,res.tk_number,res.tk_symbol)}
                  />
                )
              })
            }
            <TouchableOpacity style={[styles.whStyle,styles.addBtnStyle,pubS.center]} activeOpacity={.7} onPress={this.addAssetsBtn}>
              <Text style={pubS.font24_3}>+Add Assets</Text>
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
    height: scaleSize(300),
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
