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
import { importAccountAction,resetDeleteStatusAction } from '../../../actions/accountManageAction'
import { connect } from 'react-redux'
import { toSplash } from '../../../root'
import I18n from 'react-native-i18n'
import Toast from 'react-native-toast'
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
      Toast.show('import successfully')
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
        userNameWarning: I18n.t('enter_account_name')
      })
    }else{
      if(keystoreVal.length === 0){
        this.setState({
          keystoreWarning: I18n.t('keystore_warning')
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
    },1000)
  }
  render(){
    const { keystoreVal, keystoreWarning,userNameVal,userNameWarning } = this.state
    return(
      <View style={pubS.container}>
        <Loading loadingVisible={this.state.visible} loadingText={I18n.t('loading_importing_account')}/>
        <TextInputComponent
          placeholder={I18n.t('account_name')}
          value={userNameVal}
          onChangeText={this.onChangeUseNameText}
          warningText={userNameWarning}//
        />
        <TextInputComponent
          isMultiline={true}
          placeholder={I18n.t('keystore_content')}
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
          btnText={I18n.t('import')}
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