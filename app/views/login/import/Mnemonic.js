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
import { importAccountAction } from '../../../actions/accountManageAction'
import { connect } from 'react-redux'
import { toSplash } from '../../../root'
class Mnemonic extends Component{
  constructor(props){
    super(props)
    this.state={
      visible: false,
      // mnemonicVal: 'rhythm example taxi leader divorce prosper arm add tower snake domain still',
      mnemonicVal: '',
      mnemonicValWarning: '',
      passwordVal: '',
      passwordWarning: '',
      repeadPsdVal: '',
      rePsdWarning: '',
      userNameVal: '',
      userNameWarning: '',
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.accountManageReducer.importSucc !== this.props.accountManageReducer.importSucc && nextProps.accountManageReducer.importSucc){
      this.setState({
        visible: false
      })
      toSplash()
    }
  }
  onChangeMemonic = (val) => {
    this.setState({
      mnemonicVal: val,
      mnemonicValWarning: ''
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
  onChangeUseNameText = (val) => {
    this.setState({
      userNameVal: val,
      userNameWarning: ''
    })
  }
  onPressImport = () => {
   const { mnemonicVal, mnemonicValWarning, passwordVal, passwordWarning, repeadPsdVal, rePsdWarning,userNameVal } = this.state
   let psdReg = /^(?=.*[a-z])(?=.)(?=.*\d)[a-z\d]{8,}$/
   if(userNameVal.length === 0){
      this.setState({
        userNameWarning: 'please enter the account name'
      })
    }else{
      if(mnemonicVal.length === 0){
        this.setState({
          mnemonicValWarning: 'please enter the mnemonic'
        })
      }else{
        if(!psdReg.test(passwordVal)){
          this.setState({
            passwordWarning: 'password needs to contain both letters and Numbers, and at least 8 digits.'
          })
        }else{
          if(passwordVal !== repeadPsdVal){
            this.setState({
              rePsdWarning: 'two passwords are different'
            })
          }else{
            this.onImport()
          }
        }
      }
    }
  }

  onImport = () => {
    const { mnemonicVal, passwordVal, userNameVal} = this.state
    this.setState({
      visible: true
    })    
    setTimeout(() => {
      this.props.dispatch(importAccountAction({
        mnemonicVal,
        mnemonicPsd: passwordVal,
        mnemonicUserName: userNameVal,
        type: 'mnemonic',
      }))
    },100)
  }
  render(){
    const { mnemonicVal, mnemonicValWarning, passwordVal, passwordWarning, repeadPsdVal, rePsdWarning,userNameVal, userNameWarning } = this.state
    return(
      <View style={pubS.container}>
        <TextInputComponent
          placeholder={'wallet name'}
          value={userNameVal}
          onChangeText={this.onChangeUseNameText}
          warningText={userNameWarning}//
        />
        <TextInputComponent
          isMultiline={true}
          placeholder={'mnemonic'}
          value={mnemonicVal}
          onChangeText={this.onChangeMemonic}
          warningText={mnemonicValWarning}
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
export default connect(
  state => ({
    accountManageReducer: state.accountManageReducer
  })
)(Mnemonic)