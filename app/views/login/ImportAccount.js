import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'

import { pubS } from '../../styles/'
import { setScaleText, scaleSize } from '../../utils/adapter'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'
import { TextInputComponent,Btn } from '../../components/'
import { toHome } from '../../root'
const wallet = require('ethereumjs-wallet')
const hdkey = require('ethereumjs-wallet/hdkey')
const util = require('ethereumjs-util')

class Privatekey extends Component{
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
    }
  }

  onChangePrivateText = (val) => {
    this.setState({
      privKeyVal: val
    })
  }
  onChangPsdText = (val) => {
    this.setState({
      psdVal: val
    })
  }
  onChangeRepeatText = (val) => {
    this.setState({
      repeadPsdVal: val
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
          if(psdWarning !== rePsdWarning){
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
    let buf = new Buffer(privKeyVal, 'hex')

    let hdWallet = hdkey.fromMasterSeed(buf)

    let w = hdWallet.getWallet()
    let keystore = w.toV3(psdVal)

    

    localStorage.save({
      key: 'account',
      data:{
        keyStore: keystore,
        userName: userNameVal,
      },
      expires: null,
    })
    // console.log('keystore===', keystore)
    toHome()
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
      </View>
    )
  }
}



class ImportAccount extends Component{
  render(){
    return(
      <View style={pubS.container}>
        <ScrollableTabView
          tabBarActiveTextColor={'#2B8AFF'}
          tabBarInactiveTextColor={'#C7CACF'}
          tabBarTextStyle={{fontSize:setScaleText(26)}}
          animationEnabled={false}
          tabBarPosition={'top'}
          renderTabBar={() => (
            <ScrollableTabBar
              underlineStyle={[ styles.underlineStyle ]}
              activeTextColor={'#2B8AFF'}
              inactiveTextColor={'#C7CACF'}
              tabBarBackgroundColor={'#fff'}
              style={{backgroundColor:'#fff',height: scaleSize(84)}}
            />
          )}
        >
            <Privatekey key={1} tabLabel={'private key'} thisProps={this}/>
        </ScrollableTabView>
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

export default ImportAccount
