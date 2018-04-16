import React, { Component } from 'react'
import {
  View,
  Text,
  WebView,
} from 'react-native'

import { pubS,DetailNavigatorStyle } from '../../styles/'
import { setScaleText, scaleSize } from '../../utils/adapter'

class HelpCenter extends Component{
  render(){
    return(
        <WebView  
          source={{uri:'http://mp.weixin.qq.com/s/8RQ8GOi0d2z03vYcTjsCrw'}}
          style={{flex:1,alignSelf:'center',width: scaleSize(750)}}
        />
    )
  }
}
export default HelpCenter
