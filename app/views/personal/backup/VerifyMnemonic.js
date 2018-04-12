import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native'

import { pubS,DetailNavigatorStyle } from '../../../styles/'
import { setScaleText, scaleSize } from '../../../utils/adapter'
import { Btn } from '../../../components/'
import Modal from 'react-native-modal'
import UserSQLite from '../../../utils/accountDB'
const sqLite = new UserSQLite()  
let db  
class VerifyMnemonic extends Component{
	constructor(props){ 
		super(props)
		this.state={
			mnemonicArr: [],
			isEmpty: true,
			selectContentArr: [],
			visible: false
		}
	}
	componentDidMount(){

		// this.props.mnemonicText.sort(function() {
		//     return .5 - Math.random()
		// })
		this.setState({
			mnemonicArr: this.props.mnemonicText
		})
	}
	onSelectItem = (val,selected) => {
		const { selectContentArr } = this.state
		if(selected){
			selectContentArr.push(val)
			this.setState({
				isEmpty: false,
				selectContentArr: selectContentArr
			})
		}else{
			selectContentArr.splice(selectContentArr.indexOf(val),1)
			this.setState({
				isEmpty: false,
				selectContentArr: selectContentArr
			})
		}

	}

	onConfirm = () => {
		const { mnemonicArr, selectContentArr } = this.state
		if(mnemonicArr.toString() === selectContentArr.toString()){
				// Alert.alert(
				// 	'',
				// 	'',
				// 	'',
				// 	[
			 //          {text: 'OK', onPress:() => this.onOk()},
			 //        ],
				// )
			this.setState({
				visible: true
			})
		}else{
			 Alert.alert(
		        '',
		        'Error,try again',
		        [
		          {text: 'OK', onPress:() => {console.log('1')}},
		        ],
		    )
			this.setState({
				selectContentArr: []
			})
		}
	}
	onHide = () => {
		this.setState({
			visible: false,
			selectContentArr: []
		})
	}
	onModalBtn = () => {
		this.onHide()

		if(!db){  
	      db = sqLite.open();  
	    } 
	    db.transaction((tx)=>{  
	      	tx.executeSql("update account set mnemonic = '' where address= ? ", [this.props.currentAddress],(tx,results)=>{  
				this.props.navigator.pop()
	       	})  
	      	},(error)=>{
	        console.error(error)
	    })

	}
    render(){
    	const { isEmpty, mnemonicArr, selectContentArr, visible} = this.state
    	let selected = false
	    return(
	    	<View style={[{flex:1,backgroundColor:'#F5F7FB',alignItems:'center'},pubS.paddingRow35]}>
	    		<View style={[styles.selectViewBox,pubS.center,pubS.paddingRow35]}>
	    			{
	    				isEmpty ? 
	    				<Text style={pubS.font26_5}>Please select the mnemonic you just wrote on the paper</Text>
	    				: 
	    				<Text style={pubS.font28_3}>{selectContentArr.join(" ")}</Text>
	    			}	
	    		</View>

	    		<View style={{flexWrap: 'wrap',marginTop: scaleSize(10),flexDirection:'row',width: scaleSize(680),justifyContent: 'space-around'}}>
	    			{
	    				this.state.mnemonicArr.map((val,index) => {
	    					if(selectContentArr.indexOf(val) !== -1){
	    						selected = false
	    					}else{
	    						selected = true
	    					}
	    					return(
				    			<TouchableOpacity key={index} activeOpacity={.7} onPress={this.onSelectItem.bind(this,val,selected)} style={[styles.selectItem,pubS.center,{backgroundColor: selected ? '#fff' : '#2B8AFF'}]}>
				    				<Text style={ selected ? pubS.font28_3 : pubS.font28_4}>{val}</Text>
				    			</TouchableOpacity>
	    					)
	    				})
	    			}
	    		</View>
		      	<Btn
		      		btnMarginTop={scaleSize(60)}
			        btnPress={this.onConfirm}
			        btnText={'Confirm'}
		      	/>
		      	<Modal
			        isVisible={visible}
			        onBackButtonPress={this.onHide}
			        onBackdropPress={this.onHide}
			        style={styles.modalView}
			        backdropOpacity={.8}
			      >
					 <View style={[{backgroundColor:'#fff',},pubS.center,styles.modalView]}>
					 	<Text style={[pubS.font34_4,{marginTop: -50}]}>Operation successful</Text>
					 	<Text style={[pubS.font26_6,{marginTop: 10}]}>please keep the mnemonic words properly</Text>
					 	<TouchableOpacity activeOpacity={.7} style={[styles.modalBtnStyle,pubS.center]} onPress={this.onModalBtn}> 
					 		<Text style={pubS.font34_3}>Ok</Text>
					 	</TouchableOpacity>
					 </View>
			    </Modal>

	        </View>
	    )
    }
}

const styles = StyleSheet.create({
	modalBtnStyle:{
		height: scaleSize(87),
		borderWidth: StyleSheet.hairlineWidth,
		borderColor:'#E6E6E6',//
		borderBottomLeftRadius: scaleSize(26),
		borderBottomRightRadius: scaleSize(26),
		// backgroundColor:'red',
		width: '100%',
		position:'absolute',
		bottom:0,
	},
	modalView: {
		width: scaleSize(540),
		height: scaleSize(256),
		borderRadius: scaleSize(26),
		alignSelf:'center'
	},
	selectViewBox:{
		height: scaleSize(280),
		width: scaleSize(680),
		backgroundColor:'#fff',
		marginTop: scaleSize(30)
	},
	selectItem: {
		height: scaleSize(80),
		width: scaleSize(200),
		borderRadius: 3,
		marginTop: scaleSize(20)

	},
})
export default VerifyMnemonic