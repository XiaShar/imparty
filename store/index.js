import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		footerTabbar: [{
				iconPath: require('@/static/c1.png'),
				selectedIconPath: require('@/static/c1.png'),
				text: '活动',
				customIcon: false,
				pagePath: '/pages/activity/index/index'
			},
			{
				iconPath: require('@/static/c2.png'),
				selectedIconPath: require('@/static/c2.png'),
				text: '我的',
				customIcon: false,
				pagePath: '/pages/profile/index/index'
			}
		],
	},
	mutations: {},
	actions: {}
})
export default store