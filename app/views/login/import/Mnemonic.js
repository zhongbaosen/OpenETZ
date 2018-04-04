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
class Mnemonic extends Component{
  constructor(props){
    super(props)
    this.state={
      visible: false,
      mnemonicVal: '',
      privKeyWarning: '',
      passwordVal: '',
      passwordWarning: '',
      repeadPsdVal: '',
      rePsdWarning: '',
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
  onChangeRePassword = (val) => {
    this.setState({
      repeadPsdVal: val,
      rePsdWarning: ''
    })
  }
  onPressImport = () => {
    
  }
  render(){
    const { mnemonicVal, privKeyWarning, passwordVal, passwordWarning, repeadPsdVal, rePsdWarning, } = this.state
    return(
      <View style={pubS.container}>
        <TextInputComponent
          isMultiline={true}
          placeholder={'mnemonic'}
          value={mnemonicVal}
          onChangeText={this.onChangeMemonic}
          warningText={privKeyWarning}
          iptMarginTop={scaleSize(60)}
        />
        <TextInputComponent
          placeholder={'password'}
          value={passwordVal}
          onChangeText={this.onChangPassword}
          secureTextEntry={true}
          warningText={passwordWarning}
        />
       
        <TextInputComponent
          placeholder={'repeat password'}
          value={repeadPsdVal}
          onChangeText={this.onChangeRePassword}
          secureTextEntry={true}
          warningText={rePsdWarning}
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
export default Mnemonic