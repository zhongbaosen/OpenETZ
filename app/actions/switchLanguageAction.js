import * as types from '../constants/switchLanguageConstant'
const switchLanguageAction = (mark) => {
	const onSwitch = () => {
		return {
			type: types.SWITCH_LANGUAGE,
			payload: {
				mark
			}
		}
	}
	return (dispatch,getState)=>{
		dispatch(onSwitch())
	}
} 
export {
	switchLanguageAction
}