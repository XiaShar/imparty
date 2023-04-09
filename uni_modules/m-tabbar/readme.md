# m-tabbar自定义


## 使用说明,注意事项（必看）

> 我配套上传了一个案例包，如果不会使用的，建议下载阅读使用

---

> 1、自定义tabbar的情况下，不建议在一个页面内通过几个组件，用v-if切换去模拟各个页面，会存在各种不可控bug

> 如果是`if切换组件`的话，就是一个页面控制多个组件显示隐藏来实现。 如果组件封装的有问题，会出现组件之间的协调问题，请看情况使用。 还有一些原生的交互没有办法达到预期，会影响到原生体验。 比如下拉刷新，滚动加载更多，切换tabbar后滚动位置不能固定等

>2、在pages.json中正常定义tabbar配置和字段，使用`native`模式，组件会自动加载pages.json配置项，并自动判断当前选中项，并自动隐藏原生的tabbar， 但是有个闪烁问题，暂时无解，如果你有好的方案，欢迎指正

> 3、如果出现tabbar不显示，但是控制台无任何报错信息，应该就是样式布局影响了，请自行排查

> 4、因为是自定义导航，所以原生方法是不支持的，只能通过 ref 可以获取到 tabbar 实例并调用插件的实例方法，详细请看页面最下方

---
# 快速使用

## 方式一、Native模式使用

```
// native模式，无需配置其他项
<m-tabbar native></m-tabbar>
```
在各个tabbar页面引入tabbar组件，传入属性`native`，`native`模式下无需任何配置

组件会默认自动通过`uni.hideTabBar()`隐藏系统tabbar


## 方式二、页面使用(current默认从0开始)（强烈推荐）

```
// 普通页面模式
<m-tabbar fixed fill current="1" :tabbar="tabbar"></m-tabbar>
```

配置选项和`uniapp`的配置完全相同，直接复制过来, 默认传入`pagePath`后，直接使用`reLaunch`跳转
插件支持扩展`openType`参数，用户可根据自己情况自行扩展页面打开方式，详细看下方配置

### 1、提取tabbar配置

新建文件config/tabbar.js(默认你有config目录,根据自己情况而定)
```
export default {
	color: "#161616",
	selectedColor: "#161616",
	borderStyle: "black",
	backgroundColor: "#ffffff",
	list: [{
		pagePath: "/pages/index/index",
		iconPath: "/static/tabbar/index.png",
		selectedIconPath: "/static/tabbar/index_active.png",
		text: "首页",
		openType: 'navigate',  //新版本新增，页面被打开方式，默认为reLaunch
		dot: 1 //新版本新增参数，详细看页面最下方使用说明
	}, {
		pagePath: "/pages/shop/index",
		iconPath: "/static/tabbar/shop.png",
		selectedIconPath: "/static/tabbar/shop_active.png",
		text: "门店"
	}, {
		pagePath: "/pages/my/index",
		iconPath: "/static/tabbar/my.png",
		selectedIconPath: "/static/tabbar/my_active.png",
		text: "我的"
	}]
}
```

### 2、引入tabbar
#### VUE2引入
```
import TabbarConfig from '@/config/tabbar.js'
export default {
	data(){
		return {
			tabbar: TabbarConfig
		}
	},
	onLoad(){
		// 没有开启native模式下，使用reLaunch跳转，会存在首页标志，需要隐藏
		#ifdef MP-JD || MP-WEIXIN
		uni.hideHomeButton()
		#endif
	}
}
```

####  VUE3 setup引入
```
import TabbarConfig from '@/config/tabbar.js'
import { reactive } from 'vue'

// 没有开启native模式下，使用reLaunch跳转，会存在首页标志，需要隐藏
#ifdef MP-JD || MP-WEIXIN
uni.hideHomeButton()
#endif

const tabbar = reactive(TabbarConfig)
```

### 3、页面使用
```
<m-tabbar fixed fill current="1" :tabbar="tabbar"></m-tabbar>
```

## 高级用法（beforeChange）（路由守卫）

有些特殊需求，我们在点击一个tabbar其他一项的时候，可能需要判断权限是否可以进入，那么我们在切换前做一下路由拦截`beforeChange`，如果达到自己的预期，就进行跳转

> uniapp 微信小程序不支持$listeners,只能使用prop方式传入, 部分平台不支持prop传入方法，有平台限制，详细请看(问题解答)[https://ask.dcloud.net.cn/question/70659]

### 页面使用传入beforeChange

```
// native模式，无需传入 fixed fill
<m-tabbar native :beforeChange="onBeforeChange"></m-tabbar>

// 普通页面模式
<m-tabbar fixed fill current="1" :tabbar="tabbar" :beforeChange="onBeforeChange"></m-tabbar>
```

### 进行事件判断监听

函数必选参数 next，当判断逻辑执行完毕后，满足条件的情况下执行 `next()`

```
methods: {
	onBeforeChange(next){
		console.log('before page2 switch')
		setTimeout(()=>{
			console.log('switch page2 end')
			next()
		}, 1000)
	}
}
```

## 自定义凸起导航(插槽使用)

```
<m-tabbar native>
	<template v-slot:tabbar_index_1> //插槽详细看文档，样式你自己写
		<view class="custom_style">
			<view class="custom_style_icon">+</view>
		</view>
	</template>
</m-tabbar>
<style lang="scss">
	.custom_style{
		color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		&_icon{
			background-color: #15357A;
			font-size: 80rpx;
			width: 120rpx;
			height: 120rpx;
			border-radius: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: -40rpx;
		}
	}
</style>
```

### 属性说明(Native模式)

| 属性名 | 类型 | 默认值 | 必填 | 说明 |
| ------- | ------- | ------- | ------- | ------- |
|  zIndex       |   Number,String       |    999    |    否     |  当前处于z-index层级  | 
|  native  |  Boolean       |    false    |       否       | native模式，当前页面是系统原生tabbar页面(pages.json里面配置了tabBar)  | 
|  beforeChange  |  Function       |    null    |    否     | 导航切换前事件hooks,用于判断点击tabbar的时候，可以先执行自己定义的事件，达到预期后在跳转（类似router的路由守卫）,方法需要调用next参数回调，部分平台不支持，存在兼容性 | 
|  tabbarHeight  |  Number,String       |    100    |    否     | 默认tabbar高度，有些时候你可能想控制tabbar高度（没啥用,如果非要更改,布局有影响,请使用样式覆盖） |

### 属性说明(普通模式)

| 属性名 | 类型 | 默认值 | 必填 | 说明 |
| ------- | ------- | ------- | ------- | ------- |
|  current       |  Number,String       |    0    |    是     |  默认选中第几项,0开始  | 
|  tabbar       |  Object       |    {}    |    是    |  tabbar配置项(新增dot参数,详细看下方使用说明)  | 
|  fixed       |  Boolean       |    false    |    否     |  是否定位在底部  | 
|  fill       |  Boolean       |    false    |    否     |  是否填充底部高度（如果开启fixed后，会出现tabbar遮盖内容问题，开启此属性，会自动填充高度，可单独使用）   | 
|  safeBottom  |  Boolean       |    true    |    否     | 是否自动规避iphoneX\XR等底部安全距离   | 
|  zIndex       |   Number,String       |    999    |    否     |  当前处于z-index层级  | 
|  beforeChange  |  Function       |    null    |    否     | 导航切换前事件hooks,用于判断点击tabbar的时候，可以先执行自己定义的事件，达到预期后在跳转（类似router的路由守卫）,方法需要调用next参数回调，部分平台不支持，存在兼容性 | 
|  tabbarHeight  |  Number,String       |    100    |    否     | 默认tabbar高度，有些时候你可能想控制tabbar高度（没啥用,如果非要更改,布局有影响,请使用样式覆盖） | 

### openType对应值(默认reLaunch跳转)

| 方法名 | 返回值说明 |
| ------- | ------- | 
|  navigate       |  [对应navigateTo](https://uniapp.dcloud.io/api/router?id=navigateto)    | 
|  redirect       |  [对应redirectTo](https://uniapp.dcloud.io/api/router?id=redirectto)    |  
|  reLaunch       |  [对应reLaunch](https://uniapp.dcloud.io/api/router?id=relaunch)    |  
|  switchTab       |  [对应switchTab](https://uniapp.dcloud.io/api/router?id=switchtab) 注意此方法需要你有原生tabbar，比如内页使用了自定义导航，想回tabbar的指定页面    |  
|  navigateBack       |  [对应navigateBack](https://uniapp.dcloud.io/api/router?id=navigateback) 只能后退一步   |  

### 方法说明

| 方法名 | 返回值说明 |
| ------- | ------- | 
|  click       |  当前选中index,无论什么情况下都会先触发click事件，方便自由定制更多方法    | 
|  change       |  当前选中index(beforeChange会在change之前执行，只有执行next才会返回)    | 

### 插槽 (注意Vue3存在跨断不兼容问题)

| 插槽名 | 返回值说明 |
| ------- | ------- | 
|  tabbar_index_{index}       |  插槽名字为tabbar_index_你要变化的index, 可以做到任意控制自己的导航，比如中心凸起，比如你想让第一个变化，index就是0，比如你tabbarList里面有5个item,你想让中间的凸起，那么index就是2，取下标   | 

### 方法 (通过 ref 可以获取到 tabbar 实例并调用实例方法)

> 注意，由于是使用了自定义，所以原生的方法是不能使用的，只能通过 ref 可以获取到 tabbar 实例并调用实例方法，目前只有下面4个方法，而且方法是没有`success,fail,complete`回掉的，考虑到跨平台型，如果原生方法有平台差异，插件也是不考虑支持的

| 事件名 | 参数 |  参数说明|
| ------- | ------- | ------- | 
|  setTabBarBadge   |   object  |  [为 tabBar 某一项的右上角添加文本](https://uniapp.dcloud.io/api/ui/tabbar?id=settabbarbadge)  |
|  setTabBarItem   |   object  |  [动态设置 tabBar 某一项的内容](https://uniapp.dcloud.io/api/ui/tabbar?id=settabbaritem)  |
|  reLoad      |    无  |  有特殊情况下，你可能需要调用重新载入tabbar，基本没啥用  |
|  showTabBar      |    无  |  显示tabbar，默认显示，无动画效果  |
|  hideTabBar      |    无  |  隐藏tabbar，无动画效果  |


```
//页面调用组件添加ref
<m-tabbar ref="tabbar" native></m-tabbar>
// setTabBarBadge ,为 tabBar 某一项的右上角添加文本
this.$refs.tabbar.setTabBarBadge({
  index: 0,
  text: '10'
})

//setTabBarItem 动态设置 tabBar 某一项的内容
this.$refs.tabbar.setTabBarBadge({
  index: 0,
  text: 'text',
  pagePath: 'newPagePath', 
 //插件新增pagePath，注意native模式下，如果更改了pagePath,可能存在选中项自动选中失败问题
  iconPath: '/path/to/iconPath',
  selectedIconPath: '/path/to/selectedIconPath'
})

//如果直接在onload或者onshow等组件还在加载中的特殊情况下，由于加载比较慢，
// 方法可能会失效，建议放在nextTick函数里面
this.$nextTick(()=>{
	this.$refs.tabbar.setTabBarBadge({
	  index: 0,
	  text: '10'
	})
})
```

tabbarConfig参数新增dot配置项，可以单独配置每一项的右上角角标，可传入任意类型，不显示为空即可或者不填写， 默认为红色，如果想更改样式，请使用样式覆盖`m-tabbar__badge`
```
list: [{
		pagePath: "/pages/index/index",
		iconPath: "/static/tabbar/index.png",
		selectedIconPath: "/static/tabbar/index_active.png",
		text: "首页",
		dot: 1
	}, {
		pagePath: "/pages/shop/index",
		iconPath: "/static/tabbar/shop.png",
		selectedIconPath: "/static/tabbar/shop_active.png",
		text: "门店",
		dot: ''
	}, {
		pagePath: "/pages/my/index",
		iconPath: "/static/tabbar/my.png",
		selectedIconPath: "/static/tabbar/my_active.png",
		text: "我的",
		dot: ''
	}]
```


### 目前已知问题

- 1、在全局加样式 filter: grayscale(1) 后，tabbar组件的fixed样式失效，排版在页面最底部（无法修复）
- 2、微信小程序native模式首次进入的时候，底部tabbar会闪动一下（无法修复） 建议全局页面做一个延迟加载效果，等全部加载完成后，在显示


### 插件写的时候，没办法照顾到所有平台，欢迎点评指正，如有问题欢迎给我留言

#### 例如：
```
设备：iphone13 
系统: ios13 
使用环境平台： 微信小程序、app
使用vue版本 ：vue3
问题描述: 提示什么什么错误
```