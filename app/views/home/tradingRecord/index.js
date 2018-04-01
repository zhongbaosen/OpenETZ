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

import TradingSQLite from '../../../utils/tradingDB'
import UserSQLite from '../../../utils/accountDB'
const tradingSqLite = new TradingSQLite()  
let t_db
const sqLite = new UserSQLite();  
let db  


const PickerData = [
  ['January ','February','March','April','May','June','July','August','September','October','November','December'],
  ['2015','2016','2017','2018'],
];
class TradingRecord extends Component{
  constructor(props){
    super(props)
    this.state = {
      tradingList: []
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
  componentWillMount(){
    if(!t_db){
      t_db = tradingSqLite.open()
    }
    if(!db){
      db = sqLite.open()
    }

    db.transaction((tx) => {
        tx.executeSql("select * from account where is_selected=1",[],(tx,results)=>{
          let aName = results.rows.item(0).account_name
          t_db.transaction((tx)=>{  
              tx.executeSql("select * from trading where tx_account_name = ?", [aName],(tx,t_results)=>{  
                let len = t_results.rows.length 
                let list = []
                for(let i=0; i<len; i++){  
                  let u = t_results.rows.item(i)
                  list.push(u)
                }
                this.setState({
                  tradingList: list
                })
              })
          },(error)=>{

          })
        })
      },(error) => {

    })
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
              style={{backgroundColor:'#144396',height: scaleSize(84)}}
            />
          )}
        >
            <RecordAll key={1} tabLabel={'All'} list={this.state.tradingList}/>
            <RecordPay key={2} tabLabel={'Send'} list={this.state.tradingList}/>
            {
              //<RecordCollection key={3} tabLabel={'Receive'}/>
            }

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
