import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
  BackHandler,
  Clipboard,
  ToastAndroid,
  Share,
} from 'react-native'
import { Navigation } from 'react-native-navigation'
import { pubS,DetailNavigatorStyle } from '../../../styles/'
import { setScaleText, scaleSize } from '../../../utils/adapter'
import { sliceAddress } from '../../../utils/splitNumber'
import { Btn } from '../../../components/'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import UserSQLite from '../../../utils/accountDB'
import { deleteAccountAction,resetDeleteStatusAction,updateBackupStatusAction } from '../../../actions/accountManageAction'
const Wallet = require('ethereumjs-wallet')

const sqLite = new UserSQLite();  
let db;  

class BackUpAccount extends Component{
  constructor(props){
    super(props)
    this.state = {
      iptPsdVisible: false,
      pKeyVisible: false,
      psdVal: '',
      privKey: '',
      privBackuped: false,
      backupMnemonic: false,
      mncBackuped: false,
      keyStore: {}
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }
  componentWillMount(){
    this.props.dispatch(resetDeleteStatusAction())
    if(!db){  
        db = sqLite.open();  
    }  
    let keyStore = {}
    db.transaction((tx)=>{  
      tx.executeSql("select * from account where address= ? ", [this.props.address],(tx,results)=>{  
        let res = results.rows.item(0)
        if(res.backup_status === 1){
          this.setState({
            privBackuped: true
          })
        }

        if(res.mnemonic.length === 0){
          this.setState({
            mncBackuped: true
          })
        }

        keyStore = {
          "version":res.version,
          "id":res.id,
          "address":res.address,
          "crypto":{
            "ciphertext":res.ciphertext,
            "cipherparams":{
                "iv":res.iv
            },
            "cipher":res.cipher,
            "kdf":res.kdf,
            "kdfparams":{
              "dklen":res.dklen,
              "salt":res.salt,
              "n":res.n,
              "r":res.r,
              "p":res.p
            },
            "mac":res.mac
          }
        }

        this.setState({
          keyStore,
        })
      });  
    },(error)=>{
      console.error(error)
    }); 
  }


  compennetDidUnmount(){  
    sqLite.close();  
  } 
  onNavigatorEvent(event){
    if (event.type == 'NavBarButtonPress') {
      switch(event.id){
        case 'save_back_up_info':
          alert('save')
          break
        // case 'backPress':
        //   this.props.navigator.resetTo({
        //     screen: 'account_manage',
        //     title:'Manage wallets',
        //     overrideBackPress: true,
        //     navigatorStyle: DetailNavigatorStyle,
        //   })
        //   break
        default:
          break
      }
    }
  }

  deleteAccount = () => {
    this.props.dispatch(deleteAccountAction(this.props.b_id))
    setTimeout(() => {
      ToastAndroid.show('delete successful~',3000)
      this.props.navigator.pop()
    },100)
  }
  backUpPrivBtn = () => {
      this.setState({
        iptPsdVisible: true
      })
  }
  onHide = () => {
    this.setState({
      iptPsdVisible: false,
      psdVal: '',
      backupMnemonic: false
    })
  }
  onChangePsdText = (val) => {
    this.setState({
      psdVal: val
    })
  }
  onPKeyHide = () => {
    this.setState({
      pKeyVisible: false,
      privKey: '',
    })

    this.props.dispatch(updateBackupStatusAction(this.props.address))
  }

  onConfirm = () => {
    //当前账号的keystore  生成 private key
    const { psdVal,backupMnemonic,keyStore } = this.state
      
    try {
      const newWallet = Wallet.fromV3(keyStore,psdVal)
      let priv = newWallet._privKey.toString('hex')
      if(backupMnemonic){
        this.props.navigator.push({
          screen: 'write_mnemonic',
          title: '',
          navigatorStyle: DetailNavigatorStyle,
          passProps: {
            currentAddress: this.props.address
          }
        })
      }else{
        this.setState({
          privKey: priv,
          pKeyVisible: true
        })
      }
      this.onHide()
    } catch (err) {
      alert('password is wrong')
      this.setState({
        psdVal: ''
      })
    }
  }




  onCopyBtn = () => {
    Clipboard.setString(this.state.privKey)
    ToastAndroid.show('copy successful~',3000)
  }
  backupMnemonicBtn = () => {
    this.setState({
      iptPsdVisible: true,
      backupMnemonic: true
    })

  }
  backUpKeyStoreBtn = () => {
    const { keyStore } = this.state
    let k = JSON.stringify(keyStore)
    Share.share({
      message: k,
      title: 'Backup Keystore'
    }, {
      dialogTitle: 'Share your keystore',
      // excludedActivityTypes: [
      //   'com.apple.UIKit.activity.PostToTwitter'
      // ],
      // tintColor: 'green'
    })
    .then(this._showResult)
    .catch((error) => ToastAndroid.show('system error'))
  }
  _showResult = (result) => {
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // this.setState({result: 'shared with an activityType: ' + result.activityType});
      } else {
        // ToastAndroid.show('shared successful',3000)
        // this.setState({result: 'shared'});
      }
    } else if (result.action === Share.dismissedAction) {
      ToastAndroid.show('shared dismissed',3000)
    }
  }

  render(){
    const { iptPsdVisible,psdVal,pKeyVisible,privKey,privBackuped,mncBackuped } = this.state
    return(
      <View style={[pubS.container,{backgroundColor:'#fff',alignItems:'center'}]}>
        <Image source={require('../../../images/xhdpi/Penguin.png')} style={styles.avateStyle}/>
        <Text style={pubS.font26_5}>{sliceAddress(this.props.address,10)}</Text>
        <View style={[styles.userNameViewStyle,pubS.rowCenterJus,pubS.bottomStyle]}>
          <Text style={pubS.font26_4}>wallet name</Text>
          <Text style={pubS.font26_4}>{this.props.userName}</Text>
        </View>
        <Btn
          btnPress={ mncBackuped ? () => {return} : () => this.backupMnemonicBtn() }
          bgColor={mncBackuped ? '#BDC0C6' : '#2B8AFF'}
          opacity={mncBackuped ? 1 : .7}
          btnText={'backup mnemonic'}
          btnMarginTop={scaleSize(150)}
        />
        <Btn
          btnPress={() => this.backUpKeyStoreBtn() }
          bgColor={'#2B8AFF'}
          opacity={.7}
          btnText={'backup keystore'}
          btnMarginTop={scaleSize(20)}
        />
        <Btn
          btnPress={privBackuped ? () => {return} : () => this.backUpPrivBtn() }
          bgColor={privBackuped ? '#BDC0C6' : '#2B8AFF'}
          opacity={privBackuped ? 1 : .7}
          btnText={'backup private key'}
          btnMarginTop={scaleSize(20)}
        />
        <Btn
          btnPress={this.deleteAccount}
          btnText={'delete user'}
          btnMarginTop={scaleSize(20)}
          bgColor={'#BDC0C6'}
        />

        <Modal
          isVisible={iptPsdVisible}
          onBackButtonPress={this.onHide}
          onBackdropPress={this.onHide}
          backdropOpacity={.8}
        >
          <View style={styles.modalView}>
            <Text style={[pubS.font34_2,{marginTop: scaleSize(50)}]}>please enter receive password </Text>
            <TextInput
              placeholder={'Password'}
              value={psdVal}
              onChangeText={ this.onChangePsdText}
              underlineColorAndroid={'transparent'}
              textAlignVertical={'center'}
              secureTextEntry={true}
              style={styles.textIptStyle}
            />
            <View style={[pubS.rowCenter,pubS.topBorderStyle,{height: scaleSize(88),marginTop: scaleSize(25),width: '100%'}]}>
              <TouchableOpacity activeOpacity={.7} onPress={this.onHide} style={[pubS.center,styles.modalBtnStyle]}>
                <Text style={pubS.font34_3}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={.7} onPress={this.onConfirm} style={[pubS.center,{width:'50%',borderBottomRightRadius:scaleSize(26)}]}>
                <Text style={pubS.font34_3}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          isVisible={pKeyVisible}
          onBackButtonPress={this.onPKeyHide}
          onBackdropPress={this.onPKeyHide}
          backdropOpacity={.8}
        >
          <View style={styles.pkViewStyle}>
            <View style={[{height: scaleSize(90),backgroundColor:'#2B8AFF',width: '100%'},pubS.center]}>
              <Text style={[pubS.font36_4,{fontWeight: 'bold'}]}>backup private key</Text>
              <TouchableOpacity activeOpacity={.7} onPress={this.onPKeyHide} style={styles.iconStyle}>
                <Image source={require('../../../images/xhdpi/btn_ico_collectionnobackup_close_def.png')} style={{height: scaleSize(30),width: scaleSize(30)}}/>
              </TouchableOpacity>
            </View>
            <View style={{backgroundColor:'#FFE186',paddingLeft: scaleSize(28),paddingRight: scaleSize(28),paddingTop: scaleSize(13),paddingBottom: scaleSize(13)}}>
              <Text style={pubS.font22_1}>Security warning: the private key is not encrypted, export private key would be risky, so it is recommended to use mnemonic words and Keystore to backup.</Text>
            </View>
            <View style={[styles.pkStyle,pubS.center]}>
              <Text style={pubS.font24_3}>{privKey}</Text>
            </View>
            <TouchableOpacity onPress={this.onCopyBtn} activeOpacity={.7} style={[styles.copyBtnStyle,pubS.center]}>
              <Text style={pubS.font28_4}>copy</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  copyBtnStyle:{
    width: scaleSize(500),
    height: scaleSize(70),
    backgroundColor: '#2B8AFF',
    borderRadius: scaleSize(35),
    marginTop: scaleSize(24),

  },
  pkStyle:{
    height: scaleSize(100),
    width: scaleSize(500),
    backgroundColor: '#E3E8F1',
    paddingLeft: scaleSize(19),
    paddingRight: scaleSize(19),
    marginTop: scaleSize(33),
    borderRadius: scaleSize(6),
  },
  iconStyle:{
    position: 'absolute',
    top: scaleSize(30),
    right: scaleSize(30),
  },
  pkViewStyle: {
    width: scaleSize(560),
    height: scaleSize(480),
    alignSelf: 'center',
    alignItems:'center',
    borderRadius: scaleSize(10),
    backgroundColor:'#fff',
    alignItems:'center'
  },
  modalBtnStyle:{
    borderBottomLeftRadius : scaleSize(26),
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: '#dce4e6',
    width: '50%',
  },
  textIptStyle: {
    borderColor:'#808080',
    borderWidth:1,
    padding: 0,
    paddingLeft: 4,
    // flex: 1,
    fontSize: setScaleText(26),
    color:'#657CAB',
    width: scaleSize(476),
    height: scaleSize(50),
    marginTop: scaleSize(40),
  },
  modalView:{
    width: scaleSize(540),
    height: scaleSize(297),
    // position: 'absolute',
    // top: scaleSize(59),
    alignSelf: 'center',
    alignItems:'center',
    backgroundColor:'#fff',
    borderRadius: scaleSize(26),
  },
  userNameViewStyle:{
    height:scaleSize(100),
    width: scaleSize(680),
    marginTop: scaleSize(80),
  },
  avateStyle:{
    width: scaleSize(112),
    height: scaleSize(112),
    marginTop: scaleSize(84),
    alignSelf:'center',

  }
})
export default connect(
  state => ({
    accountManageReducer: state.accountManageReducer
  })
)(BackUpAccount)
