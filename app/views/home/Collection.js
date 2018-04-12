import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Clipboard,
  ToastAndroid
} from 'react-native'

import { pubS,DetailNavigatorStyle } from '../../styles/'
import { setScaleText, scaleSize } from '../../utils/adapter'
import { TextInputComponent,Btn } from '../../components/'
import Modal from 'react-native-modal'
import QRCode from 'react-native-qrcode'
import { connect } from 'react-redux'

import UserSQLite from '../../utils/accountDB'
import TradingSQLite from '../../utils/tradingDB'
const sqLite = new UserSQLite();  
let db;  


const wallet = require('ethereumjs-wallet')
class Collection extends Component{
  constructor(props){
    super(props)
    this.state={
        visible: false,
        payTotalVal: '',
        addressText: '',
        currentAccount: { }
    }

  }

  componentWillMount(){

    if(!db){  
        db = sqLite.open();  
    }

    db.transaction((tx) => {
        tx.executeSql("select * from account ", [], (tx,results) => {

          let len = results.rows.length 
          
          for(let i=0; i<len; i++){  
            let result = results.rows.item(i)
            if(result.is_selected === 1){
              this.setState({
                currentAccount: result,
                addressText: `0x${result.address}`
              })
            }
            
            if(result.backup_status === 0){
              this.setState({
                visible: true
              })
            }
          } 
        },(error) => {
          console.error(error)
        })
      })

  }

  componentWillUnmount(){
    // this.getContent()
    this.setState({
      visible: false
    }) 
  }
  // async getContent(){
  //   let a= await Clipboard.getString()
  // }

  // onChangePayTotal = (val) => {
  //   this.setState({
  //     payTotalVal: val,
  //   })
  // }

  onPressCopyBtn = () => {
      Clipboard.setString(this.state.addressText)
      ToastAndroid.show('copy successful~',3000)
  }

  onHide = () => {
    this.setState({
      visible: false
    })
  }
  backupBtn = () => {
    const { currentAccount } = this.state
    console.log('currentAccount===',currentAccount)
    this.setState({
      visible: false
    })
    this.props.navigator.push({
      screen: 'back_up_account',
      title: 'username',
      navigatorStyle: DetailNavigatorStyle,
      passProps: {
        userName: currentAccount.account_name,
        address: currentAccount.address,
        b_id: currentAccount.id,
      },
      navigatorButtons: {
        rightButtons: [
          {
            title: 'Save',
            id: 'save_back_up_info'
          }
        ]
      }
    })
  }

  render(){
    const { payTotalVal,visible,addressText } = this.state
    return(
      <View style={[pubS.container,{paddingTop: scaleSize(35)}]}>
        {
        // <TextInputComponent
        //   placeholder={'Enter receive amount (Optional)'}
        //   value={payTotalVal}
        //   onChangeText={this.onChangePayTotal}
        // >
        // </TextInputComponent>
        }

        <View style={{marginTop: scaleSize(125),alignSelf:'center'}}>
          <QRCode
            value={addressText}
            size={scaleSize(400)}
            bgColor='#000'
            fgColor='#fff'
          />
        </View>
        <Text style={[pubS.font24_2,{marginTop: scaleSize(19),alignSelf:'center'}]}>{addressText}</Text>
        <Btn
          btnPress={this.onPressCopyBtn}
          btnText={'Copy receiving wallet address'}
          btnMarginTop={scaleSize(100)}
        />


      <Modal
        isVisible={visible}
        onBackButtonPress={this.onHide}
        onBackdropPress={this.onHide}
        style={styles.modalView}
        backdropOpacity={.8}
      >
        <Image source={require('../../images/xhdpi/img_collectionnobackup.png')} style={styles.modalImageStyle}/>
        <View style={[{alignItems:'center'}]}>
            <View style={styles.blueView}>
                <Text style={[pubS.font36_3,{marginTop: scaleSize(32)}]}>Please backup your account first</Text>
                <Text style={[pubS.font22_2,{marginTop: scaleSize(13),width: '90%',textAlign:'center'}]}>
                    Blockchain account is different from traditional website account, it is the account of the decentralized system based on cryptography.
                    You must keep your account's private key and password in a safe place.
                    Any accident may result in assets loss. We suggest to do double backup first and then import small amount for test, finally began to use happily.
                </Text>
            </View>
            <View style={styles.whileView}>
                <Text style={[pubS.font30_2,{marginTop: scaleSize(25)}]}>{`--  Backup mnemonic words --`}</Text>
                <Text style={[pubS.font24_2,{textAlign:'center'}]}>When lost account or password, mnemonic words can help to restore account</Text>
                <Text style={[pubS.font30_2,{marginTop: scaleSize(25)}]}>{`--  Backup Keystore file  --`}</Text>
                <Text style={[pubS.font24_2,{textAlign:'center'}]}>Official account format, private key file which protected by password.</Text>
                <TouchableOpacity activeOpacity={.7} onPress={this.backupBtn} style={[styles.backupBtnStyle,pubS.center]}>
                  <Text style={pubS.font28_2}>backup now</Text>
                </TouchableOpacity>
            </View>
      </View>
      </Modal>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  modalImageStyle:{
    height: scaleSize(121),
    width: scaleSize(107),
    zIndex:999,
    position:'absolute',
    top:0,
    left: scaleSize(226.5),
  },
  backupBtnStyle:{
    height: scaleSize(70),
    width: scaleSize(500),
    borderWidth: 1,
    borderColor: '#2B8AFF',
    borderRadius: scaleSize(35),
    marginTop: scaleSize(30),
  },
  whileView:{
      height: scaleSize(390),
      backgroundColor:'#fff',
      width:'100%',
      alignItems:'center',
      borderBottomLeftRadius :scaleSize(10),
      borderBottomRightRadius :scaleSize(10),
  },
  blueView: {
    height: scaleSize(325),
    backgroundColor:'#2B8AFF',
    width:'100%',
    alignItems:'center',
    borderTopLeftRadius: scaleSize(10),
    borderTopRightRadius: scaleSize(10),
    marginTop: scaleSize(84)
  },
  modalView:{
    width: scaleSize(560),
    height: scaleSize(805),
    position: 'absolute',
    top: scaleSize(59),
    alignSelf: 'center',
    backgroundColor:'transparent',
    // borderColor:'#fff',
    // borderWidth:1,

  }
})
export default connect(
  state => ({
    accountManageReducer: state.accountManageReducer
  })
)(Collection)
