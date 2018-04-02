import {
    BackHandler,
    ToastAndroid,
} from 'react-native'

export function onExitApp() {
    if (this.lastBackPressed && this.lastBackPressed + 2500 >= Date.now()) {
      BackHandler.exitApp()
      return true
    }
    this.lastBackPressed = Date.now()
    ToastAndroid.show('Click the exit program again',3000)
    return true
}