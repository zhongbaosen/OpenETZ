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
// import Realm from 'realm'
 class Splash extends Component{
 	// componentWillMount(){
 	// 	localStorage.remove({
		// 	key: 'account'
		// });
 	// }
 	componentDidMount(){

    // toLogin()
    // toHome()
 		localStorage.load({
 			key: 'account'
 		}).then(ret => {
 			console.log('ret==',ret)
      this.props.dispatch(getLocalDataAction(ret.keyStore,ret.userName))
 			toHome()
 		}).catch(err => {
 			toLogin()
 		})






    // const AccuontSchema = {
    //   name: 'account',
    //   properties:{
    //     a_id: {type: 'int',default: 0},
    //     userName: 'string',
    //     address: 'string',
    //     id: 'string',
    //     version: {type: 'int'},
    //     cipher: 'string',
    //     ciphertext: 'string',
    //     kdf: 'string',
    //     mac: 'string',
    //     dklen: {type: 'int'},
    //     salt: 'string',
    //     n: {type: 'int'},
    //     r: {type: 'int'},
    //     p: {type: 'int'},
    //     iv: 'string',
    //   }
    // }

    // let realm = new Realm({schema: [AccuontSchema]});

    // realm.write(() => {
    //   let accountData = realm.create('account', {
    //     a_id: 0,
    //     userName: 'zhangsan',
    //     address: '56869761f1b1c688c1867ed8daa9197d3425f591',
    //     id: '12e89265-98a2-4d89-b2a5-9d847e8be2dd',
    //     version: 3,
    //     cipher: 'aes-128-ctr',
    //     ciphertext: '5f604dc82248b01fc19398d4fcd0b6e720e328c61fefd023af2e925f82adc527',
    //     kdf: 'scrypt',
    //     mac: '1d67e3d8ee8ff2ba22ee0138b0842fb9b88c40eef56c72e0cf9312cedf66ca89',
    //     dklen: 32,
    //     salt: '39b6262212b8f4904b9b1d9422b40db96c454bde5e567bb2f3e308616d9cc7bb',
    //     n: 262144,
    //     r: 8,
    //     p: 1,
    //     iv: '14505732ae3bb81aa555f3f65b10b320',
    //   });
    // })

    // Realm.open({schema:[AccuontSchema]})
    //   .then(realm => {
    //     console.log('realm==',realm)
    //   })
    //   .catch(error => {
    //     console.log('error=',error)
    //   })


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
