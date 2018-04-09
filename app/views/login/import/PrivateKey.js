import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'

import { pubS } from '../../../styles/'
import { setScaleText, scaleSize } from '../../../utils/adapter'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'
import { TextInputComponent,Btn,Loading } from '../../../components/'
import { toSplash } from '../../../root'
import { importAccountAction } from '../../../actions/accountManageAction'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
class PrivateKey extends Component{
  constructor(props){
    super(props)
    this.state = {
      privKeyVal: '',
      psdVal: '',
      repeadPsdVal: '',
      promptVal: '',
      privKeyWarning: '',
      psdWarning: '',
      rePsdWarning: '',
      userNameVal: '',
      userNameWarning: '',
      visible: false,
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
  onChangePrivateText = (val) => {
    this.setState({
      privKeyVal: val,
      privKeyWarning: ''
    })
  }
  onChangPsdText = (val) => {
    this.setState({
      psdVal: val,
      psdWarning: ''
    })
  }
  onChangeRepeatText = (val) => {
    this.setState({
      repeadPsdVal: val,
      rePsdWarning: ''
    })
  }
  onChangePromptText = (val) => {
    this.setState({
      promptVal: val
    })
  }
  onPressImport = () => {
    const { privKeyWarning, psdWarning, rePsdWarning, privKeyVal, psdVal, repeadPsdVal,userNameVal, userNameWarning} = this.state
    let privReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{64}$/

    let psdReg = /^(?=.*[a-z])(?=.)(?=.*\d)[a-z\d]{8,}$/
    if(userNameVal.length === 0){
      this.setState({
        userNameWarning: 'please enter the account name'
      })
    }else{
      if(!privReg.test(privKeyVal)){
        this.setState({
          privKeyWarning: 'Wrong Private Key',
        })
      }else{
        if(!psdReg.test(psdVal)){
          this.setState({
            psdWarning: 'password needs to contain both letters and Numbers, and at least 8 digits.'
          })
        }else{
          if(psdVal !== repeadPsdVal){
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
    // let k = '2ac64a6227001d48f128ba5948b132c90e312e7156760748a5b349d236cf1526'
    const { privKeyVal, psdVal,userNameVal } = this.state
    this.setState({
      visible: true
    })    
    setTimeout(() => {
      this.props.dispatch(importAccountAction({
        privateKey: privKeyVal,
        privatePassword: psdVal,
        privateUserName: userNameVal,
        type: 'private'
      }))
    },100)
  }
  onChangeUseNameText = (val) => {
    this.setState({
      userNameVal: val,
      userNameWarning: ''
    })
  }
  render(){
    const { privKeyVal, psdVal, repeadPsdVal, promptVal, privKeyWarning, psdWarning, rePsdWarning,userNameVal, userNameWarning } = this.state
    return(
      <View>
        <TextInputComponent
          placeholder={'wallet name'}
          value={userNameVal}
          onChangeText={this.onChangeUseNameText}
          warningText={userNameWarning}//
        />
        <TextInputComponent
          isMultiline={true}
          placeholder={'Import Private Key'}
          value={privKeyVal}
          onChangeText={this.onChangePrivateText}
          warningText={privKeyWarning}
          iptMarginTop={scaleSize(60)}
        />
        <TextInputComponent
          placeholder={'password'}
          value={psdVal}
          onChangeText={this.onChangPsdText}
          secureTextEntry={true}
          warningText={psdWarning}
        />
        <TextInputComponent
          placeholder={'repeat password'}
          value={repeadPsdVal}
          onChangeText={this.onChangeRepeatText}
          secureTextEntry={true}
          warningText={rePsdWarning}
        />
        {
          // <TextInputComponent
          //   placeholder={'password hint (Optional)'}
          //   value={promptVal}
          //   onChangeText={this.onChangePromptText}
          // />
          
        }
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
)(PrivateKey)