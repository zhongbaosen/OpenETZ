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
import { Btn } from '../../../components/'
class WriteMnemonic extends Component{
	constructor(props){
		super(props)
		this.state={

		}
	}
	onNextStep = () => {
		console.log(this)
		this.props.navigator.push({
	      screen: 'verify_mnemonic',
	      title: 'Verify Mnemonic',
	      navigatorStyle: DetailNavigatorStyle,
	    })
	}
    render(){
	    return(
	      <View style={[{flex:1,backgroundColor:'#F5F7FB',alignItems:'center'},pubS.paddingRow35]}>
	      	<Text style={[pubS.font34_1,{marginTop: scaleSize(60)}]}>Write down your account mnemonic</Text>
	      	<Text style={[pubS.font24_2,{textAlign :'center',marginTop: scaleSize(20)}]}>Mnemonic is used to restore an account, write it down, and put it in a safe place</Text>
	      	<View style={[styles.mneViewStyle,pubS.center]}>
	      		<Text style={pubS.font28_4}>mnemonic</Text>
	      	</View>
	      	<Btn
	      		btnMarginTop={scaleSize(80)}
		        btnPress={this.onNextStep}
		        btnText={'Next'}
	      	/>
	      </View>
	    )
    }
}
const styles = StyleSheet.create({
	mneViewStyle: {
		height: scaleSize(150),
		width: scaleSize(680),
		backgroundColor: '#808691',
		borderRadius: scaleSize(10),
		marginTop: scaleSize(40)
	}
})
export default WriteMnemonic
