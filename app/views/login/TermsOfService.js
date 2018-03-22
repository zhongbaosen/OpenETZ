

import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'

import { pubS,DetailNavigatorStyle } from '../../styles/'
import { setScaleText, scaleSize } from '../../utils/adapter'

class TermsOfService extends Component{
  render(){
    return(
      <View>
        <Text>服务条款</Text>
      </View>
    )
  }
}
export default TermsOfService
