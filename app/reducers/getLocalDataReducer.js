import { GET_LOCAL_KEY_STORE } from '../constants/getLocalDataConstant'

const initState = {
	localKeyStore: { },
	userName: ''
}
export default function getLocalDataReducer (state = initState,action) {
	switch(action.type){
		case 'GET_LOCAL_KEY_STORE':
			return getLodal(state,action)
			break
		default:
			return state
			break

	}
}
const getLodal = (state,action) => {
	const { keyStore,name } = action.payload
	return {
		...state,
		localKeyStore: keyStore,
		userName: name
	}
}