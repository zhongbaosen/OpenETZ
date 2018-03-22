import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'

import { pubS } from '../../styles/'
import { setScaleText, scaleSize } from '../../utils/adapter'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'
import { TextInputComponent,Btn } from '../../components/'
import { toHome } from '../../root'

class Privatekey extends Component{
  constructor(props){
    super(props)
    this.state = {
      privKey: '',
      psdVal: '',
      repeadPsdVal: '',
      promptVal: '',
    }
  }
  onChangePrivateText = (val) => {
    this.setState({
      privKey: val
    })
  }
  onChangPsdText = (val) => {
    this.setState({
      psdVal: val
    })
  }
  onChangeRepeatText = (val) => {
    this.setState({
      repeadPsdVal: val
    })
  }
  onChangePromptText = (val) => {
    this.setState({
      promptVal: val
    })
  }
  onPressImport = () => {
    //进入主页面
    // this.props.thisProps.props.navigator.setButtons({
    //   leftButtons: [
    //     {
    //       title: 'msg',
    //       id: '11'
    //     }
    //   ],
    //   rightButtons: [
    //     {
    //       title: 'more',
    //       id: '22'
    //     }
    //   ],
    //   animated: true
    // });

    toHome()




  }
  render(){
    const { privKey, psdVal, repeadPsdVal, promptVal, } = this.state
    return(
      <View>
        <TextInputComponent
          isMultiline={true}
          placeholder={'Import Private Key'}
          value={privKey}
          onChangeText={this.onChangePrivateText}
          // warningText={'Wrong Private Key'}
          iptMarginTop={scaleSize(60)}
        />
        <TextInputComponent
          placeholder={'password'}
          value={psdVal}
          onChangeText={this.onChangPsdText}
          secureTextEntry={true}
        />
        <TextInputComponent
          placeholder={'repeat password'}
          value={repeadPsdVal}
          onChangeText={this.onChangeRepeatText}
          secureTextEntry={true}
        />
        <TextInputComponent
          placeholder={'password hint (Optional)'}
          value={promptVal}
          onChangeText={this.onChangePromptText}
        />
        <Btn
          btnMarginTop={scaleSize(60)}
          btnPress={this.onPressImport}
          btnText={'import'}
        />
      </View>
    )
  }
}



class ImportAccount extends Component{
  render(){
    return(
      <View style={pubS.container}>
        <ScrollableTabView
          tabBarActiveTextColor={'#2B8AFF'}
          tabBarInactiveTextColor={'#C7CACF'}
          tabBarTextStyle={{fontSize:setScaleText(26)}}
          animationEnabled={false}
          tabBarPosition={'top'}
          renderTabBar={() => (
            <ScrollableTabBar
              underlineStyle={[ styles.underlineStyle ]}
              activeTextColor={'#2B8AFF'}
              inactiveTextColor={'#C7CACF'}
              tabBarBackgroundColor={'#fff'}
              style={{backgroundColor:'#fff',height: scaleSize(84)}}
            />
          )}
        >
            <Privatekey key={1} tabLabel={'private key'} thisProps={this}/>
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

export default ImportAccount
