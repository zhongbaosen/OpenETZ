import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Button
} from 'react-native'
import { toHome, toLogin} from '../root'
import { getLocalDataAction } from '../actions/getLocalDataAction' 
import { connect } from 'react-redux'

 class Splash extends Component{
  constructor(props){
    super(props)
    this.state = {
      // accountData: null
    }
  }
 	// componentWillMount(){
 	// 	localStorage.remove({
		// 	key: 'account'
		// });
 	// }
 	componentDidMount(){
    // toLogin()
    
 		localStorage.load({
 			key: 'account'
 		}).then(ret => {
 			console.log('ret==',ret)
      this.props.dispatch(getLocalDataAction(ret.keyStore,ret.userName))
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
export default connect(
  state => ({
    getLocalDataReducer: state.getLocalDataReducer
  })
)(Splash)
