import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import { pubS } from '../styles/'
import { setScaleText, scaleSize } from '../utils/adapter'

export default class ArrowToDetail extends Component {
  render(){
    const { arrowText, arrowIcon, arrowOnPress, } = this.props
    return(
      <TouchableOpacity activeOpacity={.7} onPress={arrowOnPress} style={[styles.arrowViewStyle,pubS.rowCenterJus,pubS.paddingRow40,pubS.bottomStyle]}>
        <View style={[pubS.rowCenter,{}]}>
          <Image source={arrowIcon} style={styles.arrowIconStyle}/>
          <Text style={[pubS.font32_1,{marginLeft: scaleSize(31)}]}>{arrowText}</Text>
        </View>
        <Image source={require('../images/xhdpi/btn_ico_payment_select_def.png')} style={{width: scaleSize(16),height: scaleSize(30)}}/>
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  arrowIconStyle: {
    height: scaleSize(50),
    width: scaleSize(50),
  },
  arrowViewStyle: {
    height: scaleSize(120),
    width: scaleSize(750),
    backgroundColor:'#fff',
  },
})