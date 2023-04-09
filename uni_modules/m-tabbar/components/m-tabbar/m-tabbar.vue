<template>
	<view class="m-tabbar-box" :style="tabbarBoxStyle" v-if="isShowTabBar">
		<view class="m-tabbar__fill" v-if="fill || native" :class="{'m-tabbar__safe': (safeBottom || native)}"
			:style="tabbarFillStyle"></view>
		<view id="m-tabbar" class="m-tabbar"
			:class="{'fixed': (fixed || native), 'm-tabbar__safe': (safeBottom || native)}" :style="tabbarStyle">
			<view class="m-tabbar__border" v-if="borderStyle === 'black' "></view>
			<view class="m-tabbar__flex">
				<view @click="tabChange(index)" v-for="(item, index) in tabbarList" :key="index" class="m-tabbar__item"
					:class="{
						'm-tabbar__item__active': index === currentIndex,
					}">
					<slot :name="`tabbar_index_${index}`">
						<view class="m-tabbar__icon">
							<view class="m-tabbar__badge" v-if="item.dot">{{item.dot}}</view>
							<image :src="currentIndex === index ? item.selectedIconPath : item.iconPath"
								class="m-tabbar__icon_img" />
						</view>
						<view class="m-tabbar__label"
							:style="{'color': index === currentIndex ? tabbarConfig.selectedColor : tabbarConfig.color }">
							{{ item.text }}
						</view>
					</slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const obj2strStyle = (obj) => {
		let style = ''
		for (let key in obj) {
			style += `${key}:${obj[key]};`
		}
		return style
	}

	const padFirstSymbol = (str, smb) => {
		if (str.startsWith(smb) || str.startsWith('http')) {
			return str
		}
		return `/${str}`
	}

	const replaceTabbarList = (list) => {
		if (!list.length > 0) {
			return []
		}
		return list.map(item => {
			if (item.iconPath) {
				item.iconPath = padFirstSymbol(item.iconPath, '/')
			}
			if (item.pagePath) {
				item.pagePath = padFirstSymbol(item.pagePath, '/')
			}
			if (item.selectedIconPath) {
				item.selectedIconPath = padFirstSymbol(item.selectedIconPath, '/')
			}
			return item
		})
	}

	import PageConfig from '@/pages.json'
	export default {
		emits: ['change', 'click'],
		props: {
			current: {
				type: [Number, String],
				default: 0
			},
			tabbar: {
				type: Object,
				default () {
					return {}
				}
			},
			fixed: {
				type: Boolean,
				default: false
			},
			fill: {
				type: Boolean,
				default: false
			},
			zIndex: {
				type: [Number, String],
				default: 9999
			},
			native: {
				type: Boolean,
				default: false
			},
			safeBottom: {
				type: Boolean,
				default: true
			},
			beforeChange: {
				type: Function,
				default: null
			},
			tabbarHeight: {
				type: [Number, String],
				default: 100
			}
		},
		data() {
			return {
				isShowTabBar: false,
				currentIndex: 0,
				beforeData: {},
				reload: false
			}
		},
		watch: {
			current(val) {
				this.currentIndex = val * 1
			}
		},
		computed: {
			tabbarConfig() {
				const {
					native,
					reload
				} = this
				if (reload) {}
				if (native) {
					const {
						tabBar
					} = PageConfig
					if (!tabBar) {
						console.error('Native mode, Pages.json no tabbar config')
						return {
							borderStyle: 'black',
							list: []
						}
					}
					return tabBar
				}
				return this.tabbar
			},
			tabbarList() {
				const {
					reload
				} = this
				const {
					list
				} = this.tabbarConfig
				if (reload) {}
				if (list) {
					return replaceTabbarList(list)
				}
				console.error('No tabbar config')
				return []
			},
			borderStyle() {
				const {
					reload
				} = this
				const {
					borderStyle
				} = this.tabbarConfig
				if (reload) {}
				return borderStyle
			},
			tabbarBoxStyle() {
				const {
					zIndex,
					reload
				} = this
				if (reload) {}
				return obj2strStyle({
					'z-index': zIndex,
				})
			},
			tabbarFillStyle() {
				const {
					tabbarHeight,
					safeBottom,
					reload
				} = this
				if (reload) {}
				return obj2strStyle({
					'height': `${tabbarHeight}rpx`
				})
			},
			tabbarStyle() {
				const {
					tabbarHeight,
					reload
				} = this
				const {
					backgroundColor
				} = this.tabbarConfig
				if (reload) {}
				return obj2strStyle({
					'height': `${tabbarHeight}rpx`,
					'background-color': backgroundColor || '#fff',
				})
			},
			tabbarItemStyle() {
				const {
					currentIndex,
					reload
				} = this
				const {
					color,
					selectedColor
				} = this.tabbarConfig
				if (reload) {}
				return obj2strStyle({
					'color': currentIndex ? selectedColor : color
				})
			}
		},
		mounted() {
			this.initTabbar()
		},
		methods: {
			initTabbar() {
				const {
					current,
					fill,
					native,
					tabbarList
				} = this
				this.currentIndex = current * 1
				if (native) {
					const currentPage = `/${getCurrentPages()[0].route}`
					const currentIndex = tabbarList.findIndex(item => item.pagePath === currentPage)
					this.currentIndex = currentIndex
					if (tabbarList.length > 0) {
						uni.hideTabBar()
					}
				}
				setTimeout(() => {
					this.isShowTabBar = true
				})
			},
			reLoad() {
				this.reload = true
				setTimeout(() => {
					this.reload = false
				})
			},
			checkMaxIndex(index) {
				if (!this.tabbarConfig.list[index]) {
					console.error('Max tabbar index')
					return false
				}
				return true
			},
			setTabBarBadge(obj) {
				const {
					index,
					text
				} = obj
				if (this.checkMaxIndex(index)) {
					this.tabbarConfig.list[index].dot = text
					this.reLoad()
				}
			},
			setTabBarItem(obj) {
				const {
					index,
					text,
					pagePath: newPagePath,
					iconPath,
					selectedIconPath
				} = obj
				const {
					pagePath: oldPagePath
				} = this.tabbarConfig.list[index]
				if (this.checkMaxIndex(index)) {
					this.tabbarConfig.list[index] = {
						pagePath: newPagePath ? newPagePath : oldPagePath,
						text,
						iconPath,
						selectedIconPath
					}
					this.reLoad()
				}
			},
			showTabBar() {
				this.isShowTabBar = true
			},
			hideTabBar() {
				this.isShowTabBar = false
			},
			tabChange(index) {
				const {
					currentIndex
				} = this
				this.$emit('click', index)
				if (index === currentIndex) {
					return
				}
				this.beforeData = {
					newIndex: index,
					oldIndex: currentIndex,
					next: this.jumpPage
				}
				if (this.beforeChange) {
					this.beforeChange(this.jumpPage)
				} else {
					this.jumpPage()
				}
			},
			jumpPage() {
				const {
					native,
					beforeData,
					tabbarList: list
				} = this
				const {
					newIndex: index
				} = beforeData
				const {
					pagePath: url,
					openType
				} = list[index]
				if (url) {
					if (native) {
						uni.switchTab({
							url
						})
					} else {
						if (openType !== 'navigate') {
							this.currentIndex = index
						}
						switch (openType) {
							case 'navigate':
								uni.navigateTo({
									url
								})
								break;
							case 'redirect':
								uni.redirectTo({
									url
								})
								break;
							case 'reLaunch':
								uni.reLaunch({
									url
								})
								break;
							case 'switchTab':
								uni.switchTab({
									url
								})
								break;
							case 'navigateBack':
								uni.navigateBack({
									delta: 1
								})
								break;
							default:
								uni.reLaunch({
									url
								})
						}
					}
				}
				this.$emit('change', index)
			}
		}
	};
</script>

<style lang="scss" scoped>
	.m-tabbar-box {
		position: relative;
		z-index: 9999;
	}

	.m-tabbar {
		position: relative;

		&.fixed {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100vw;
		}

		&__safe {
			padding-bottom: env(safe-area-inset-bottom);
		}
	}

	.m-tabbar__fill {
		pointer-events: none;
		opacity: 0;
	}

	.m-tabbar__flex {
		display: flex;
		flex-direction: row;
	}

	.m-tabbar__border {
		background-color: rgba(0, 0, 0, 0.33);
		width: 100%;
		height: 1rpx;
		transform: scaleY(0.5);
	}

	.m-tabbar__item {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
		padding: 4px 0 2px;
	}

	.m-tabbar__icon {
		width: 48rpx;
		height: 48rpx;
		margin-bottom: 6rpx;
		position: relative;

		&_img {
			display: block;
			width: 100%;
			height: 100%;
		}

		.m-tabbar__badge {
			color: #fff;
			background-color: #f00;
			border-radius: 20rpx;
			font-size: 22rpx;
			position: absolute;
			right: -25rpx;
			left: 40rpx;
			padding: 2rpx 0;
			width: 100%;
			text-align: center;
			white-space: nowrap;
		}
	}

	.m-tabbar__label {
		font-size: 24rpx;
	}
</style>
