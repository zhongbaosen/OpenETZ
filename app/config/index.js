import { StyleSheet, View, Text, Image } from 'react-native'
import { Navigation, ScreenVisibilityListener } from 'react-native-navigation'

import store from '../store/'
import { Provider } from 'react-redux'

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
import TxWebView from '../views/home/TxWebView'


export function registerScreens() {
  Navigation.registerComponent('splash', () => Splash,store,Provider)
  Navigation.registerComponent('login', () => Login,store,Provider)
  Navigation.registerComponent('create_account', () => CreateAccount,store,Provider)
  Navigation.registerComponent('import_account', () => ImportAccount,store,Provider)
  Navigation.registerComponent('terms_of_service', () => TermsOfService,store,Provider)
  Navigation.registerComponent('create_account_success', () => CreateAccountSuccess,store,Provider)
  Navigation.registerComponent('back_up_account', () => BackUpAccount,store,Provider)
  Navigation.registerComponent('home_assets', () => Assets,store,Provider)
  Navigation.registerComponent('home_personal', () => Personal,store,Provider)
  Navigation.registerComponent('msg_center_list', () => MsgCenterList,store,Provider)
  Navigation.registerComponent('on_payment', () => Payment,store,Provider)
  Navigation.registerComponent('on_collection', () => Collection,store,Provider)
  Navigation.registerComponent('trading_record', () => TradingRecord,store,Provider)
  Navigation.registerComponent('scan_qr_code', () => ScanQrCode,store,Provider)
  Navigation.registerComponent('asset_detail_list', () => AssetDetailList,store,Provider)
  Navigation.registerComponent('trading_record_detail', () => TradingRecordDetail,store,Provider)
  Navigation.registerComponent('contact_service', () => ContactService,store,Provider)
  Navigation.registerComponent('help_center', () => HelpCenter,store,Provider)
  Navigation.registerComponent('account_manage', () => AccountManage,store,Provider)
  Navigation.registerComponent('tx_web_view', () => TxWebView,store,Provider)

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
