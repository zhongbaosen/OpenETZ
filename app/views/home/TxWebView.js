import React, { Component } from 'react'
import {
	WebView,
} from 'react-native'
import { scaleSize } from '../../utils/adapter'
export default class TxWebView extends Component{
	render(){
		return(
			<WebView
		        source={{uri:`https://explorer.etherzero.org/tx/${this.props.hash}`}}
		        style={{flex:1,alignSelf:'center',width: scaleSize(750)}}
	      	/>
		)
	}
}