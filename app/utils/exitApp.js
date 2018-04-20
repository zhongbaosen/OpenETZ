import {
    BackHandler,
    Platform
} from 'react-native'
import Toast from 'react-native-toast'
import I18n from 'react-native-i18n'
export function onExitApp() {
    if (this.lastBackPressed && this.lastBackPressed + 2500 >= Date.now()) {
      BackHandler.exitApp()
      return true
    }
    this.lastBackPressed = Date.now()
    Toast.showLongBottom(I18n.t('click_again'))    
    return true
}