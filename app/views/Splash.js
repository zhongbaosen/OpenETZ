import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Button
} from 'react-native'
import { toHome, toLogin} from '../root'
 class Splash extends Component{
 	// componentWillMount(){
 	// 	localStorage.remove({
		// 	key: 'account'
		// });
 	// }
 	componentDidMount(){
 		localStorage.load({
 			key: 'account'
 		}).then(ret => {
 			console.log('ret==',ret)
 			toHome()
 		}).catch(err => {
 			toLogin()
 		})
 	}

    render(){
    	return(
	      <View style={{flex:1}}>
	      	<Image source={require('../images/xhdpi/splash.png')} style={{width: '100%', height:'100%'}}/>
	      </View>
    	)
    }
}
export default Splash
