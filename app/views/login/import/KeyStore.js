import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ToastAndroid
} from 'react-native'

import { pubS,DetailNavigatorStyle } from '../../../styles/'
import { setScaleText, scaleSize } from '../../../utils/adapter'
import { TextInputComponent,Btn,Loading } from '../../../components/'
import { importAccountAction,resetDeleteStatusAction } from '../../../actions/accountManageAction'
import { connect } from 'react-redux'
import { toSplash } from '../../../root'
class KeyStore extends Component{
  constructor(props){
    super(props)
    this.state={
      visible: false,
      keystoreVal: '',
      keystoreWarning: '',
      userNameVal: '',
      userNameWarning: '',
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.accountManageReducer.importSucc !== this.props.accountManageReducer.importSucc && nextProps.accountManageReducer.importSucc){
      this.setState({
        visible: false
      })
      ToastAndroid.show('import successful',3000)
      setTimeout(() => {
        toSplash()
      },100)
      this.props.dispatch(resetDeleteStatusAction())
    }
  }
  onChangelKeystore = (val) => {
    this.setState({
      keystoreVal: val,
      keystoreWarning: ''
    })
  }
  onChangeUseNameText = (val) => {
    this.setState({
      userNameVal: val,
      userNameWarning: '',
    })
  }

  onPressImport = () => {
    const { keystoreVal, keystoreWarning,userNameVal,userNameWarning } = this.state
    if(userNameVal.length === 0){
      this.setState({
        userNameWarning: 'please enter the account name'
      })
    }else{
      if(keystoreVal.length === 0){
        this.setState({
          keystoreWarning: 'please enter the keystore'
        })
      }else{
        this.onBtn()
      }
    }
    
  }

  onBtn = () => {
    const { keystoreVal, userNameVal } = this.state 
    this.setState({
      visible: true
    })
    setTimeout(() => {
      this.props.dispatch(importAccountAction({
        keystoreVal,
        keystoreUserName: userNameVal,
        type: 'keystore',
      }))
    },100)
  }
  render(){
    const { keystoreVal, keystoreWarning,userNameVal,userNameWarning } = this.state
    return(
      <View style={pubS.container}>
        <Loading loadingVisible={this.state.visible} loadingText={'importing account'}/>
        <TextInputComponent
          placeholder={'wallet name'}
          value={userNameVal}
          onChangeText={this.onChangeUseNameText}
          warningText={userNameWarning}//
        />
        <TextInputComponent
          isMultiline={true}
          placeholder={'keystore text content'}
          value={keystoreVal}
          onChangeText={this.onChangelKeystore}
          warningText={keystoreWarning}
          iptMarginTop={scaleSize(60)}
        />
        {
          // <TextInputComponent
          //   placeholder={'password'}
          //   value={passwordVal}
          //   onChangeText={this.onChangPassword}
          //   secureTextEntry={true}
          //   warningText={passwordWarning}
          // />
        }
        <Btn
          btnMarginTop={scaleSize(60)}
          btnPress={this.onPressImport}
          btnText={'import'}
        />
      </View>
    )
  }
}
export default connect(
  state => ({
    accountManageReducer: state.accountManageReducer
  })
)(KeyStore)