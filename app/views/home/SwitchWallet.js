import React, { Component } from 'react'
import {
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	Image,
	StyleSheet,
} from 'react-native'
import { pubS,ScanNavStyle,DetailNavigatorStyle } from '../../styles/'
import { setScaleText, scaleSize } from '../../utils/adapter'
import { connect } from 'react-redux'
import { switchAccountAction } from '../../actions/accountManageAction'
class SwitchWallet extends Component {
	constructor(props){
		super(props)
		this.state={

		}
		// this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
	}
	componentWillMount(){
		
	}
	// onNavigatorEvent(event){
		
	// }
	onScan = () => {
		this.props.thisPorps.props.navigator.push({
	      screen: 'scan_qr_code',
	      title:'Scan',
	      navigatorStyle: Object.assign({},DetailNavigatorStyle,{
	        navBarTextColor:'#fff',
	        navBarBackgroundColor:'#000',
	        statusBarColor:'#000',
	        statusBarTextColorScheme:'light',
	      }),
	    })
		this.props.onCloseSwitchDrawer()
	}
	onCreate = () => {
		this.props.thisPorps.props.navigator.push({
	      screen: 'create_account',
	      title:'create',
	      navigatorStyle: DetailNavigatorStyle,
	    })
	    this.props.onCloseSwitchDrawer()
	}
	onSwitch = (addr) => {
		this.props.dispatch(switchAccountAction(addr))
		this.props.onCloseSwitchDrawer()
	}
	render(){
		const { accountInfo,currentAddr } = this.props.accountManageReducer
		return(
			<View style={{backgroundColor:'#fff',flex:1,width:scaleSize(450),paddingTop: scaleSize(50)}}>
			
				{
					accountInfo.map((val,index) => {
						return(
							<TouchableOpacity key={index} style={[pubS.rowCenter,{height: scaleSize(100),backgroundColor: val.is_selected===1 ? '#E9ECF0' : '#fff'}]} activeOpacity={.7} onPress={() => this.onSwitch(val.address)}>
								<Image source={require('../../images/xhdpi/Penguin.png')} style={{width:scaleSize(55),height: scaleSize(55),marginLeft: scaleSize(33)}}/>
								<Text style={[pubS.font24_2,{marginLeft: scaleSize(33)}]}>{val.account_name}</Text>
							</TouchableOpacity>
						)
					})
				}
				
				<View style={{width: '100%',borderWidth: StyleSheet.hairlineWidth,borderColor:'#F2F2F2',marginTop:scaleSize(30),marginBottom: scaleSize(50)}}></View>
				<TouchableOpacity style={[pubS.rowCenter,{marginLeft: scaleSize(53)}]} activeOpacity={.7} onPress={this.onScan}>
					<Image source={require('../../images/xhdpi/btn_ico_more_scan_def.png')} style={styles.imgStyle}/>
					<Text style={[pubS.font26_4,{marginLeft: scaleSize(30)}]}>Scan</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[pubS.rowCenter,{marginLeft: scaleSize(53),marginTop: scaleSize(40)}]} activeOpacity={.7} onPress={this.onCreate}>
					<Image source={require('../../images/xhdpi/btn_ico_more_createaccount_def.png')} style={styles.imgStyle}/>
					<Text style={[pubS.font26_4,{marginLeft: scaleSize(30)}]}>Create account</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	imgStyle: {
		width: scaleSize(28),
		height: scaleSize(28),
	}
})

export default connect(
	state => ({
		accountManageReducer: state.accountManageReducer
	})
)(SwitchWallet)