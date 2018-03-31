import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

import { pubS } from '../../styles/'
import { setScaleText, scaleSize } from '../../utils/adapter'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'
import  PrivateKey from './PrivateKey'



export default class ImportAccount extends Component{
  render(){
    return(
      <View style={pubS.container}>
        
            <PrivateKey thisProps={this}/>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  underlineStyle: {
    borderColor: '#2B8AFF',
    backgroundColor: '#2B8AFF',
    borderBottomWidth:3,
    height:0,
  }
})

