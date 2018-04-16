import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView
} from 'react-native'

import { pubS,DetailNavigatorStyle } from '../../styles/'
import { setScaleText, scaleSize } from '../../utils/adapter'
import { connect } from 'react-redux'
import { Loading } from '../../components/'
import { getAssetsListAction,deleteSelectedToListAction, addSelectedToListAction } from '../../actions/tokenManageAction'
import TokenSQLite from '../../utils/tokenDB'
const tkSqLite = new TokenSQLite()
let tk_db
import I18n from 'react-native-i18n'
class AddAssets extends Component{
  constructor(props){
    super(props)
    this.state={
      assetsList: [],
      selectedContainer: []
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  componentWillMount(){
    // this.props.dispatch(getAssetsListAction())
    const { selectedContainer } = this.state 
    if(!tk_db){
       tk_db = tkSqLite.open()
    }
    
    tk_db.transaction((tx) => {
       tx.executeSql(" select * from token ",[], (tx,results)=>{
          let len = results.rows.length,
              resArr = [];
          for(let i = 0; i < len; i ++){
            resArr.push(results.rows.item(i)) 
          } 
          console.log('resArr===',resArr)
          this.setState({
            assetsList: resArr
          })

          this.state.assetsList.map((val,index) => {
            if(val.tk_selected === 1){
              selectedContainer.push(val.tk_address)
              this.setState({
                selectedContainer
              })
            }
          })

       },error => {
        console.error('search token error',error)
       })
    })
  }
  onNavigatorEvent(event){
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'search_token') {
        alert('search_token')
      }
    }
  }

  onPressSelect = (addr,selected) => {
    const { selectedContainer,assetsList } = this.state
    if(selected){//取消选中
      selectedContainer.splice(selectedContainer.indexOf(addr),1)
      this.setState({
        selectedContainer
      })
      this.props.dispatch(deleteSelectedToListAction(addr,assetsList))

    }else{//选中
      selectedContainer.push(addr)
      this.setState({
        selectedContainer
      })
      this.props.dispatch(addSelectedToListAction(addr,assetsList))
    }

    // assetsList.map((val,index) => {
    //   if(val.tk_address === selectedContainer[index]){
    //     this.props.dispatch(selectedTokenListAction(val))
    //   }
    // })
  }

  render(){
    let selected = false
    // const { assetsList,isLoading } = this.props.tokenManageReducer
    const { selectedContainer,assetsList } = this.state
    // console.log('资产列表',assetsList)
    return(
      <View style={{flex:1,backgroundColor:'#F5F7FB'}}>

        <View style={[styles.listItemView,styles.whStyle]}>
          <Image source={require('../../images/xhdpi/etz_logo.png')} style={pubS.logoStyle}/>
          <View style={[styles.listItemTextView,pubS.rowCenterJus]}>
            <View>
              <Text style={pubS.font36_2}>ETZ</Text>
              <Text style={pubS.font24_2}>EtherZero</Text>
            </View>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {
            assetsList.map((res,index) => {
              if(selectedContainer.indexOf(res.tk_address) !== -1){
                selected = true
              }else{
                selected = false
              }
              return(
                <View style={[styles.listItemView,styles.whStyle]} key={index}>
                  <Image source={require('../../images/xhdpi/etz_logo.png')} style={pubS.logoStyle}/>
                  <View style={[styles.listItemTextView,pubS.rowCenterJus]}>
                    <View>
                      <Text style={pubS.font36_2}>{res.tk_symbol}</Text>
                      <Text style={pubS.font24_2}>{res.tk_name}</Text>
                    </View>
                    <TouchableOpacity style={[styles.selectIcon,pubS.center,{borderWidth: selected?0:1,borderColor: selected?'transparent':'#CACDD2',backgroundColor:selected?'#2B8AFF':'#fff'}]} activeOpacity={.7} onPress={this.onPressSelect.bind(this,res.tk_address,selected)}>
                      {
                        selected ? 
                        <Image source={require('../../images/xhdpi/btn_ico_addassets_pre.png')} style={styles.selectImage}/>
                        : null
                      }
                    </TouchableOpacity>
                  </View>
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  
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
  listItemView:{
    backgroundColor:'#fff',
    paddingLeft: scaleSize(22),
    paddingRight: scaleSize(22),
    justifyContent:'center',
    flexDirection:'row',
    borderRadius: 4,
    alignSelf:'center',
    marginTop: scaleSize(20),
  },
  whStyle: {
    height: scaleSize(120),
    width: scaleSize(702),
  },
  listItemTextView:{
    width: scaleSize(618),
    marginLeft:scaleSize(18),
    paddingTop: scaleSize(15),
    paddingBottom: scaleSize(22),
    // borderColor:'red',
    // borderWidth:1,
  },
})

export default connect(
  state => ({
    tokenManageReducer: state.tokenManageReducer
  })
)(AddAssets)
