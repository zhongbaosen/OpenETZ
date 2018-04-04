import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert
} from 'react-native'

import { pubS,DetailNavigatorStyle } from '../../styles/'
import { setScaleText, scaleSize } from '../../utils/adapter'
import { TextInputComponent,Btn,Loading } from '../../components/'
import { connect } from 'react-redux'
import { createAccountAction } from '../../actions/createAccountAction'

class CreateAccount extends Component{
  constructor(props){
      super(props)
      this.state = {
        userNameVal: '',
        psdVal: '',
        repeadPsdVal: '',
        promptVal: '',

        userNameWarning: '',
        psdWarning: '',
        rePsdWarning: '',

        visible: false,


        mnemonicValue: '',
        seedVal: '',
        keyStoreAddress: '',
        second: 0
      }
  }


  componentWillReceiveProps(nextProps){
    if(this.props.createAccountReducer.isLoading !== nextProps.createAccountReducer.isLoading && !nextProps.createAccountReducer.isLoading){
      this.setState({
        visible: false
      })
      this.props.navigator.push({
        screen: 'create_account_success',
        navigatorStyle: DetailNavigatorStyle,
        overrideBackPress: true,
      })
    }
  }


  componentWillUnmount(){
    // this.setState({
    //   visible: true
    // })
  }
  onChangeUseNameText = (val) => {
    this.setState({
      userNameVal: val,
      userNameWarning: '',
    })
  }


  onPressBtn = () => {
    const { userNameVal, psdVal, repeadPsdVal, promptVal, } = this.state
    let reg = /^(?=.*[a-z])(?=.)(?=.*\d)[a-z\d]{8,}$/ //(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}
    if(userNameVal.length === 0){
      this.setState({
        userNameWarning: 'please enter the account name'
      })
      return
    }else{
      if(!reg.test(psdVal)){
        this.setState({
          psdWarning: 'password needs to contain both letters and Numbers, and at least 8 digits.'
        })
        return
      }else{
        if(psdVal !== repeadPsdVal){
          this.setState({
            rePsdWarning: 'two passwords are different'
          })
          return
        }else{        
          this.onCreate()
        }
      }        
    }
  }

  onCreate(){
    const { userNameVal, psdVal, promptVal} = this.state
    this.setState({
      visible: true
    })
    setTimeout(() => {
      this.props.dispatch(createAccountAction({
        userNameVal,
        psdVal,
        promptVal,
        fromLogin: this.props.from === 'login_create' ? true : false
      }))
    },1000)
    
    
  }
  onChangPsdText = (val) => {
    this.setState({
      psdVal: val,
      psdWarning: '',
    })
  }
  onChangeRepeatText = (val) => {
    this.setState({
      repeadPsdVal: val,
      rePsdWarning: '',
    })
  }
  onChangePromptText = (val) => {
    this.setState({
      promptVal: val,
    })
  }
  render(){
    const { userNameVal, psdVal, repeadPsdVal, promptVal, userNameWarning, psdWarning, rePsdWarning,visible } = this.state

    const { isLoading } = this.props.createAccountReducer
    return(
      <View style={pubS.container}>
        <View style={[styles.warningView,pubS.paddingRow_24]}>
          <Text style={pubS.font22_1}>
            If you don't store user password, you cannot use retrieving or reset function,
            The password must be backed up by yourself. the password is to protect the private key,
            so it would be better if it is more complicated.
          </Text>
        </View>
        <View style={{paddingTop:10,}}>
          <TextInputComponent
            placeholder={'wallet name'}
            value={userNameVal}
            onChangeText={this.onChangeUseNameText}
            warningText={userNameWarning}//
          />
          <TextInputComponent
            placeholder={'password'}
            value={psdVal}
            onChangeText={this.onChangPsdText}
            secureTextEntry={true}
            warningText={psdWarning}//
          />
          <TextInputComponent
            placeholder={'repeat password'}
            value={repeadPsdVal}
            onChangeText={this.onChangeRepeatText}
            secureTextEntry={true}
            warningText={rePsdWarning}//
          />
          <TextInputComponent
            placeholder={'password hint (Optional)'}
            value={promptVal}
            onChangeText={this.onChangePromptText}
          />
          <Btn
            btnMarginTop={scaleSize(60)}
            btnPress={this.onPressBtn}
            btnText={'Create'}
          />
        </View>
        <Loading loadingVisible={visible} loadingText={'creating account'}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  warningView:{
    height: scaleSize(130),
    backgroundColor:'#FFE186',
    justifyContent:'center',

  },
})
export default connect(
  state => ({
    createAccountReducer: state.createAccountReducer
  })
)(CreateAccount)
