import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native'

import { pubS,DetailNavigatorStyle } from '../../styles/'
import { setScaleText, scaleSize } from '../../utils/adapter'

const DATA = [
  {
    short_name: 'ETZ',
    full_name: 'EtherZero',
    logo: '',
    price: '',
    coin_number: '',
    is_add: '',
  }
]

class AddAssets extends Component{
  constructor(props){
    super(props)
    this.state={

    }
  }

  renderItem = (item) => {
    return(
      <View style={[styles.listItemView,styles.whStyle]}>
        <Image source={require('../../images/xhdpi/etz_logo.png')} style={{width: scaleSize(44),height:scaleSize(44),marginTop: scaleSize(22)}}/>
        <View style={[styles.listItemTextView,pubS.rowCenterJus]}>
          <View>
            <Text style={pubS.font36_2}>ETZ</Text>
            <Text style={pubS.font24_2}>EtherZero</Text>
          </View>
          <TouchableOpacity style={[styles.selectIcon,pubS.center]} activeOpacity={.7} onPress={this.onPressSelect}>
            <Image source={require('../../images/xhdpi/btn_ico_addassets_pre.png')} style={{height: scaleSize(40),width: scaleSize(40),zIndex: 1000,}}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  onPressSelect = () => {

  }

  render(){
    return(
      <View style={{flex:1,backgroundColor:'#F5F7FB'}}>
        <FlatList
          data={DATA}
          renderItem={this.renderItem}
          keyExtractor = {(item, index) => index}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  selectIcon: {
    height: scaleSize(40),
    width: scaleSize(40),
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: '#CACDD2',
    backgroundColor:'#2B8AFF'
  },
  listItemView:{
    backgroundColor:'#fff',
    paddingLeft: scaleSize(22),
    paddingRight: scaleSize(22),
    justifyContent:'center',
    flexDirection:'row',
    borderRadius: 4,
    alignSelf:'center',
    marginTop: scaleSize(20),
  },
  whStyle: {
    height: scaleSize(120),
    width: scaleSize(702),
  },
  listItemTextView:{
    width: scaleSize(618),
    marginLeft:scaleSize(18),
    paddingTop: scaleSize(15),
    paddingBottom: scaleSize(22),
    // borderColor:'red',
    // borderWidth:1,
  },
})

export default AddAssets
