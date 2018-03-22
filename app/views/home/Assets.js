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

import { pubS,DetailNavigatorStyle,MainThemeNavColor } from '../../styles/'
import { setScaleText, scaleSize } from '../../utils/adapter'

const DATA = [
  {
    a_type: 'ETZ',
    a_total_name: 'Bitcoin',
    a_dollar: '123,45',
    a_mrb: '123,345,67',
  },

]
class Assets extends Component{
  constructor(props){
    super(props)
    this.state = {

    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }
  onNavigatorEvent (event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'right_drawer') {
        alert('right_drawer')
      }
      if (event.id == 'left_drawer') {
        this.props.navigator.push({
          screen:'msg_center_list',
          title:'消息中心',
          navigatorStyle: DetailNavigatorStyle,
          navigatorButtons: {
            rightButtons: [
              {
                  title:'全部已读',
                  id: 'readed_all'
              }
            ],
          },
        })
      }
    }
  }
  renderItem = (item) => {
    // let res = item.item
      return(
        <TouchableOpacity style={[styles.listItemView,styles.whStyle]} activeOpacity={.7} onPress={this.toAssetsDetail}>
          <Image source={require('../../images/xhdpi/btn_ico_home_scan_def.png')} style={{width: scaleSize(44),height:scaleSize(44),marginTop: scaleSize(22)}}/>
          <View style={[styles.listItemTextView]}>
            <View style={pubS.rowCenterJus}>
              <Text style={pubS.font36_2}>ETZ</Text>
              <Text style={pubS.font36_2}>1,234</Text>
            </View>
            <View style={pubS.rowCenterJus}>
              <Text style={pubS.font24_2}>Bitcoin</Text>
              <Text style={pubS.font24_2}>≈ ¥ 123,456,789,0</Text>
            </View>
          </View>
        </TouchableOpacity>
      )
  }

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
        statusBarTextColorScheme:'light'
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
  ListHeaderComponent = () => {
    return(
      <View>
        <View style={[styles.assetsTotalView,pubS.center]}>
            <Text style={pubS.font72_1}>≈110,110,110</Text>
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
    )
  }
  addAssetsBtn = () => {
    alert('add')
  }
  render(){
    return(
      <View style={[pubS.container,{backgroundColor:'#F5F7FB'}]}>
          <FlatList
            data={DATA}
            renderItem={this.renderItem}
            keyExtractor = {(item, index) => index}
            // ListFooterComponent={this.ListFooterComponent}
            ListHeaderComponent={this.ListHeaderComponent}
          />
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
    backgroundColor:'#023193',
    // backgroundColor:'red',

  }
})
export default Assets
