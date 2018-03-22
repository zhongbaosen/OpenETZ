import React, { Component } from 'react'
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'
import { pubS } from '../styles/'
import { setScaleText, scaleSize } from '../utils/adapter'
export default class TextInputComponent extends Component{
  constructor(props){
    super(props)
    this.state = {
      multiline: false,
      iptMarginTop: 0,
    }
  }
  static defaultProps = {
    isScan: false,
    toMore: false,
    coinUnit: '',
  }
  componentWillMount(){
    this.setState({
      multiline: this.props.isMultiline
    })
  }

  render(){
    const { warningText,iptMarginTop,isScan,onPressIptRight,toMore,coinUnit } = this.props
    const { multiline} = this.state
    return(
      <View style={[styles.textInputView,{marginTop: iptMarginTop,height: multiline ? scaleSize(190) :scaleSize(109)}]}>
        <TextInput
          multiline={multiline}
          style={[styles.textIptStyle,{borderColor: multiline ? '#DBDFE6' : 'transparent',borderWidth: multiline ? StyleSheet.hairlineWidth : 0}]}
          placeholderTextColor={'#C7CACF'}
          underlineColorAndroid='#DBDFE6'
          underlineColorAndroid={ multiline ? 'transparent' : '#DBDFE6'}
          textAlignVertical={ multiline ? 'top' : 'center'}
          {...this.props}
        />
        <TouchableOpacity activeOpacity={.7} onPress={onPressIptRight} style={{position:'absolute',right:4,top:scaleSize(32),}}>
            {
              isScan ?
              <Image source={require('../images/xhdpi/btn_ico_payment_scan_def.png')} style={{width: scaleSize(45),height: scaleSize(43)}}/>
              : null
            }
            {
              toMore ?
              <Image source={require('../images/xhdpi/btn_ico_payment_select_def.png')} style={{width: scaleSize(16),height: scaleSize(30)}}/>
              : null
            }
            {
              coinUnit.length > 0 ?
              <Text style={pubS.font26_4}>{coinUnit}</Text>
              : null
            }
        </TouchableOpacity>
        <Text style={[pubS.font24_1,{marginTop: multiline ? 0 : -8,marginLeft: 4}]}>{warningText}</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  textInputView: {
    // borderColor:'red',
    // borderWidth:1,
    alignSelf:'center',
    width: scaleSize(680),
    backgroundColor: '#fff',
  },

  textIptStyle: {
    // borderColor:'red',
    // borderWidth:1,
    padding: 0,
    paddingLeft: 4,
    flex: 1,
    fontSize: setScaleText(26),
    color:'#657CAB'
  },
})
