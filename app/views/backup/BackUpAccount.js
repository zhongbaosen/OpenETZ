

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
} from 'react-native'

import { pubS } from '../../styles/'
import { setScaleText, scaleSize } from '../../utils/adapter'
import { Btn } from '../../components/'
import Modal from 'react-native-modal'
class BackUpAccount extends Component{
  constructor(props){
    super(props)
    this.state = {
      iptPsdVisible: false,
      psdVal: ''
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }
  onNavigatorEvent(event){
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'save_back_up_info') {
        alert('Save')
      }
    }
  }
  deleteAccount = () => {
    alert('delete')
  }
  backUpBnt = () => {
      this.setState({
        iptPsdVisible: true
      })
  }
  onHide = () => {
    this.setState({
      iptPsdVisible: false
    })
  }
  onChangePsdText = (val) => {
    this.setState({
      psdVal: val
    })
  }

  onCancelBtn = () => {
    this.setState({
      iptPsdVisible: false
    })
  }
  onSureBtn = () => {
    this.setState({
      iptPsdVisible: false
    })
  }
  render(){
    const { iptPsdVisible,psdVal } = this.state
    return(
      <View style={[pubS.container,{backgroundColor:'#fff',alignItems:'center'}]}>
        <Image source={require('../../images/xhdpi/btn_ico_home_collection_def.png')} style={styles.avateStyle}/>
        <Text style={pubS.font26_5}>{'0x47874587...47sd2sd522'}</Text>
        <View style={[styles.userNameViewStyle,pubS.rowCenterJus,pubS.bottomStyle]}>
          <Text style={pubS.font26_4}>wallet name</Text>
          <Text style={pubS.font26_4}>Username</Text>
        </View>

        <Btn
          btnPress={this.backUpBnt}
          btnText={'backup private key'}
          btnMarginTop={scaleSize(317)}
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
          // style={styles.modalView}
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
              style={styles.textIptStyle}
            />
            <View style={[pubS.rowCenter,pubS.topBorderStyle,{height: scaleSize(88),marginTop: scaleSize(25),width: '100%'}]}>
              <TouchableOpacity activeOpacity={.7} onPress={this.onCancelBtn} style={[pubS.center,styles.modalBtnStyle]}>
                <Text style={pubS.font34_3}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={.7} onPress={this.onSureBtn} style={[pubS.center,{width:'50%',borderBottomRightRadius:scaleSize(26)}]}>
                <Text style={pubS.font34_3}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}
const styles = StyleSheet.create({
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
export default BackUpAccount
