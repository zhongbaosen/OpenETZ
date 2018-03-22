import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native'

import { pubS,DetailNavigatorStyle,MainThemeNavColor } from '../../styles/'
import { setScaleText, scaleSize } from '../../utils/adapter'
import RecordListItem from './tradingRecord/RecordListItem'
const DATA = [
  {
    a_type: 'ETZ',
    a_total_name: 'Bitcoin',
    a_dollar: '123,45',
    a_mrb: '123,345,67',
  },
  {
    a_type: 'ETZ',
    a_total_name: 'Bitcoin',
    a_dollar: '123,45',
    a_mrb: '123,345,67',
  },
]

class AssetDetailList extends Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }
  toTradingRecordDetail = () => {
    this.props.navigator.push({
      screen: 'trading_record_detail',
      title:'Transaction Records',
      navigatorStyle: MainThemeNavColor,
    })
  }
  renderItem = () => {
    return(
      <RecordListItem
        style={{marginBottom: scaleSize(10)}}
        listIcon={require('../../images/xhdpi/lab_ico_selectasset_collection_def.png')}
        listIconStyle={{width: scaleSize(20),height:scaleSize(20)}}
        onPressListItem={this.toTradingRecordDetail}
      />
    )
  }
  ListHeaderComponent = () => {
      return(
        <View style={[styles.listViewStyle,pubS.center]}>
          <Text style={pubS.font72_1}>123,456,78</Text>
          <Text style={pubS.font26_3}>≈ ¥ 123,456,78</Text>
        </View>
      )
  }
  payBtn = () => {
    this.props.navigator.push({
      screen: 'on_payment',
      title:'Payment',
      navigatorStyle: DetailNavigatorStyle,
    })
  }
  collectBtn = () => {
    this.props.navigator.push({
      screen: 'on_collection',
      title:'Receive',
      navigatorStyle: DetailNavigatorStyle,
    })
  }
  render(){
    return(
      <View style={[pubS.container,{backgroundColor:'#F5F7FB'}]}>
        <FlatList
          data={DATA}
          renderItem={this.renderItem}
          keyExtractor = {(item, index) => index}
          ListHeaderComponent={this.ListHeaderComponent}
        />
        <View style={[styles.bottomBtnStyle,pubS.rowCenter]}>
          <TouchableOpacity activeOpacity={.7} onPress={this.payBtn} style={[styles.btnStyle,{backgroundColor:'#FFAA3B'},pubS.center]}>
            <Text style={pubS.font30_3}>Payment</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.7} onPress={this.collectBtn} style={[styles.btnStyle,{backgroundColor:'#FF9844'},pubS.center]}>
            <Text style={pubS.font30_3}>Receive</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btnStyle:{
    width: '50%',
    height: scaleSize(96),
  },
  bottomBtnStyle:{
    width: scaleSize(750),
    height: scaleSize(96),
    position:'absolute',
    bottom: 0,
  },
  listViewStyle:{
    height: scaleSize(280),
    backgroundColor: '#023193',

  },
})
export default AssetDetailList
