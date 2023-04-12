<template>
	<view class="bg" style="transform: translate(-400rpx,-400rpx);"></view>
	<view class="bg" style="transform: translate(500rpx,900rpx);"></view>

	<view>
		<view class="line" style="transform: translateY(0rpx);"></view>
		<view class="section">
			{{ title }}
		</view>
		<view style="display: flex; justify-content: center;" v-if="empty">
			<text>这里还没有你报名过的活动奥\n如结果异常可以下拉刷新ovo</text>
		</view>
		<!-- 这里是进行中的活动 -->
		<view v-for="(item,index) in showData" :key="item._id">


			<uni-card @click="showDetail(item)">
				<view class="uni-card">
					<view>
						<h3>{{item.title}}</h3>
						<view class="tag">
							<!-- 这里是活动的actag -->
							<text v-for="(itemtag,indextag) in item.actag" :key="indextag">{{itemtag}}</text>
						</view>
						<text>{{item.ddl}}</text>
					</view>
					<view class="rightCard">
						<image src="../../static/1.png" style="width: 100rpx; height: 130rpx;"></image>
						<text
							style="width: 100rpx;overflow: hidden;text-overflow: clip;;white-space: nowrap;">联合活动</text>
					</view>
				</view>
			</uni-card>


		</view>
	
	</view>
</template>

<script>
	import {
		store,
		mutations
	} from '@/uni_modules/uni-id-pages/common/store.js'


	let scene = ""

	export default {
		components: {},
		data() {
			return {
				//渲染数据
				showData: [],
				// cover: 'https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
				title:"",
				extraIcon: {
					color: '#4cd964',
					size: '22',
					type: 'gear-filled'
				},
				empty:false
			}
		},
		methods: {
			showDetail(item) {
				uni.navigateTo({
					"url": `../activeDetail/activeDetail?_id=${item._id}`
				})
			},
			onClick(e) {
				uni.navigateTo({
					url: '../formPage/formPage'
				});
			},
			actionsClick(text) {
				uni.showToast({
					title: text,
					icon: 'none'
				})
			},
			getTitle(){
				return 'qaq'
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			//console.log(option._id)
			scene = option.scene
		},
		mounted() {
			if(scene === 'will')this.title = '即将开始'
			if(scene === 'now') this.title = '正在进行中'
			if(scene === 'end') this.title = '已结束'
			uniCloud.callFunction({
				name: 'getMyActivity',
				data: {
					_id: store.userInfo._id,
				},
			}).then((res) => {
				this.showData = res.result
				this.showData = this.showData.filter((item)=>{
					return item.isdoing === scene
				})
				if(this.showData.length === 0) this.empty = true
			}).catch((err) => {
				console.error(err)
			})
		},
		onPullDownRefresh() {
			uniCloud.callFunction({
				name: 'getMyActivity',
				data: {
					_id: store.userInfo._id,
				},
			}).then((res) => {
				this.showData = res.result
				this.showData = this.showData.filter((index,item)=>{
					return item.isdoing === scene
				})
				// console.log(this.showData)
			}).catch((err) => {
				console.error(err)
			})
		}
	}
</script>

<style>
	.uni-card {
		display: flex;
		justify-content: space-between;
		border-radius: 20rpx;
	}

	.tag {

		display: flex;
		align-items: center;
	}

	.tag text {
		border-radius: 8rpx;
		padding: 2rpx;
		padding-left: 8rpx;
		padding-right: 8rpx;
		font-size: 22rpx;
		background-color: rgba(220, 220, 220, 0.5);
		margin: 20rpx;
		margin-left: 0;
	}

	.rightCard {
		position: absolute;
		width: 100rpx;
		right: 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		height: 100%;

	}

	.rightCard img {
		width: 100rpx;
		height: 130rpx;
		object-fit: fill;
	}

	.line {
		position: relative;
		right: -25rpx;
		background-color: gray;
		height: 1px;
		width: 700rpx;
		margin-top: 50rpx;
		margin-bottom: 20rpx;
	}

	.section {
		margin-left: 30rpx;
		font-family: "myfont";
		font-size: 40rpx;
	}

	.bg {
		position: fixed;

		width: 800rpx;
		height: 800rpx;
		background-color: #FCA464;
		z-index: -1;
		border-radius: 100%;
	}
</style>