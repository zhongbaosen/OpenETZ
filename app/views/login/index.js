import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'

import { pubS,DetailNavigatorStyle} from '../../styles/'
import { setScaleText, scaleSize } from '../../utils/adapter'
const Web3 = require('web3');
const web3 = new Web3();
// web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
class Login extends Component{
  constructor(props){
    super(props)
    this.state= {

    }
  }

  createAccoumt = () => {
    this.props.navigator.push({
      screen: 'create_account',
      title:'create',
      navigatorStyle: DetailNavigatorStyle,
    })
  }

  importAccoumt = () => {

    this.props.navigator.push({
      screen: 'import_account',
      title:'import',
      navigatorStyle: DetailNavigatorStyle,
    })
  }
  // termsOfService = () => {
  //   console.log('web3===',web3)
    // web3.eth.getCoinbase((err, coinbase) => {
    //   const balance = web3.eth.getBalance(coinbase, (err2, balance) => {
    //     console.log('balance ' + balance);
    //     this.setState({balance});
    //   });
    // });
    // this.props.navigator.push({
    //   screen: 'terms_of_service',
    //   title:'服务条款',
    //   navigatorStyle: DetailNavigatorStyle,
    // })
  // }
  render(){

    return(
      <View style={pubS.container}>
        <Image source={require('../../images/xhdpi/bg_signin.png')} style={[pubS.fullWH,styles.bgStyle]}/>
        <Image source={require('../../images/xhdpi/logo.png')} style={styles.logoStyle}/>
        <View style={styles.btnContainer}>
          <TouchableOpacity activeOpacity={.7} onPress={this.createAccoumt} style={[pubS.center,styles.btnStyle]}>
            <Text style={pubS.font30_1}>create</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.7} onPress={this.importAccoumt} style={[pubS.center,styles.btnStyle,{marginTop: scaleSize(30)}]}>
            <Text style={pubS.font30_1}>import</Text>
          </TouchableOpacity>
          {

            // <Text style={[pubS.font28_1,{marginTop: scaleSize(48)}]} onPress={this.termsOfService}>服务条款</Text>
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bgStyle: {
    // width: scaleSize(750)
    // position: 'absolute',
    // top:0,
    // left:0,
  },
  logoStyle: {
    position:'absolute',
    top: scaleSize(250),
    left: scaleSize(292),
    width: scaleSize(166),
    height: scaleSize(242),
  },
  btnContainer:{
    justifyContent:'center',
    position:'absolute',
    top: scaleSize(700),
    width: scaleSize(750),
    alignItems:'center',
    // borderColor:'red',
    // borderWidth:1,
  },
  btnStyle: {
    height: scaleSize(94),
    width: scaleSize(610),
    borderRadius: 20,
    backgroundColor:'#2C56A1',

  },
})
export default Login
