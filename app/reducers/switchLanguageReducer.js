import * as types from '../constants/switchLanguageConstant'
import I18n, { getLanguages } from 'react-native-i18n'
I18n.fallbacks = true

I18n.translations = {
  'en': require('../i18n/en'),
  'ru': require('../i18n/ru'),
  'zh': require('../i18n/zh'),
}

const initState = {
	switchSucc: false,
	langueges: '',
}
export default function switchLanguageReducer(state = initState,action){
	switch(action.type){
		case types.SWITCH_LANGUAGE:
			return onSwitchLang(state,action)
			break
		default:
			return state
			break
	}
}

const onSwitchLang = (state,action) => {
	const { mark } = action.payload
	// I18n.locale = 'zh-CN'
	// I18n.defaultLocale = `${mark}`
    I18n.locale = `${mark}`

    // global.currentLanguege = `${mark}`
	return {
		...state,
		switchSucc: true,
		langueges: mark
	}
}