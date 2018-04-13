import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ToastAndroid
} from 'react-native'

import { pubS } from '../../../styles/'
import { setScaleText, scaleSize } from '../../../utils/adapter'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'
import  PrivateKey from './PrivateKey'
import KeyStore from './KeyStore'
import Mnemonic from './Mnemonic'
import { connect } from 'react-redux'
import { toSplash,toHome } from '../../../root'
import { resetDeleteStatusAction } from '../../../actions/accountManageAction'
import { Loading } from '../../../components/' 
class ImportAccount extends Component{
  componentWillReceiveProps(nextProps){
    // if(nextProps.accountManageReducer.importSucc !== this.props.accountManageReducer.importSucc && nextProps.accountManageReducer.importSucc){
    //   ToastAndroid.show('import successfully',3000)
    //   toSplash()
    //   this.props.dispatch(resetDeleteStatusAction())
    // }
  }

  render(){
    const { importSucc } = this.props.accountManageReducer
    return(
      <View style={pubS.container}>
        {
          // <Loading loadingVisible={importSucc} loadingText={'importing account'}/>
          
        }
        <ScrollableTabView
          style={{ width: scaleSize(750)}}
          tabBarActiveTextColor={'#2B8AFF'}
          tabBarInactiveTextColor={'#CACED4'}
          tabBarTextStyle={{fontSize: setScaleText(26)}}

          renderTabBar={() => (
            <DefaultTabBar
              underlineStyle={[styles.underlineStyle]}
              tabBarBackgroundColor={'#fff'}
              style={{ alignItems: 'center', backgroundColor: '#fff',borderColor:'transparent',marginBottom:-1,}}
              tabStyle={{ paddingTop: 10, height: 45, zIndex: 999, }}
            />
          )}
        >
            <Mnemonic key={1} tabLabel={'Mnemonic'} thisProps={this}/>
            <KeyStore key={2} tabLabel={'Keystore'} thisProps={this}/>
            <PrivateKey key={3} tabLabel={'Private Key'} thisProps={this}/>
        </ScrollableTabView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  underlineStyle: {
    borderColor: '#2B8AFF',
    backgroundColor: '#2B8AFF',
    borderBottomWidth:3,
    height:0,
  }
})

export default connect(
  state => ({
    accountManageReducer: state.accountManageReducer
  })
)(ImportAccount)