// 按钮   一种是  宽度与屏幕宽度一致  一种是左右padding  30px
import React, {Component} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import {pubS} from '../styles/'
import { scaleSize, setScaleText } from '../utils/adapter'
export default class Btn extends Component {
  static defaultProps = {
    btnWidth: scaleSize(680),
    bgColor: '#2B8AFF',
    btnMarginTop: 0,
  }
  render () {
    const {  btnWidth, btnPress, btnText,btnMarginTop,bgColor } = this.props
    return (
      <TouchableOpacity style={[{width: btnWidth ,marginTop: btnMarginTop,backgroundColor:bgColor,}, pubS.center, styles.btnView]} activeOpacity={.7} onPress={btnPress}>
        <Text style={pubS.font26_1}>{btnText}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  btnView: {
    height: scaleSize(90),
    alignSelf: 'center',
    borderRadius: 4,
  }
})
