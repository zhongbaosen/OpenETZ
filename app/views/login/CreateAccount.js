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
import { TextInputComponent,Btn,Loading } from '../../components/'

// var bip39 = require('bip39')
// var hdkey = require('ethereumjs-wallet/hdkey')
// var util = require('ethereumjs-util')
// var randomBytes = require('randombytes')

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

        visible: false,
      }
  }

  componentWillMount(){
    
  }

  componentWillReceiveProps(nextProps){
    // if(){
    //   this.props.navigator.push({
    //     screen: 'create_account_success',
    //     navigatorStyle: DetailNavigatorStyle,
    //   })
    // }
  }

  onChangeUseNameText = (val) => {
    this.setState({
      userNmaeVal: val,
      userNameWarning: '',
    })
  }
  onPressBtn = () => {
    const { userNmaeVal, psdVal, repeadPsdVal, promptVal, } = this.state
    let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

    if(userNmaeVal.length === 0){
      this.setState({
        userNameWarning: 'please enter the account name'
      })
      return
    }else{
      if(reg.test(psdVal)){
        this.setState({
          psdWarning: 'password needs to contain both letters and Numbers, and at least 8 digits.'
        })
        return
      }else{
        if(psdVal !== repeadPsdVal){
          this.setState({
            repeadPsdVal: 'two passwords are different'
          })
          return
        }else{        
          this.onCreate()
        }
      }        
    }
  }

  onCreate(){
    // this.setState({
    //   visible: true
    // })

    // var mnemonic = bip39.generateMnemonic();
    // console.log('mnemonic==',mnemonic)
    
    // var seed = bip39.mnemonicToSeed(mnemonic)
    // console.log('seed==',seed)
    // var hdWallet = hdkey.fromMasterSeed(seed)
    // console.log('hdWallet==',hdWallet)

    // var w = hdWallet.getWallet()
    // var k = w.toV3("123456789")

    // console.log('k==',k)

    // var key1 = hdWallet.derivePath("m/44'/60'/0'/0/0")

    // console.log("明文私钥:", key1._hdkey._privateKey.toString('hex'))

    // var address1 = util.pubToAddress(key1._hdkey._publicKey, true)

    // address1 = util.toChecksumAddress(address1.toString('hex'))

    // console.log('地址',address1);
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
    const { userNmaeVal, psdVal, repeadPsdVal, promptVal, userNameWarning, psdWarning, rePsdWarning,visible } = this.state
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
        <Loading loading_visible={visible}/>
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
