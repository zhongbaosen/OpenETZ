import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native'

import { pubS,DetailNavigatorStyle } from '../../styles/'
import { setScaleText, scaleSize } from '../../utils/adapter'
import { TextInputComponent,Btn } from '../../components/'
class CreateAccount extends Component{
  constructor(props){
      super(props)
      this.state = {
        userNmaeVal: '',
        psdVal: '',
        repeadPsdVal: '',
        promptVal: '',

        userNameWarning: '',
        psdWarning: '',
        rePsdWarning: '',
      }
  }

  onChangeUseNameText = (val) => {
    this.setState({
      userNmaeVal: val,
      userNameWarning: '',
    })
  }
  onPressBtn = () => {
    // const { userNmaeVal, psdVal, repeadPsdVal, promptVal, } = this.state
    // if(userNmaeVal.length === 0){
    //   this.setState({
    //     userNameWarning: 'please enter the account name'
    //   })
    //   return
    // }else{
    //   if(psdVal.test(/^$/)){
        
    //   }
    // }

    this.props.navigator.push({
      screen: 'create_account_success',
      title: '',
      navigatorStyle: DetailNavigatorStyle,
    })
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
    const { userNmaeVal, psdVal, repeadPsdVal, promptVal, userNameWarning, psdWarning, rePsdWarning, } = this.state
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
            value={userNmaeVal}
            onChangeText={this.onChangeUseNameText}
            warningText={userNameWarning}//
          />
          <TextInputComponent
            placeholder={'password'}
            value={psdVal}
            onChangeText={this.onChangPsdText}
            secureTextEntry={true}
            warningText={psdWarning}//password needs to contain both letters and Numbers, and at least 8 digits.
          />
          <TextInputComponent
            placeholder={'repeat password'}
            value={repeadPsdVal}
            onChangeText={this.onChangeRepeatText}
            secureTextEntry={true}
            warningText={rePsdWarning}//two passwords are different
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
export default CreateAccount
