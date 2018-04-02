
import { ON_SWITCH_DRAWER } from '../constants/onSwitchDrawerConstant'

const initState = {
	drawerStatus: 0
}
export default function onSwitchDrawerReducer (state = initState,action) {
	switch(action.type){
		case 'ON_SWITCH_DRAWER':
			return onSwitch(state,action)
			break
		default:
			return state
			break

	}
}
const onSwitch = (state,action) => {
	const { status } = action.payload
	return {
		...state,
		drawerStatus:status
	}
}