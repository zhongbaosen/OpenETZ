import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'

import { pubS,DetailNavigatorStyle,MainThemeNavColor,ScanNavStyle } from '../../styles/'
import { setScaleText, scaleSize } from '../../utils/adapter'
import { TextInputComponent,Btn } from '../../components/'
// import Toast from 'react-native-root-toast'
import Modal from 'react-native-modal'
const Wallet = require('ethereumjs-wallet')
const EthereumTx = require('ethereumjs-tx')
class Payment extends Component{
  constructor(props){
    super(props)
    this.state={
      receiverAddress: '0xef4b8381f12ad29230d68ce65576acd633d6959b',
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
    }

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


    if(this.props.receive_address){
      this.setState({
        receiverAddress: this.props.receive_address
      })
    }
     // this.getBranch()
   // web3.eth.getTransactionCount('0xeF4b8381f12AD29230d68Ce65576Acd633D6959B').then((res,rej)=> {
   //  console.log('res=====',res)
   //  console.log('reh111=====',rej)
    
   // })

    localStorage.load({
     key: 'account'
    }).then(ret => {
      this.setState({
        senderAddress: `0x${ret.keyStore.address}`
      })
    }).catch(err => {

    })
  }
  async getBranch(){
    // let a = await web3.eth.getBalance('0xec80a9fe89b05e337efa9c801c07c8444d9cb32e')
    // console.log('aaaaaaaaaaaaaa',a)
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
    // this.setState({
    //       visible: true
    // })
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
      navigatorStyle: ScanNavStyle,
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
      this.getLocal()
      
    }
  }
  getLocal = () => {
    localStorage.load({
      key: 'account'
    }).then(ret => {
      this.validatPsd(ret)
    }).catch(err => {
      
    })
  }
  validatPsd = (ret) => {
   
    try{

      this.makeTransact(ret)

    } catch(err){
      this.setState({
        visible: true,
        modalSetp1: false,
        payPsdVal: '',
        payPsdWarning: 'password is error'
      })
    }
  }
  async makeTransact(ret){
      const { payPsdVal,senderAddress,payTotalVal,receiverAddress,noteVal } = this.state
      console.log('senderAddress==',senderAddress)
      let newWallet = await Wallet.fromV3(ret.keyStore,payPsdVal)
      let privKey = await newWallet._privKey.toString('hex')
      console.log('privKey==',privKey)
      let bufPrivKey = new Buffer(privKey, 'hex')
      // console.log('bufPrivKey==',bufPrivKey)
      let nonceNumber = await web3.eth.getTransactionCount(senderAddress)
      // console.log('nonceNumber===',nonceNumber)
      console.log('payTotalVal==',payTotalVal)
      let totalValue = web3.utils.toWei(payTotalVal,'ether')
      let hex16 = parseInt(totalValue).toString(16)
      const txParams = {
          nonce: `0x${nonceNumber}`,
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
      // web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`)
      // .on('transactionHash', function(hash){
      //    console.log('hash==',hash)

      //    this.props.navigator.push({
      //     screen: 'trading_record_detail',
      //     title:'Transaction Records',
      //     navigatorStyle: MainThemeNavColor,
      //     passProps: {
      //       // tx_sender: senderAddress,
      //       // tx_receiver:receiverAddress,
      //       tx_note: noteVal,
      //       tx_hash: hash,
      //       tx_value: payTotalVal,
      //     }
      //    })

      // })
      // .on('receipt', function(receipt){
      //     console.log('receipt==',receipt)
      //     if(receipt.status==="0x1"){//"0x1" succ "0x0" fail

      //     }
      // })
      // .on('confirmation', function(confirmationNumber, receipt){ 
      //   console.log('confirmationNumber==',confirmationNumber)
      // })
      // .on('error', (error) => {
      //   console.log('error==',error)
      // });
      this.onPressClose()
      web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`,function(err,hash){
        console.log('err==',err)
        console.log('hash==',hash)
        if(hash.length > 0){
          alert('payment succeeful~')
        }
      })

      
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

export default Payment
