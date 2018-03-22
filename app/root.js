import React, { Component } from 'react'
import {
  StatusBar,
  Platform,
  BackHandler,
  NetInfo,

} from 'react-native'
import { Navigation } from 'react-native-navigation'
import { registerScreens, registerScreenVisibilityListener, } from './config/'
import { getPixelRatio } from './utils/adapter'
import { TabBarAppStyle,AssetsNavStyle,MainThemeNavColor } from './styles/'
registerScreens()
registerScreenVisibilityListener()
getPixelRatio()//得到设备的像素密度


//首先进入启动页
// Navigation.startSingleScreenApp({
//   screen: {
//     screen: 'splash',
//     navigatorStyle: {navBarHidden: true,statusBarColor:'#f36'},
//   }
// })


//登录页  导入账户 创建账户
Navigation.startSingleScreenApp({
  screen: {
    screen: 'login',
    navigatorStyle: {navBarHidden: true,statusBarColor:'#144396'},
  }
})

// 主页   资产  我的
//ios  底部 tab style
const bottomTabStyle = {
  top: 6,
  left: 6,
  bottom: 6,
  right: 6,
}

const tabs = [
  {
    label: 'Assets',
    screen: 'home_assets',
    icon: require('./images/xhdpi/tab_ico_personalcenter_assets_def.png'),
    selectedIcon: require('./images/xhdpi/tab_ico_home_asset_def.png'),
    navigatorStyle: AssetsNavStyle,
    title:'username',
    // navigatorButtons: {
    //   rightButtons: [
    //     {
    //         icon: require('./images/xhdpi/nav_ico_home_more_def.png'),
    //         id: 'right_drawer'
    //     }
    //   ],
    //   leftButtons: [
    //     {
    //       icon: require('./images/xhdpi/nav_ico_home_message_def.png'),
    //       id: 'left_drawer'
    //     }
    //   ]
    // },

    iconInsets: bottomTabStyle
  },
  {
    label: 'Mine',
    screen: 'home_personal',
    icon: require('./images/xhdpi/tab_ico_home_personalcenter_def.png'),
    selectedIcon: require('./images/xhdpi/tab_ico_personalcenter_personal_def.png'),
    navigatorStyle: Object.assign({},AssetsNavStyle,{ navBarHidden: true, }),
    iconInsets: bottomTabStyle
  },
]

function toHome () {

   return Navigation.startTabBasedApp({
      tabs,
      appStyle: TabBarAppStyle,
    })

}


// toHome()

export {
  toHome,
}
