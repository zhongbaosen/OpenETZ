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
class VerifyMnemonic extends Component{
	constructor(props){
		super(props)
		this.state={

		}
	}
	
    render(){
	    return(
	    	<View style={[{flex:1,backgroundColor:'#F5F7FB',alignItems:'center'},pubS.paddingRow35]}>
	    		<View style={styles.selectViewBox}>
	    				
	    		</View>

	    		<View style={{flexWrap: 'wrap',marginTop: scaleSize(30)}}>
	    			<View style={[styles.selectItem,pubS.center]}>
	    				<Text style={pubS.font28_3}>task</Text>
	    			</View>
	    		</View>
		      	<Btn
		      		btnMarginTop={scaleSize(60)}
			        btnPress={this.onNextStep}
			        btnText={'Confirm'}
		      	/>
	        </View>
	    )
    }
}

const styles = StyleSheet.create({
	selectViewBox:{
		height: scaleSize(280),
		width: scaleSize(680),
		backgroundColor:'#fff',
		marginTop: scaleSize(30)
	},
	selectItem: {
		backgroundColor:'#fff',
		height: scaleSize(80),
		width: scaleSize(200),
		borderRadius: 3,

	},
})
export default VerifyMnemonic