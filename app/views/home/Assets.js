import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Platform
} from 'react-native'

import { pubS,DetailNavigatorStyle,MainThemeNavColor,ScanNavStyle } from '../../styles/'
import { setScaleText, scaleSize } from '../../utils/adapter'
import Drawer from 'react-native-drawer'
import { connect } from 'react-redux'
class Assets extends Component{
  constructor(props){
    super(props)
    this.state = {
      etzBalance: 0
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  onNavigatorEvent (event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'right_drawer') {
        this.props.navigator.toggleDrawer({
          side: 'right', 
          animated: true,
          // to: 'open'
        })
      }
      if (event.id == 'left_drawer') {
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
    }
    
  }
  componentWillMount(){

    const { accountInfo } = this.props.accountManageReducer
    accountInfo.map((val,index) => {
      // console.log('val1111111111111',val)
      if(val.is_selected === 1){

        this.props.navigator.setTitle({
          title: val.account_name
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

  // renderItem = (item) => {
  //   // let res = item.item
  //     return(
  //       <TouchableOpacity style={[styles.listItemView,styles.whStyle]} activeOpacity={.7} onPress={this.toAssetsDetail}>
  //         <Image source={require('../../images/xhdpi/etz_logo.png')} style={{width: scaleSize(44),height:scaleSize(44),marginTop: scaleSize(22)}}/>
  //         <View style={[styles.listItemTextView]}>
  //           <View style={pubS.rowCenterJus}>
  //             <Text style={pubS.font36_2}>ETZ</Text>
  //             <Text style={pubS.font36_2}>1,234</Text>
  //           </View>
  //           <View style={pubS.rowCenterJus}>
  //             <Text style={pubS.font24_2}>Bitcoin</Text>
  //             <Text style={pubS.font24_2}>≈ ¥ 123,456,789,0</Text>
  //           </View>
  //         </View>
  //       </TouchableOpacity>
  //     )
  // }

  // ListFooterComponent = () => {
  //   return(
  //     <TouchableOpacity style={[styles.whStyle,styles.addBtnStyle,pubS.center]} activeOpacity={.7} onPress={this.addAssetsBtn}>
  //       <Text style={pubS.font24_3}>+添加资产</Text>
  //     </TouchableOpacity>
  //   )
  // }
  toAssetsDetail = () => {
    this.props.navigator.push({
      screen: 'asset_detail_list',
      title:'ETZ',
      navigatorStyle: MainThemeNavColor,
      passProps:{
        etzBalance: this.state.etzBalance,
        etz2rmb: 0,
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
      title:'Payment',
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
      navigatorButtons: {
        rightButtons: [
          {
            icon: require('../../images/xhdpi/nav_ico_transactionrecords_picker_def.png'),
            id: 'calendar_picker'
          }
        ]
      }
    })
  }
  // ListHeaderComponent = () => {
  //   return(
  //     <View>
  //       <View style={[styles.assetsTotalView,pubS.center]}>
  //           <Text style={pubS.font72_1}>≈110,110,110</Text>
  //           <Text style={pubS.font26_3}>Total Assets(￥)</Text>
  //       </View>

  //       <View style={[styles.optionView,pubS.center]}>
  //           <View style={[pubS.rowCenterJus,{width: scaleSize(650)}]}>
  //             <TouchableOpacity activeOpacity={.7} onPress={this.onScan} style={[styles.optionItem]}>
  //               <Image source={require('../../images/xhdpi/btn_ico_home_scan_def.png')} style={styles.itemImageStyle}/>
  //               <Text style={[pubS.font24_2,]}>Scan</Text>
  //             </TouchableOpacity>
  //             <TouchableOpacity activeOpacity={.7} onPress={this.onPay} style={[styles.optionItem]}>
  //               <Image source={require('../../images/xhdpi/btn_ico_home_payment_def.png')} style={styles.itemImageStyle}/>
  //               <Text style={[pubS.font24_2,]}>Payment</Text>
  //             </TouchableOpacity>
  //             <TouchableOpacity activeOpacity={.7} onPress={this.onCollection} style={[styles.optionItem]}>
  //               <Image source={require('../../images/xhdpi/btn_ico_home_collection_def.png')} style={styles.itemImageStyle}/>
  //               <Text style={[pubS.font24_2,]}>Receive</Text>
  //             </TouchableOpacity>
  //             <TouchableOpacity activeOpacity={.7} onPress={this.onTradingRecord} style={[styles.optionItem]}>
  //               <Image source={require('../../images/xhdpi/btn_ico_home_transactionrecords_def.png')} style={styles.itemImageStyle}/>
  //               <Text style={[pubS.font24_2,]}>Records</Text>
  //             </TouchableOpacity>
  //           </View>
  //       </View>
  //     </View>
  //   )
  // }
  addAssetsBtn = () => {
    alert('add')
  }
  render(){

    return(
      <View style={[pubS.container,{backgroundColor:'#F5F7FB'}]}>
        {
          // <FlatList
          //   data={DATA}
          //   renderItem={this.renderItem}
          //   keyExtractor = {(item, index) => index}
          //   // ListFooterComponent={this.ListFooterComponent}
          //   ListHeaderComponent={this.ListHeaderComponent}
          // />
        }
        
          <View>
            <View style={[styles.assetsTotalView,pubS.center]}>
                <Text style={pubS.font72_1}>≈0</Text>
                <Text style={pubS.font26_3}>Total Assets(￥)</Text>
            </View>

            <View style={[styles.optionView,pubS.center]}>
                <View style={[pubS.rowCenterJus,{width: scaleSize(650)}]}>
                  <TouchableOpacity activeOpacity={.7} onPress={this.onScan} style={[styles.optionItem]}>
                    <Image source={require('../../images/xhdpi/btn_ico_home_scan_def.png')} style={styles.itemImageStyle}/>
                    <Text style={[pubS.font24_2,]}>Scan</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={.7} onPress={this.onPay} style={[styles.optionItem]}>
                    <Image source={require('../../images/xhdpi/btn_ico_home_payment_def.png')} style={styles.itemImageStyle}/>
                    <Text style={[pubS.font24_2,]}>Payment</Text>
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
          <TouchableOpacity style={[styles.listItemView,styles.whStyle]} activeOpacity={.7} onPress={this.toAssetsDetail}>
            <Image source={require('../../images/xhdpi/etz_logo.png')} style={{width: scaleSize(44),height:scaleSize(44),marginTop: scaleSize(22)}}/>
            <View style={[styles.listItemTextView]}>
              <View style={pubS.rowCenterJus}>
                <Text style={pubS.font36_2}>ETZ</Text>
                <Text style={pubS.font36_2}>{this.state.etzBalance}</Text>
              </View>
              <View style={pubS.rowCenterJus}>
                <Text style={pubS.font24_2}>EtherZero</Text>
                <Text style={pubS.font24_2}>≈ ¥ 0</Text>
              </View>
            </View>
          </TouchableOpacity>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
    accountManageReducer: state.accountManageReducer
  })
)(Assets)
