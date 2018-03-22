//交易记录 付款

import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native'

import { pubS,DetailNavigatorStyle } from '../../../styles/'
import { setScaleText, scaleSize } from '../../../utils/adapter'
import RecordListItem from './RecordListItem'
const DATA = [
  {
    a_type: 'ETZ',
    a_total_name: 'Bitcoin',
    a_dollar: '123,45',
    a_mrb: '123,345,67',
  },
]


class RecordPay extends Component{
  renderPay = () => {
    return(
      <RecordListItem
        payFail={true}
      />
    )
  }
  render(){
    return(
      <View style={[pubS.container,{backgroundColor:'#F5F7FB',paddingTop: scaleSize(10)}]}>
        <FlatList
          data={DATA}
          renderItem={this.renderPay}
          keyExtractor = {(item, index) => index}
        />
      </View>
    )
  }
}
export default RecordPay
