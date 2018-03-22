import { setScaleText, scaleSize } from '../utils/adapter'
import { StyleSheet } from 'react-native'
//主题色 #023193
// 可使用 Object.assign()方法对 这些style进行简化
const IndexNavStyle = {
  statusBarColor: '#fff',
  screenBackgroundColor: 'white',
  navBarBackgroundColor: '#fff',
  navBarComponentAlignment: 'center',
  navBarButtonColor: '#889696',
  navBarTitleTextCentered: true,
  navBarHeight: 45,
  statusBarTextColorScheme: 'light',
  topBarElevationShadowEnabled: false
}


const AssetsNavStyle = {
  tabBarHidden: false,
  navBarTextColor: '#FFFFFF',
  navBarTextFontSize: setScaleText(30),
  navBarBackgroundColor: '#023193',//渐变
  navBarComponentAlignment: 'center',
  // navBarButtonColor: '#D2D5DB',//
  // navBarLeftButtonColor:'#D2D5DB',//只在ios有效
  // navBarRightButtonColor:'#2B8AFF',//只在ios有效
  navBarHidden: false,
  statusBarHidden: false,
  screenBackgroundColor: 'white',
  navBarTitleTextCentered: true,
  navBarHeight: scaleSize(87),
  statusBarColor: '#023193',
  statusBarTextColorScheme: 'light',
  topBarElevationShadowEnabled: false,
  navBarNoBorder: false
}
const DetailNavigatorStyle = {
  tabBarHidden: true,
  navBarTextColor: '#657CAB',
  navBarTextFontSize: 14,
  navBarBackgroundColor: '#fff',
  navBarComponentAlignment: 'center',
  navBarButtonColor: '#D2D5DB',//
  navBarLeftButtonColor:'#D2D5DB',//只在ios有效
  navBarRightButtonColor:'#2B8AFF',//只在ios有效
  navBarHidden: false,
  statusBarHidden: false,
  screenBackgroundColor: 'white',
  navBarTitleTextCentered: true,
  navBarHeight: scaleSize(87),
  statusBarColor: '#fff',
  statusBarTextColorScheme: 'dark',
  topBarElevationShadowEnabled: false,
  navBarNoBorder: false
}
const MainThemeNavColor = Object.assign({},DetailNavigatorStyle,{
  navBarTextColor:'#fff',
  navBarBackgroundColor:'#023193',//主题色
  statusBarColor:'#023193',
  statusBarTextColorScheme:'light'
})
// 隐藏底部 tabs 适用于各个详情页
const HideTabsDetailStyle = {
  tabBarHidden: true, // 隐藏底部的tabs
  navBarBackgroundColor: '#000',
  navBarTextColor: '#fff',
  navBarTextFontSize: 18,
  // navBarTextFontFamily: 'font-name',
  navBarComponentAlignment: 'center',
  navBarButtonColor: '#fff',
  navBarHidden: false,
  statusBarHidden: false,
  screenBackgroundColor: 'white',
  navBarTitleTextCentered: true,
  navBarHeight: scaleSize(87),
  statusBarColor: '#000',
  statusBarTextColorScheme: 'light',
  navBarNoBorder: false
}

// login register screen  nav bar style
const SingleScreenAppNavigatorStyle = {
  // Common
  navBarTextColor: '#fff', // change the text color of the title (remembered across pushes)
  navBarTextFontSize: 18, // change the font size of the title
  // navBarTextFontFamily: 'font-name', // Changes the title font
  navBarBackgroundColor: '#000', // change the background color of the nav bar (remembered across pushes)
  // navBarCustomView: 'example.CustomTopBar', // registered component name
  navBarComponentAlignment: 'center', // center/fill
  navBarButtonColor: '#fff', // Change color of nav bar buttons (eg. the back button) (remembered across pushes)

  navBarHidden: false, // make the nav bar hidden
  // navBarHideOnScroll: false, // make the nav bar hidden only after the user starts to scroll
  // navBarTranslucent: false, // make the nav bar semi-translucent, works best with drawUnderNavBar:true
  // navBarTransparent: false, // make the nav bar transparent, works best with drawUnderNavBar:true,
  // navBarNoBorder: false, // hide the navigation bar bottom border (hair line). Default false
  // drawUnderNavBar: false, // draw the screen content under the nav bar, works best with navBarTranslucent:true
  // drawUnderTabBar: false, // draw the screen content under the tab bar (the tab bar is always translucent)
  // navBarBlur: false, // blur the entire nav bar, works best with drawUnderNavBar:true
  // tabBarHidden: false, // make the screen content hide the tab bar (remembered across pushes)
  statusBarHidden: false, // make the status bar hidden regardless of nav bar state
  statusBarTextColorScheme: 'light', // text color of status bar, 'dark' / 'light' (remembered across pushes)
  // navBarSubtitleColor: 'red', // subtitle color
  // navBarSubtitleFontFamily: 'font-name', // subtitle font
  screenBackgroundColor: 'white', // Default screen color, visible before the actual react view is rendered
  // orientation: 'portrait' // Sets a specific orientation to a modal and all screens pushed to it. Default: 'auto'. Supported values: 'auto', 'landscape', 'portrait'
  // disabledButtonColor: '#ff0000' // chnaged the navigation bar button text color when disabled.

  // iOS only
  // statusBarTextColorSchemeSingleScreen: 'light', // same as statusBarTextColorScheme but does NOT remember across pushes
  // statusBarHideWithNavBar: false, // hide the status bar if the nav bar is also hidden, useful for navBarHidden:true
  // statusBarBlur: true, // blur the area under the status bar, works best with navBarHidden:true

  // disabledBackGesture: false, // default: false. Disable the back gesture (swipe gesture) in order to pop the top screen.
  // disabledSimultaneousGesture: true, // default: true. Disable simultaneous gesture recognition.
  // screenBackgroundImageName: '<name of image in Images.xcassets>', // Optional. default screen background image.
  // rootBackgroundImageName: '<name of image in Images.xcassets>', // Static while you transition between screens. Works best with screenBackgroundColor: 'transparent'

  navBarButtonFontSize: 20, // Change font size nav bar buttons (eg. the back button) (remembered across pushes)
  navBarButtonFontWeight: '400', // Change font weight nav bar buttons (eg. the back button) (remembered across pushes)

  navBarLeftButtonFontSize: 17, // Change font size of left nav bar button
  // navBarLeftButtonColor: 'red', // Change color of left nav bar button
  navBarLeftButtonFontWeight: '400', // Change font weight of left nav bar button

  navBarRightButtonFontSize: 17, // Change font size of right nav bar button
  navBarRightButtonColor: 'red', // Change color of right nav bar button
  navBarRightButtonFontWeight: '400', // Change font weight of right nav bar button

  // // Android only
  // navigationBarColor: '#000000', // change the background color of the bottom native navigation bar.
  navBarTitleTextCentered: true, // default: false. centers the title.
  topBarElevationShadowEnabled: false, // default: true. Disables TopBar elevation shadow on Lolipop and above
  // statusBarColor: '#000', // change the color of the status bar.
  // collapsingToolBarImage: "http://lorempixel.com/400/200/", // Collapsing Toolbar image.
  // collapsingToolBarImage: require('../../img/topbar.jpg'), // Collapsing Toolbar image. Either use a url or require a local image.
  // navBarTextFontBold: false, // Optional. Set the title to bold.
  navBarHeight: 45 // Optional, set the navBar height in pixels.
  // topTabsHeight: scaleSize(98), // Optional, set topTabs height in pixels.
  // topBarBorderColor: 'red', //Optional, set a flat border under the TopBar.
  // topBarBorderWidth: 2, // Optional, set the width of the border
}

const TabBarAppStyle = {
  tabBarHidden: false, // make the tab bar hidden
  tabBarButtonColor: '#C7CAD0', // change the color of the tab icons and text (also unselected)
  tabBarSelectedButtonColor: '#2B8AFF', // change the color of the selected tab icon and text (only selected)
  tabBarBackgroundColor: '#fff', // change the background color of the tab bar
  tabBarTranslucent: true, // change the translucent of the tab bar to false
  // tabBarTextFontFamily: 'Avenir-Medium' //change the tab font family
  // tabBarLabelColor: '#2f3a40', // iOS only. change the color of tab text
  // tabBarSelectedLabelColor: '#ff3366', // iOS only. change the color of the selected tab text
  forceTitlesDisplay: true, // Android only. If true - Show all bottom tab labels. If false - only the selected tab's label is visible.
  tabBarHideShadow: true // iOS only. Remove default tab bar top shadow (hairline)
}

const DrawerStyle = {
  // optional, add this if you want a side menu drawer in your app
  left: {
    // optional, define if you want a drawer from the left
    screen: 'example.FirstSideMenu', // unique ID registered with Navigation.registerScreen
    passProps: {} // simple serializable object that will pass as props to all top screens (optional)
  },
  right: {
    // optional, define if you want a drawer from the right
    screen: 'example.SecondSideMenu', // unique ID registered with Navigation.registerScreen
    passProps: {} // simple serializable object that will pass as props to all top screens (optional)
  },
  style: {
    // ( iOS only )
    drawerShadow: true, // optional, add this if you want a side menu drawer shadow
    contentOverlayColor: 'rgba(0,0,0,0.25)', // optional, add this if you want a overlay color when drawer is open
    leftDrawerWidth: 50, // optional, add this if you want a define left drawer width (50=percent)
    rightDrawerWidth: 50, // optional, add this if you want a define right drawer width (50=percent)
    shouldStretchDrawer: true // optional, iOS only with 'MMDrawer' type, whether or not the panning gesture will “hard-stop” at the maximum width for a given drawer side, default : true
  },
  type: 'MMDrawer', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
  animationType: 'door', // optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
  // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
  disableOpenGesture: false // optional, can the drawer be opened with a swipe instead of button
}

// login and register pages
const pubS = {

  paddingCloumn20:{
    paddingTop: scaleSize(20),
    paddingBottom: scaleSize(20)
  },
  paddingRow40:{
    paddingLeft: scaleSize(40),
    paddingRight: scaleSize(40)
  },
  padding50:{
    paddingLeft: scaleSize(50),
    paddingRight: scaleSize(50)
  },
  rowCenter2: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  // 居中
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  rowCenterJus: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-between',
  },
  rowCenterAro: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-around',
  },
  rowCenter:{
    flexDirection:'row',
    alignItems: 'center',
  },
  rowBetween:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  rowEnd:{
    flexDirection:'row',
    alignItems:'flex-end',
  },
  rowAround: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  bottomStyle: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor:'#dce4e6',
  },
  topBorderStyle: {
    borderColor: '#dce4e6',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  borderStyle: {
    borderColor: '#dce4e6',
    borderWidth: StyleSheet.hairlineWidth,
  },
  container: {
    flex: 1,
    backgroundColor:'#fff',
    // width: scaleSize(750),
  },
  fullWH:{
    width:'100%',
    height: '100%'
  },
  paddingRow_24: {
    paddingLeft: scaleSize(24),
    paddingRight: scaleSize(24),
  },
  font22_1:{
    color:'#FF9126',
    fontSize: setScaleText(22)
  },
  font22_2:{
    color:'#FEFEFE',
    fontSize: setScaleText(22)
  },
  font22_3:{
    color:'#657CAB',
    fontSize: setScaleText(22)
  },
  font22_4:{
    color:'#A1A4A8',
    fontSize: setScaleText(22)
  },
  font22_5:{
    color:'#FF6060',
    fontSize: setScaleText(22)
  },
  font24_1:{
    color:'#FF6060',
    fontSize: setScaleText(24)
  },
  font24_2:{
    color:'#657CAB',
    fontSize: setScaleText(24)
  },
  font24_3:{
    color:'#A1C0FF',
    fontSize: setScaleText(24)
  },
  font24_4:{
    color:'#C7CACF',
    fontSize: setScaleText(24)
  },
  font24_5:{
    color:'#A1A4A8',
    fontSize: setScaleText(24)
  },
  font26_1:{
    color:'#fff',
    fontSize: setScaleText(26)
  },
  font26_2:{
    color:'#A1A4A8',
    fontSize: setScaleText(26)
  },
  font26_3:{
    color:'#fff',
    fontSize: setScaleText(26)
  },
  font26_4:{
    color:'#657CAB',
    fontSize: setScaleText(26)
  },
  font26_5:{
    color:'#C7CACF',
    fontSize: setScaleText(26)
  },
  font28_1:{
      color:'#95C4FF',
      fontSize: setScaleText(28)
  },
  font28_2:{
      color:'#2B8AFF',
      fontSize: setScaleText(28)
  },
  font28_3:{
      color:'#657CAB',
      fontSize: setScaleText(28)
  },

  font30_1:{
    color:'#fff',
    fontSize: setScaleText(30)
  },
  font30_2:{
    color:'#657CAB',
    fontSize: setScaleText(30)
  },
  font30_3:{
    color:'#FEFEFE',
    fontSize: setScaleText(30)
  },
  font32_1:{
    color:'#2B8AFF',
    fontSize: setScaleText(32)
  },
  font34_1:{
    color:'#657CAB',
    fontSize: setScaleText(34)
  },
  font34_2:{
    color:'#000',
    fontSize: setScaleText(34)
  },
  font34_3:{
    color:'#157EFB',
    fontSize: setScaleText(34)
  },
  font36_1:{
    color:'#657CAB',
    fontSize: setScaleText(36)
  },
  font36_2:{
    color:'#080E5D',
    fontSize: setScaleText(36)
  },
  font36_3:{
    color:'#FFF222',
    fontSize: setScaleText(36)
  },
  font54_1:{
    color:'#fff',
    fontSize: setScaleText(54)
  },
  font60_1:{
    color:'#657CAB',
    fontSize: setScaleText(60)
  },
  font72_1:{
    color:'#fff',
    fontSize: setScaleText(72)
  },
}
export {
  IndexNavStyle,
  DetailNavigatorStyle,
  HideTabsDetailStyle,
  SingleScreenAppNavigatorStyle,
  pubS,
  DrawerStyle,
  TabBarAppStyle,
  AssetsNavStyle,
  MainThemeNavColor
}
