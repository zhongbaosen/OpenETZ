import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ToastAndroid,
} from 'react-native'

import { pubS,DetailNavigatorStyle,MainThemeNavColor,ScanNavStyle } from '../../styles/'
import { setScaleText, scaleSize } from '../../utils/adapter'
import { TextInputComponent,Btn } from '../../components/'
// import Toast from 'react-native-root-toast'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import { insert2TradingDBAction } from '../../actions/tradingManageAction'
const Wallet = require('ethereumjs-wallet')
const EthereumTx = require('ethereumjs-tx')

import UserSQLite from '../../utils/accountDB'
const sqLite = new UserSQLite()  
let db 

let self = null
class Payment extends Component{
  constructor(props){
    super(props)
    this.state={
      receiverAddress: '',//0xec80a9fe89b05e337efa9c801c07c8444d9cb32e
      payTotalVal: '',
      noteVal: '',
      payAddressWarning: '',
      payTotalWarning: '',
      payPsdWarning: '',
      payPsdVal: '',
      visible: false,
      modalTitleText:'Payment details',
      modalTitleIcon: require('../../images/xhdpi/nav_ico_paymentdetails_close_def.png'),
      modalSetp1: true,
      senderAddress: '',
      keyStore: {}
    }
    self = this
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }
  
  onNavigatorEvent(event){
     if(event.id === 'backPress'){
        if(this.props.receive_address){
          this.props.navigator.popToRoot({
            animated: true, 
            animationType: 'fade'
          })
        }
     }
  } 

  componentWillMount(){

    const { accountInfo } = this.props.accountManageReducer

    if(this.props.receive_address){
      this.setState({
        receiverAddress: this.props.receive_address
      })
    }

    accountInfo.map((val,index) => {
      if(val.is_selected === 1){
        let ks =  {
          "version": val.version,
          "id": val.kid,
          "address": val.address,
          "crypto": {
            ciphertext: val.ciphertext,
            cipherparams: {
              "iv": val.iv
            },
            "cipher": val.cipher,
            "kdf": val.kdf,
            "kdfparams": {
              "dklen": val.dklen,
              "salt": val.salt,
              "n":val.n,
              "r":val.r,
              "p":val.p
            },
            "mac": val.mac
          }
        }

        this.setState({
          senderAddress: `0x${val.address}`,
          keyStore: ks
        })
      }
    })
  }

  componentWillUnmount(){
    this.onPressClose()
  }
  onChangePayAddrText = (val) => {
    this.setState({
      receiverAddress: val,
      payAddressWarning: ''
    })
  }
  onChangePaTotalText = (val) => {
    this.setState({
      payTotalVal: val,
      payTotalWarning: ''
    })
  }
  onChangeNoteText = (val) => {
    this.setState({
      noteVal: val,
    })
  }

  onNextStep = () => {
    const { receiverAddress, payTotalVal, noteVal, } = this.state
    let addressReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{42}$/
    if(!addressReg.test(receiverAddress)){
      this.setState({
        payAddressWarning: 'please enter the account address',
      })
      return
    }else{
      if(payTotalVal.length === 0){
        this.setState({
          payTotalWarning: 'please enter the payment amount'
        })
        return
      }else{
        this.setState({
          visible: true
        })
      }
    }    
  }

  toScan = () => {
    this.props.navigator.push({
      screen: 'scan_qr_code',
      title:'Scan',
      navigatorStyle: Object.assign({},DetailNavigatorStyle,{
        navBarTextColor:'#fff',
        navBarBackgroundColor:'#000',
        statusBarColor:'#000',
        statusBarTextColorScheme:'light',
      }),
    })
  }
  toMoreCion = () => {
    // let t1 = Toast.show('尽请期待~')
    // setTimeout(function () {
    //     Toast.hide(t1)
    // }, 1000)
  }
  onPressClose = () => {
    this.setState({
      visible: false,
      modalSetp1: true,
      payPsdVal: ''
    })
  }

  onPressCloseIcon = () => {
    if(this.state.modalSetp1){
      this.onPressClose()
    }else{
      this.setState({
        modalSetp1: true,
        modalTitleText:'Payment details',
        modalTitleIcon: require('../../images/xhdpi/nav_ico_paymentdetails_close_def.png'),
      })
    }
  }

  onPressOrderModalBtn = () => {
    this.setState({
      modalTitleText: 'Payment password',
      modalTitleIcon: require('../../images/xhdpi/nav_ico_createaccount_back_def.png'),
      modalSetp1: false
    })
  }
  onPressPayBtn = () => {
    
    const { payPsdVal, payPsdWarning } = this.state
    if(payPsdVal.length === 0){
      this.setState({
        payPsdWarning: 'please enter the password'
      })
      return
    }else{
      this.validatPsd()
    }
  }

  validatPsd = () => {
   
    try{

      this.makeTransact()

    } catch(err){
      this.setState({
        visible: true,
        modalSetp1: false,
        payPsdVal: '',
        payPsdWarning: 'password is error'
      })
    }
  }
  async makeTransact(){
      console.log('this.state.keyStore===',this.state.keyStore)
      const { payPsdVal,senderAddress,payTotalVal,receiverAddress,noteVal } = this.state
      console.log('senderAddress==',senderAddress)
      let newWallet = await Wallet.fromV3(this.state.keyStore,payPsdVal)
      let privKey = await newWallet._privKey.toString('hex')
      console.log('privKey==',privKey)
      let bufPrivKey = new Buffer(privKey, 'hex')
      // console.log('bufPrivKey==',bufPrivKey)
      let nonceNumber = await web3.eth.getTransactionCount(senderAddress)

      console.log('payTotalVal==',payTotalVal)
      let totalValue = web3.utils.toWei(payTotalVal,'ether')
      let hex16 = parseInt(totalValue).toString(16)
      const txParams = {
          nonce: `0x${nonceNumber.toString(16)}`,
          gasPrice: '0x09184e72a000', 
          gasLimit: '0x2710',
          to: receiverAddress,
          value: `0x${hex16}`,
          data: '',
          chainId: 88
      }
      console.log('txParams====',txParams)
      const tx = new EthereumTx(txParams)
      tx.sign(bufPrivKey)
      const serializedTx = tx.serialize()
      console.log('serializedTx==',serializedTx)

      this.onPressClose()
      let hashVal = ''
      web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`)
      .on('transactionHash', function(hash){
         console.log('hash==',hash)
        hashVal = hash
        ToastAndroid.show('payment succeeful~',3000)
        self.props.navigator.popToRoot({
          animated: true,
          animationType: 'fade',
        })

          
         // this.props.navigator.push({
         //  screen: 'trading_record_detail',
         //  title:'Transaction Records',
         //  navigatorStyle: MainThemeNavColor,
         //  passProps: {
         //    // tx_sender: senderAddress,
         //    // tx_receiver:receiverAddress,
         //    tx_note: noteVal,
         //    tx_hash: hash,
         //    tx_value: payTotalVal,
         //  }
         // })

      })
      .on('receipt', function(receipt){
          console.log('receipt==',receipt)
          // if(receipt.status==="0x1"){//"0x1" succ "0x0" fail
           
          // }else{
          //   
          //   this.props.navigator.pop()
          // }
      })
      .on('confirmation', function(confirmationNumber, receipt){ 
        console.log('confirmationNumber==',confirmationNumber)
        if(confirmationNumber === 24){
          setTimeout(() => {
            self.props.dispatch(insert2TradingDBAction({
              tx_hash: hashVal,
              tx_value: payTotalVal,
              tx_sender: senderAddress,
              tx_receiver: receiverAddress,
              tx_note: noteVal,
            }))
          },500)
        }
      })
      .on('error', (error) => {
        console.log('error==',error)
        ToastAndroid.show('payment fail~',3000)
      });

      


      // web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`,function(err,hash){
      //   console.log('err==',err)
      //   console.log('hash==',hash)
      //   if(hash.length > 0){
      //     ToastAndroid.show('payment succeeful~',3000)
      //     this.props.navigator.popToRoot({
      //       animated: true,
      //       animationType: 'fade',
      //     })
      //   }
      // })

      
  }
  onChangePayPsdText = (val) => {
    this.setState({
      payPsdVal: val
    })
  }
  render(){
    const { receiverAddress, payTotalVal, noteVal,visible,modalTitleText,modalTitleIcon,payPsdVal,
            modalSetp1,payAddressWarning,payTotalWarning,senderAddress,payPsdWarning } = this.state
    return(
      <View style={pubS.container}>
        <TextInputComponent
          defaultValue ={'ETZ'}
          editable={false}
          onPressIptRight={this.toMoreCion}
          toMore={true}
        />
        <TextInputComponent
          placeholder={'receiver’s account address'}
          value={receiverAddress}
          onChangeText={this.onChangePayAddrText}
          warningText={payAddressWarning}
          isScan={true}
          onPressIptRight={this.toScan}
        />
        <TextInputComponent
          placeholder={'payment amount'}
          value={payTotalVal}
          onChangeText={this.onChangePaTotalText}
          warningText={payTotalWarning}
          keyboardType={'numeric'}
        />
        <TextInputComponent
          placeholder={'backup'}
          value={noteVal}
          onChangeText={this.onChangeNoteText}
        />
        <Btn
          btnMarginTop={scaleSize(60)}
          btnPress={this.onNextStep}
          btnText={'Next step'}
        />

        <Modal
          isVisible={visible}
          onBackButtonPress={this.onPressClose}
          onBackdropPress={this.onPressClose}
          style={styles.modalView}
          backdropOpacity={.8}
        >
          <View style={styles.modalView}>
            <View style={[styles.modalTitle,pubS.center]}>
              <TouchableOpacity onPress={this.onPressCloseIcon} activeOpacity={.7} style={{position:'absolute',left: scaleSize(24),top: scaleSize(29)}}>
                <Image source={modalTitleIcon} style={{height: scaleSize(30),width: scaleSize(30)}}/>
              </TouchableOpacity>
              <Text style={pubS.font26_4}>{modalTitleText}</Text>
            </View>
            {
              modalSetp1 ?
              <View>
                <RowText
                  rowTitle={'Order information'}
                  rowContent={noteVal}
                />
                <RowText
                  rowTitle={'Transfer wallet address'}
                  rowContent={receiverAddress}
                />
                <RowText
                  rowTitle={'Payment account'}
                  rowContent={senderAddress}
                />
                <RowText
                  rowTitle={'Amount'}
                  rowContent={payTotalVal}
                  rowUnit={'ETZ'}
                />

                <Btn
                btnPress={this.onPressOrderModalBtn}
                btnText={'Confirm'}
                btnMarginTop={scaleSize(50)}
                />
              </View>
              :
              <View>
                <TextInputComponent
                  placeholder={'Enter password'}
                  value={payPsdVal}
                  onChangeText={this.onChangePayPsdText}
                  warningText={payPsdWarning}
                  secureTextEntry={true}
                />
                <Btn
                  btnPress={this.onPressPayBtn}
                  btnText={'Make Payment'}
                  btnMarginTop={scaleSize(50)}
                />
              </View>
            }
          </View>
        </Modal>
      </View>
    )
  }
}
class RowText extends Component{
  static defaultProps = {
    rowUnit: '',
  }
  render(){
    const { rowTitle,rowContent, rowUnit} = this.props
    return(
      <View style={[styles.rowTextView,pubS.rowCenterJus]}>
        <Text style={[pubS.font26_5,{width:'20%'}]}>{rowTitle}</Text>
        <View style={[pubS.rowCenterJus,{width: '80%',}]}>
          <Text style={[pubS.font26_4,{marginLeft: scaleSize(40)}]}>{rowContent}</Text>
          {
            rowUnit.length > 0 ?
            <Text style={pubS.font26_4}>{rowUnit}</Text>
            : null
          }
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    rowTextView:{
        width: scaleSize(680),
        height: scaleSize(88),
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#DBDFE6',
        alignSelf:'center'
    },
    modalTitle:{
      height: scaleSize(88),
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor:'#F2F2F2',
      borderWidth:1,
    },
    modalView:{
      width: scaleSize(750),
      marginBottom:0,
      height: scaleSize(710),
	    position: 'absolute',
	    bottom: 0,
	    alignSelf: 'center',
	    backgroundColor:'#fff',
    },
})

export default connect(
  state => ({
    accountManageReducer: state.accountManageReducer
  })
)(Payment)
