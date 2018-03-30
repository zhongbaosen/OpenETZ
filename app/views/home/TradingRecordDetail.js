
//交易记录详情
import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  WebView, 
  ToastAndroid, 
  Clipboard
} from 'react-native'

import { pubS,DetailNavigatorStyle } from '../../styles/'
import { setScaleText, scaleSize } from '../../utils/adapter'
import QRCode from 'react-native-qrcode'
const moment = require('moment')
class TextInstructions extends Component{
  static defaultProps = {
    inColor: '#657CAB',
    onPressText: undefined,
  }
  render(){
    const { title, instructions,inColor,onPressText } = this.props
    return(
      <TouchableOpacity onPress={onPressText} activeOpacity={onPressText ? .7 : 1} style={{height: scaleSize(70),justifyContent:'space-between',marginLeft: scaleSize(35),marginTop: scaleSize(20)}}>
        <Text style={pubS.font24_4}>{title}</Text>
        <Text style={{color:inColor,fontSize: setScaleText(24)}} numberOfLines={2}>{instructions}</Text>
      </TouchableOpacity>
    )
  }
}


class TradingRecordDetail extends Component{
  constructor(props){
    super(props)
    this.state = {
      blockNum: 0,
      fromAddress: '',
      toAddress: '',
      txTime: '',
    }
  }

  componentWillMount(){
    
    this.getReceiptTx()
  }
  shouldComponentUpdate(nextProps,nextState){
    if(this.state.blockNum === nextState.blockNum && this.state.txTime === nextState.txTime){
      return false
    }else{
      return true
    }
  }
  async getReceiptTx(){
    let res = await web3.eth.getTransactionReceipt(this.props.tx_hash)
    this.setState({
      blockNum: res.blockNumber,
      fromAddress: res.from,
      toAddress: res.to,
    })
  }

  async getTxTime(bNum){
    let newDate = new Date()
    let result = await web3.eth.getBlock(bNum)
    let t = result.timestamp * 1000
    this.setState({
      // txTime:  moment(result.timestamp).format('YYYY MM DD') 
      txTime: newDate.toLocaleString(t)
    })
  }

  toWebView = (hash) => {
    this.props.navigator.push({
      screen: 'tx_web_view',
      navigatorStyle:{
        navBarHidden: true,
        statusBarColor: '#fff',
        screenBackgroundColor: 'white',
        tabBarHidden: true
      },
      passProps: {
        hash,
      }
    })
  }
  onCopyBtn = () => {
    Clipboard.setString(this.props.tx_receiver)
    ToastAndroid.show('copy succeeful',3000)
  }

  
  render(){
    const { tx_sender, tx_receiver, tx_note, tx_hash, tx_value, } = this.props
    const { blockNum,fromAddress, toAddress,txTime } = this.state
    if(blockNum > 0) {
      this.getTxTime(blockNum)
    }
    return(
      <View style={pubS.container}>
        <Image source={require('../../images/xhdpi/ico_selectasset_transactionrecords_succeed.png')} style={styles.iocnStyle}/>
        <View style={styles.topView}></View>
        <View style={styles.mainStyle}>
          <View style={[styles.accountStyle,pubS.rowCenter2]}>
            <Text style={pubS.font60_1}>{tx_value}</Text>
            <Text style={[pubS.font22_3,{marginLeft: scaleSize(18),marginTop: scaleSize(28)}]}>etz</Text>
          </View>
          <TextInstructions
            title={'payer'}
            instructions={fromAddress}
          />
          <TextInstructions
            title={'payee'}
            instructions={toAddress}
          />
          <TextInstructions
            title={'note'}
            instructions={tx_note}
          />

          <View style={[{width: scaleSize(680),alignSelf:'center',marginTop: scaleSize(30),marginBottom: scaleSize(10)},pubS.bottomStyle]}></View>
          <View style={[pubS.rowCenterJus,{paddingRight: scaleSize(35)}]}>
            <View>
              <TextInstructions
                title={'transaction number'}
                instructions={`${tx_hash.slice(0,8)}...${tx_hash.slice(tx_hash.length-8,tx_hash.length)}`}
                inColor={'#2B8AFF'}
                onPressText={() => this.toWebView(tx_hash)}
                />
              <TextInstructions
                title={'block'}
                instructions={blockNum}
                />
              <TextInstructions
                title={'transaction time'}
                instructions={txTime}
                />
            </View>
            <View style={{marginTop: scaleSize(40)}}>
              <QRCode
                value={tx_receiver}
                size={scaleSize(170)}
                bgColor='#000'
                fgColor='#fff'
              />
              <TouchableOpacity onPress={this.onCopyBtn} activeOpacity={.7} style={[styles.btnStyle,pubS.center]}>
                <Text style={pubS.font22_2}>copy URL</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    btnStyle:{
        height: scaleSize(50),
        width: scaleSize(170),
        backgroundColor: '#E3E8F1',
        borderRadius:scaleSize(6),
        marginTop: scaleSize(10)
    },
    iocnStyle:{
      width: scaleSize(100),
      height: scaleSize(100),
      position:'absolute',
      left: scaleSize(325),
      top: scaleSize(50),
      zIndex: 999,
    },
    accountStyle:{
      height: scaleSize(178),
      borderColor:'#DBDFE6',
      borderBottomWidth: StyleSheet.hairlineWidth,
      width: scaleSize(680),
      alignSelf:'center',
      marginBottom: scaleSize(10),
      // borderWidth:1,
    },
    mainStyle:{
        backgroundColor:'#fff',
        width: scaleSize(750)
    },
    topView:{
      height: scaleSize(100),
      backgroundColor: '#144396',
    },
})

export default TradingRecordDetail
