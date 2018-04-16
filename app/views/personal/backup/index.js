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
import { Btn,Loading, } from '../../../components/'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import UserSQLite from '../../../utils/accountDB'

import { deleteAccountAction,resetDeleteStatusAction,updateBackupStatusAction,passAccountsInfoAction } from '../../../actions/accountManageAction'
const Wallet = require('ethereumjs-wallet')
const sqLite = new UserSQLite()
let db
import { toLogin } from '../../../root'
import I18n from 'react-native-i18n'
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
      isDelAccount: false,
      dVisible: false,
      keyStore: {},
      loadingText: '',
      visible: false,
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }
  componentWillMount(){
    this.props.dispatch(resetDeleteStatusAction())
    if(!db){  
        db = sqLite.open();  
    }  
    db.transaction((tx)=>{  
      tx.executeSql("select * from account where address= ? ", [this.props.address],(tx,results)=>{  
        let res = results.rows.item(0)
        let keyStore = {
          "version":res.version,
          "id":res.kid,
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
          keyStore
        })
        if(res.backup_status === 1){
          this.setState({
            privBackuped: true
          })
        }
        if(!res.mnemonic){
          this.setState({
            mncBackuped: true
          })
        }

      });  
    },(error)=>{
      console.error(error)
    }); 
  }


  compennetDidUnmount(){  
    sqLite.close()  
  } 

  componentWillReceiveProps(nextProps){
    if(this.props.accountManageReducer.deleteSuc !== nextProps.accountManageReducer.deleteSuc && nextProps.accountManageReducer.deleteSuc){
      this.setState({
        visible: false,
        loadingText: ''
      })
      ToastAndroid.show(I18n.t('delete_successfully'),3000)
      if(this.props.accountsNumber === 1){
        setTimeout(() => {
          toLogin()
        },1000)
        sqLite.dropTable()
        sqLite.deleteData()  
      }else{
        //删除其他账号后 更新accountInfo信息  如果删除的是当前账号  更新accountInfo后还需要将另外的一条信息的is_selected=1
        this.setState({
          visible: false,
          loadingText: ''
        })
        this.props.dispatch(passAccountsInfoAction())
        setTimeout(() => {
          this.props.navigator.pop()
        },1000)
      }
    }

    if(this.props.accountManageReducer.delMnemonicSuc !== nextProps.accountManageReducer.delMnemonicSuc && nextProps.accountManageReducer.delMnemonicSuc){
      this.setState({
        mncBackuped: true
      })
    }

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
        // })
          break
        default:
          break
      }
    }
  }

  deleteAccount = () => {
    this.setState({
      iptPsdVisible: true,
      isDelAccount: true
    })

  }

  onPressCancel = () => {
    this.setState({
      dVisible: false
    })
  }
  onPressConfirmDel = () => {
    this.setState({
      dVisible: false,
      visible: true,
      loadingText: I18n.t('deleting_account')
    })
    this.props.dispatch(deleteAccountAction(this.props.b_id,this.props.accountsNumber,this.props.currentAccountId))   
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
      backupMnemonic: false,
      isDelAccount: false,
      visible: false
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
      privBackuped: true,
    })

    this.props.dispatch(updateBackupStatusAction(this.props.address))
  }

  onConfirm = () => {
    const { psdVal,backupMnemonic,keyStore,isDelAccount,  } = this.state
    this.setState({
      loadingText: I18n.t("unlocking"),
      visible: true,
      iptPsdVisible: false
    })  
    setTimeout(() => {
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
          if(isDelAccount){
            this.setState({
              dVisible: true,
            })
          }else{
            this.setState({
              privKey: priv,
              pKeyVisible: true
            })
          }
        }
        this.onHide()
      } catch (err) {
        ToastAndroid.show(I18n.t('password_is_wrong'),3000)
        this.setState({
          psdVal: '',
          visible: false,
          loadingText: '',
        })
      }
    },1000)
  }




  onCopyBtn = () => {
    Clipboard.setString(this.state.privKey)
    ToastAndroid.show(I18n.t('copy_successfully'),3000)
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
      title: I18n.t('backup_keystore_title'),
    }, {
      dialogTitle: I18n.t('share_your_keystore'),
    })
    .then(this._showResult)
    .catch((error) => ToastAndroid.show(I18n.t('share_error'),3000))
  }
  _showResult = (result) => {
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // this.setState({result: 'shared with an activityType: ' + result.activityType});
      } else {
        // ToastAndroid.show('shared successfully',3000)
        // this.setState({result: 'shared'});
      }
    } else if (result.action === Share.dismissedAction) {
      ToastAndroid.show(I18n.t('share_error'),3000)
    }
  }

  render(){
    const { iptPsdVisible,psdVal,pKeyVisible,privKey,privBackuped,mncBackuped,keyStore,dVisible } = this.state
    const { isLoading } = this.props.accountManageReducer
    return(
      <View style={[pubS.container,{backgroundColor:'#fff',alignItems:'center'}]}>
        <Loading loadingVisible={this.state.visible} loadingText={this.state.loadingText}/>
        <Image source={require('../../../images/xhdpi/Penguin.png')} style={styles.avateStyle}/>
        <Text style={pubS.font26_5}>{sliceAddress(this.props.address,10)}</Text>
        <View style={[styles.userNameViewStyle,pubS.rowCenterJus,pubS.bottomStyle]}>
          <Text style={pubS.font26_4}>{I18n.t('account_name')}</Text>
          <Text style={pubS.font26_4}>{this.props.userName}</Text>
        </View>
        <View style={{position:'absolute',bottom: scaleSize(40)}}>
          <Btn
            btnPress={ mncBackuped ? () => {return} : () => this.backupMnemonicBtn() }
            bgColor={mncBackuped ? '#BDC0C6' : '#2B8AFF'}
            opacity={mncBackuped ? 1 : .7}
            btnText={I18n.t('backup_mnemonic_1')}
            btnMarginTop={scaleSize(150)}
          />
          <Btn
            btnPress={() => this.backUpKeyStoreBtn() }
            bgColor={'#2B8AFF'}
            opacity={.7}
            btnText={I18n.t('backup_keystore_1')}
            btnMarginTop={scaleSize(20)}
          />
          <Btn
            btnPress={privBackuped ? () => {return} : () => this.backUpPrivBtn() }
            bgColor={privBackuped ? '#BDC0C6' : '#2B8AFF'}
            opacity={privBackuped ? 1 : .7}
            btnText={I18n.t('backup_private_key')}
            btnMarginTop={scaleSize(20)}
          />
          <Btn
            btnPress={this.deleteAccount}
            btnText={I18n.t('delete')}
            btnMarginTop={scaleSize(20)}
            bgColor={'#BDC0C6'}
          />
        </View>

        <Modal
          isVisible={iptPsdVisible}
          onBackButtonPress={this.onHide}
          onBackdropPress={this.onHide}
          backdropOpacity={.8}
        >
          <View style={styles.modalView}>
            <Text style={[pubS.font34_2,{marginTop: scaleSize(50)}]}>{I18n.t('enter_password')}</Text>
            <TextInput
              placeholder={I18n.t('password')}
              value={psdVal}
              onChangeText={ this.onChangePsdText}
              underlineColorAndroid={'transparent'}
              textAlignVertical={'center'}
              secureTextEntry={true}
              style={styles.textIptStyle}
            />
            <View style={[pubS.rowCenter,pubS.topBorderStyle,{height: scaleSize(88),marginTop: scaleSize(25),width: '100%'}]}>
              <TouchableOpacity activeOpacity={.7} onPress={this.onHide} style={[pubS.center,styles.modalBtnStyle]}>
                <Text style={[pubS.font34_3,{}]}>{I18n.t('cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={.7} onPress={this.onConfirm} style={[pubS.center,{width:'50%',borderBottomRightRadius:scaleSize(26)}]}>
                <Text style={[pubS.font34_3,{fontWeight: 'bold'}]}>{I18n.t('confirm')}</Text>
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
            <View style={[{height: scaleSize(90),backgroundColor:'#2B8AFF',width: '100%',borderTopLeftRadius: scaleSize(10),borderTopRightRadius: scaleSize(10),},pubS.center]}>
              <Text style={[pubS.font36_4,{fontWeight: 'bold'}]}>{I18n.t('backup_private_key')}</Text>
              <TouchableOpacity activeOpacity={.7} onPress={this.onPKeyHide} style={styles.iconStyle}>
                <Image source={require('../../../images/xhdpi/btn_ico_collectionnobackup_close_def.png')} style={{height: scaleSize(30),width: scaleSize(30)}}/>
              </TouchableOpacity>
            </View>
            <View style={{backgroundColor:'#FFE186',paddingLeft: scaleSize(28),paddingRight: scaleSize(28),paddingTop: scaleSize(13),paddingBottom: scaleSize(13)}}>
              <Text style={pubS.font22_1}>{I18n.t('private_key_modal')}</Text>
            </View>
            <View style={[styles.pkStyle,pubS.center]}>
              <Text style={pubS.font24_3}>{privKey}</Text>
            </View>
            <TouchableOpacity onPress={this.onCopyBtn} activeOpacity={.7} style={[styles.copyBtnStyle,pubS.center]}>
              <Text style={pubS.font28_4}>{I18n.t('copy')}</Text>
            </TouchableOpacity>
          </View>
        </Modal>

       <Modal isVisible={dVisible}>
          <View style={[styles.confirmModal]}>
            <Text style={[pubS.font34_3,styles.titleStyle]}>{I18n.t('delete_account')}</Text>
            <View style={[pubS.center,pubS.rowCenter,styles.btnViewStyle]}>
              <TouchableOpacity activeOpacity={.6} onPress={this.onPressCancel} style={[pubS.center,styles.btnStyle]}>
                <Text style={pubS.font34_3}>{I18n.t('cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={.6} onPress={this.onPressConfirmDel} style={[pubS.center,styles.btnStyle,{borderRightWidth:StyleSheet.hairlineWidth,borderColor:'#dce4e6'}]}>
                <Text style={pubS.font34_3}>{I18n.t('confirm')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>
    )
  }
}
const styles = StyleSheet.create({
  btnViewStyle: {
    position: 'absolute',
    bottom:0,
    borderColor: '#dce4e6',
      borderTopWidth: StyleSheet.hairlineWidth,  
  },
  titleStyle: {
    marginTop: 40,
    alignSelf: 'center'
  },
  confirmModal:{
    backgroundColor:'#fff',
    height: 150,
    width:280,
    alignSelf:'center',
    borderRadius: 5,

  },
  btnStyle: {
    height:40,
    width: 140,
  },
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
