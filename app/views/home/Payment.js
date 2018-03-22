import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'

import { pubS,DetailNavigatorStyle } from '../../styles/'
import { setScaleText, scaleSize } from '../../utils/adapter'
import { TextInputComponent,Btn } from '../../components/'
// import Toast from 'react-native-root-toast'
import Modal from 'react-native-modal'
class Payment extends Component{
  constructor(props){
    super(props)
    this.state={
      payAddressVal: '',
      payTotalVal: '',
      noteVal: '',
      payPsdVal: '',
      visible: false,
      modalTitleText:'支付详情',
      modalTitleIcon: require('../../images/xhdpi/nav_ico_paymentdetails_close_def.png'),
      modalSetp1: true
    }
  }

  componentWillUnmount(){
    this.setState({
      modalSetp1: true,
      visible: false
    })
  }
  onChangePayAddrText = (val) => {
    this.setState({
      payAddressVal: val,
    })
  }
  onChangePaTotalText = (val) => {
    this.setState({
      payTotalVal: val,
    })
  }
  onChangeNoteText = (val) => {
    this.setState({
      noteVal: val,
    })
  }

  onNextStep = () => {
    this.setState({
      visible: true
    })
  }

  toScan = () => {
    this.props.navigator.push({
      screen: 'scan_qr_code',
      title:'Scan',
      navigatorStyle: Object.assign({},DetailNavigatorStyle,{
        navBarTextColor:'#fff',
        navBarBackgroundColor:'#000',
        statusBarColor:'#000',
        statusBarTextColorScheme:'light'
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
      modalSetp1: true
    })
  }

  onPressCloseIcon = () => {
    if(this.state.modalSetp1){
      this.setState({
        visible: false,
        modalSetp1: true
      })
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
    alert('pay')
  }
  onChangePayPsdText = (val) => {
    this.setState({
      payPsdVal: val
    })
  }
  render(){
    const { payAddressVal, payTotalVal, noteVal,visible,modalTitleText,modalTitleIcon,payPsdVal,modalSetp1 } = this.state
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
          value={payAddressVal}
          onChangeText={this.onChangePayAddrText}
          //warningText={'please enter the account address'}
          isScan={true}
          onPressIptRight={this.toScan}
        />
        <TextInputComponent
          placeholder={'payment amount'}
          value={payTotalVal}
          onChangeText={this.onChangePaTotalText}
          //warningText={'please enter the payment amount'}
        />
        <TextInputComponent
          placeholder={'backup'}
          value={noteVal}
          onChangeText={this.onChangeNoteText}
        />
        <Btn
          btnMarginTop={scaleSize(230)}
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
                rowContent={'Payment'}
                />
                <RowText
                rowTitle={'transfer wallet address'}
                rowContent={'12345'}
                />
                <RowText
                rowTitle={'Payment account'}
                rowContent={'12345'}
                />
                <RowText
                rowTitle={'Amount'}
                rowContent={'100'}
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
                  //warningText={'please enter the payment amount'}
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
