import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'

import { pubS,DetailNavigatorStyle } from '../../../styles/'
import { setScaleText, scaleSize } from '../../../utils/adapter'
import { switchLanguageAction } from '../../../actions/switchLanguageAction'
import { connect } from 'react-redux' 
import { toSplash } from '../../../root' 
import I18n from 'react-native-i18n'

class Language extends Component {
	constructor(props){
		super(props)
		this.state={
			
		}
		
	}

	render(){
		const { languageText, isSelected,onSelect } = this.props
		return(
			<View style={[styles.lanViewStyle,pubS.rowCenterJus,pubS.paddingRow40]}>
				<Text style={pubS.font28_3}>{languageText}</Text>
				<TouchableOpacity style={[styles.selectIcon,pubS.center,{borderWidth: isSelected?0:1,borderColor: isSelected?'transparent':'#CACDD2',backgroundColor:isSelected?'#2B8AFF':'#fff'}]} activeOpacity={.7} onPress={onSelect}>
               		<Image source={require('../../../images/xhdpi/btn_ico_addassets_pre.png')} style={styles.selectImage}/>
           	   </TouchableOpacity>
			</View>
		)
	}
}

class SwitchLanguage extends Component{
  constructor(props){
  	super(props)
  	this.state={
  		selectedLan: '',
  		select_zh: false,
  		select_en: true,
  		select_ru: false,
  		languages: ''
  	}
  	this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  	onNavigatorEvent(event){
	    if (event.type == 'NavBarButtonPress') {
	    	if(event.id === 'save_switch_language'){
	    		localStorage.save({
	    			key: 'lang',
	    			expires: null,
	    			data:{
	    				selectedLan: this.state.selectedLan
	    			}
	    		})

				this.props.dispatch(switchLanguageAction(this.state.selectedLan))

				toSplash()
	    	}
	  	}
	}
	componentWillMount(){
  		localStorage.load({
  			key:'lang',
  			autoSync: true,
  		}).then( ret => {
  			switch(ret.selectedLan){
  				case 'zh-CN':
  					this.onSelectZh()
  					break
  				case 'en-US':
  					this.onSelectEn()
  					break
  				case 'ru-RU':
  					this.onSelectRu()
  					break
  				default:
  					break
  			}
  		}).catch( err => {

  		})
  	}

	onSelectZh = () => {
		if(!this.state.select_zh){
			this.setState({
				select_zh: true,
		  		select_en: false,
		  		select_ru: false
			},() => {
				this.setState({
					selectedLan: 'zh-CN'
				})
			})
		}
	}
	onSelectEn = () => {
		if(!this.state.select_en){
			this.setState({
				select_zh: false,
		  		select_en: true,
		  		select_ru: false
			},() => {
				this.setState({
					selectedLan: 'en-US'
				})
			})
		}
	}
	// onSelectRu = () => {
	// 	if(!this.state.select_ru){
	// 		this.setState({
	// 			select_zh: false,
	// 	  		select_en: false,
	// 	  		select_ru: true
	// 		},() => {
	// 			this.setState({
	// 				selectedLan: 'ru-RU'
	// 			})
	// 		})
	// 	}
	// }
  	render(){
  		const { select_zh, select_en, select_ru, } = this.state
	    return(
	      <View style={{flex:1,backgroundColor: '#F5F7FB'}}>
	      	<Language
	      		languageText={'简体中文'}
	      		isSelected={select_zh}
	      		onSelect={this.onSelectZh}
	      	/>
	      	<Language
	      		languageText={'English'}
	      		isSelected={select_en}
	      		onSelect={this.onSelectEn}
	      	/>
	      	{
		      	// <Language
		      	// 	languageText={'Русский язык'}
		      	// 	isSelected={select_ru}
		      	// 	onSelect={this.onSelectRu}
		      	// />
	      	}
	      </View>
	    )
  	}
}

const styles = StyleSheet.create({
	lanViewStyle:{
		height: scaleSize(120),
		width: scaleSize(750),
		backgroundColor:'#fff',
		borderTopWidth:StyleSheet.hairlineWidth,
		borderColor:'#EEEEEE',
	},
	selectImage:{
	    height: scaleSize(40),
	    width: scaleSize(40),
	    zIndex: 1000,
	},
	selectIcon: {
	    height: scaleSize(40),
	    width: scaleSize(40),
	    borderRadius: 1000,  
	},
})
export default connect(
	state => ({
		switchLanguageReducer: state.switchLanguageReducer
	})
)(SwitchLanguage)