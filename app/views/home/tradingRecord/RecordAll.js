//交易记录 全部

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
import { sliceAddress,timeStamp2Date } from '../../../utils/splitNumber'

class RecordAll extends Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }

  renderAll = (item) => {
    let res = item.item
    return(
      <RecordListItem
        receiverAddress={sliceAddress(res.tx_receiver)}
        receiverTime={timeStamp2Date(res.tx_time)}
        receiverVal={`-${res.tx_value}`}
      />
    )
  }
  render(){
    return(
      <View style={[pubS.container,{backgroundColor:'#F5F7FB',paddingTop: scaleSize(10)}]}>
        <FlatList
          data={this.props.list}
          renderItem={this.renderAll}
          keyExtractor = {(item, index) => index}
        />
      </View>
    )
  }
}
export default RecordAll
