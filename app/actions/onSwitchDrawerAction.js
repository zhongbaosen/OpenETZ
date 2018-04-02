import {  ON_SWITCH_DRAWER } from  '../constants/onSwitchDrawerConstant'
const onSwitchDrawerAction = (status) => {
	const onSwitch = () => {
		return {
			type: ON_SWITCH_DRAWER,
			payload: {
				status,
			}
		}
	}
	return(dispatch,getState) => {
		dispatch(onSwitch())
	}
}
export {
	onSwitchDrawerAction
}