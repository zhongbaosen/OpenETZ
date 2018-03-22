import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'

import { pubS,DetailNavigatorStyle } from '../../../styles/'
import { setScaleText, scaleSize } from '../../../utils/adapter'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'
import Picker from 'react-native-picker'
import RecordAll from './RecordAll'
import RecordPay from './RecordPay'
import RecordCollection from './RecordCollection'
const PickerData = [
  ['January ','February','March','April','May','June','July','August','September','October','November','December'],
  ['2015','2016','2017','2018'],
];
class TradingRecord extends Component{
  constructor(props){
    super(props)
    this.state = {

    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }


  onNavigatorEvent(event){
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'calendar_picker') {
        Picker.show()
      }
    }
  }

  componentDidMount(){
    Picker.init({
      pickerConfirmBtnText: 'Confirm',
      pickerCancelBtnText: 'Cancel',
      pickerTitleText: '',
      pickerConfirmBtnColor: [21, 126, 251, 1],
      pickerCancelBtnColor: [21, 126, 251, 1],
      pickerToolBarBg: [247, 247, 247, 1],
      pickerBg: [255, 255, 255, 1],
      pickerToolBarFontSize: 14,
      pickerFontSize: 22,
      pickerFontColor: [51, 51, 51, 1],
      pickerData: PickerData,
      onPickerConfirm: pickedValue => {

        console.log('pickedValue===',pickedValue)

      },
    })
  }

  render(){
    return(
      <View style={pubS.container}>
        <ScrollableTabView
          tabBarActiveTextColor={'#FFE822'}
          tabBarInactiveTextColor={'#fff'}
          tabBarTextStyle={{fontSize:setScaleText(26)}}
          animationEnabled={false}
          tabBarPosition={'top'}
          renderTabBar={() => (
            <ScrollableTabBar
              underlineStyle={[ styles.underlineStyle ]}
              style={{backgroundColor:'#023193',height: scaleSize(84)}}
            />
          )}
        >
            <RecordAll key={1} tabLabel={'All'}/>
            <RecordPay key={2} tabLabel={'Send'}/>
            <RecordCollection key={3} tabLabel={'Receive'}/>

        </ScrollableTabView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  underlineStyle: {
    borderColor: '#FFE822',
    backgroundColor: '#2B8AFF',
    borderBottomWidth:3,
    height:0,
  }
})
export default TradingRecord
