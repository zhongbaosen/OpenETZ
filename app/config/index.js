import { StyleSheet, View, Text, Image } from 'react-native'
import { Navigation, ScreenVisibilityListener } from 'react-native-navigation'

import Splash from '../views/Splash'
import Login from '../views/login/'
import CreateAccount from '../views/login/CreateAccount'
import ImportAccount from '../views/login/ImportAccount'
import TermsOfService from '../views/login/TermsOfService'
import CreateAccountSuccess from '../views/login/CreateAccountSuccess'

import BackUpAccount from '../views/backup/BackUpAccount'


import Personal from '../views/personal/'
import ContactService from '../views/personal/ContactService'
import HelpCenter from '../views/personal/HelpCenter'
import AccountManage from '../views/personal/AccountManage'


import Assets from '../views/home/Assets'
import MsgCenterList from '../views/home/MsgCenterList'
import Collection from '../views/home/Collection'
import Payment from '../views/home/Payment'
import TradingRecord from '../views/home/tradingRecord/'
import ScanQrCode from '../views/home/ScanQrCode'
import AssetDetailList from '../views/home/AssetDetailList'
import TradingRecordDetail from '../views/home/TradingRecordDetail'


export function registerScreens() {
  Navigation.registerComponent('splash', () => Splash)
  Navigation.registerComponent('login', () => Login)
  Navigation.registerComponent('create_account', () => CreateAccount)
  Navigation.registerComponent('import_account', () => ImportAccount)
  Navigation.registerComponent('terms_of_service', () => TermsOfService)
  Navigation.registerComponent('create_account_success', () => CreateAccountSuccess)
  Navigation.registerComponent('back_up_account', () => BackUpAccount)
  Navigation.registerComponent('home_assets', () => Assets)
  Navigation.registerComponent('home_personal', () => Personal)
  Navigation.registerComponent('msg_center_list', () => MsgCenterList)
  Navigation.registerComponent('on_payment', () => Payment)
  Navigation.registerComponent('on_collection', () => Collection)
  Navigation.registerComponent('trading_record', () => TradingRecord)
  Navigation.registerComponent('scan_qr_code', () => ScanQrCode)
  Navigation.registerComponent('asset_detail_list', () => AssetDetailList)
  Navigation.registerComponent('trading_record_detail', () => TradingRecordDetail)
  Navigation.registerComponent('contact_service', () => ContactService)
  Navigation.registerComponent('help_center', () => HelpCenter)
  Navigation.registerComponent('account_manage', () => AccountManage)

}

// 注册页面切换监听器
export function registerScreenVisibilityListener() {
  new ScreenVisibilityListener({
    // willAppear: ({screen}) => console.log(`Displaying screen ${screen}`),
    // didAppear: ({screen, startTime, endTime, commandType}) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
    // willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
    // didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`)
  }).register()
}
