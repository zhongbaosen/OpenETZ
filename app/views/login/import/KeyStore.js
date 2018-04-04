import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'

import { pubS,DetailNavigatorStyle } from '../../../styles/'
import { setScaleText, scaleSize } from '../../../utils/adapter'
import { TextInputComponent,Btn,Loading } from '../../../components/'
class KeyStore extends Component{
  constructor(props){
    super(props)
    this.state={
      visible: false,
      keystoreVal: '',
      keystoreWarning: '',
      passwordVal: '',
      passwordWarning: '',
    }
  }

  onChangeMemonic = (val) => {
    this.setState({
      mnemonicVal: val,
      privKeyWarning: ''
    })
  }
  onChangPassword = (val) => {
    this.setState({
      passwordVal: val,
      passwordWarning: ''
    })
  }

  onPressImport = () => {
    
  }
  render(){
    const { keystoreVal, keystoreWarning, passwordVal, passwordWarning, } = this.state
    return(
      <View style={pubS.container}>
        <TextInputComponent
          isMultiline={true}
          placeholder={'keystore text content'}
          value={keystoreVal}
          onChangeText={this.onChangelKeystore}
          warningText={keystoreWarning}
          iptMarginTop={scaleSize(60)}
        />
        <TextInputComponent
          placeholder={'password'}
          value={passwordVal}
          onChangeText={this.onChangPassword}
          secureTextEntry={true}
          warningText={passwordWarning}
        />
        <Btn
          btnMarginTop={scaleSize(60)}
          btnPress={this.onPressImport}
          btnText={'import'}
        />
        <Loading loadingVisible={this.state.visible} loadingText={'importing account'}/>
      </View>
    )
  }
}
export default KeyStore