import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from 'react-native'

import { pubS,DetailNavigatorStyle } from '../../styles/'
import { setScaleText, scaleSize } from '../../utils/adapter'
import QRCodeScanner from 'react-native-qrcode-scanner'
class ScanQrCode extends Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }
  onSuccess = () => {

  }

  onCancel = () => {
    this.props.navigator.pop()
  }
  render(){
    return(
        <View style={pubS.container}>
          <QRCodeScanner
            onRead={this.onSuccess}
            bottomContent={(
              <TouchableOpacity activeOpacity={.7} onPress={this.onCancel}>
                <Text style={pubS.font54_1}>Cancel</Text>
              </TouchableOpacity>
            )}
            customMarker={(
              <View style={{height:scaleSize(390),width:scaleSize(390),alignSelf:'center'}}>

              </View>
            )}
            cameraStyle={{backgroundColor:'transparent'}}
            containerStyle={{backgroundColor:'#000'}}
            topViewStyle={{backgroundColor:'#000'}}
            bottomViewStyle={{backgroundColor:'#000'}}
          />
        </View>
    )
  }
}

const styles = StyleSheet.create({

});

export default ScanQrCode
