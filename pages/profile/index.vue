<template>
	<view>
		<view class="colorBg">
		</view>

		<view class="container">
			<view class="icon">
				<uni-id-pages-avatar width="100rpx" height="100rpx"></uni-id-pages-avatar>
			</view>
			<view class="title-area">
				<view class="name" v-if="!userInfo.nickname">
					点击右侧登录
				</view>
				<view class="name">
					{{ userInfo.nickname }}
				</view>
				<view class="detail">
					{{ userInfo.school }}
				</view>
			</view>
			<view class="edit-icon" @click="editInfo()">
				<image src="@/static/edit.png" style="width: 55rpx; height: 55rpx;"></image>
			</view>
		</view>
		
		<view class="cards" style="position: relative; top: 300rpx;">
			<uni-card style="border-radius:20px;">
					<view class="title">
						我的活动
					</view>
					<view class="actList">
						<button @click="showMyActivity('will')">
							<image :src="icon.pre" style="width: 80rpx; height: 50%;"></image>
							<view style="font-size: 25rpx;">已预约</view>
						</button>
						<button @click="showMyActivity('now')">
							<image :src="icon.ing" style="width: 80rpx; height: 50%;"></image>
							<view style="font-size: 25rpx;">进行中</view>
						</button>
						<button @click="showMyActivity('end')">
							<image :src="icon.ed" style="width: 80rpx; height: 50%;"></image>
							<view style="font-size: 25rpx;">已结束</view>
						</button>
					</view>
			</uni-card>
			
			<uni-card style="border-radius: 20px;">
				<view class="myAct">
					<view class="title">
						更多机遇尽在Vulpecula
					</view>
					<view style="font-size: 25rpx;">
						查看更多相关信息
					</view>
				</view>
			</uni-card>
			
			<uni-card style="border-radius: 20px;">
				<view class="myAct">
					<view class="title">
						拓展功能
					</view>
					<view class="settingList">
						<button id="test">
							<view class="item">
								<view style="display: flex;">
									<image :src="icon.info" style="width: 50rpx;height: 50rpx;transform: translate(-10rpx,20rpx);"></image>
									<view style="font-size: 35rpx;">信息管理</view>
								</view>
								<image :src="icon.rightArrow" style="width: 30rpx;height: 30rpx;transform: translate(0,25rpx);"></image>
							</view>
						</button>
						<button>
							<view class="item">
								<view style="display: flex;">
									<image :src="icon.setting" style="width: 50rpx;height: 50rpx;transform: translate(-10rpx,20rpx);"></image>
									<view style="font-size: 35rpx;">设置</view>
								</view>
								<image :src="icon.rightArrow" style="width: 30rpx;height: 30rpx;transform: translate(0,25rpx);"></image>
							</view>
						</button>
						<button>
							<view class="item">
								<view style="display: flex;">
									<image :src="icon.about" style="width: 50rpx;height: 50rpx;transform: translate(-10rpx,20rpx);"></image>
									<view style="font-size: 35rpx;">关于我们</view>
								</view>
								<image :src="icon.rightArrow" style="width: 30rpx;height: 30rpx;transform: translate(0,25rpx);"></image>
							</view>
						</button>
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

	const uniIdCo = uniCloud.importObject("uni-id-co")

	export default {
		data() {
			return {
				icon1: "../../static/preAct.png",
				icon:{
					pre:"../../static/preAct.png",
					ing:"../../static/acting.png",
					ed:"../../static/endAct.png",
					info:"../../static/info.png",
					setting:"../../static/setting.png",
					about:"../../static/about.png",
					rightArrow:"../../static/rightArrow.png"
				}
			}
		},
		computed: {
			userInfo() {
				return store.userInfo
			}
		},
		methods: {
			toLogin() {
				uni.navigateTo({
					url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
				})
			},

			editInfo() {
				if (uniCloud.getCurrentUserInfo().uid === null) {
					uni.navigateTo({
						url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
					})
				} else {
					uni.navigateTo({
						url: "./editingView"
					})
				}
			},
			
			showMyActivity(goal){
				uni.navigateTo({
					url:`./myActivity?scene=${goal}`
				})
			}
		}
	}
</script>

<style>
	.colorBg {
		position: absolute;
		top: 0;
		left: 0;
		height: 400rpx;
		width: 100%;
		background-color: #FCA464;
	}

	.container {
		position: absolute;
		top: 120rpx;
		width: 100%;
		height: 200rpx;
		overflow-x: hidden;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.icon {
		position: absolute;
		left: 50rpx;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		overflow: hidden;
		border: 10rpx solid rgba(255, 255, 255, 0.6);
	}

	.icon img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.title-area {
		font-family: "myfont";
		color: white;
		position: relative;
		left: -80rpx;
	}

	.name {
		font-size: 35rpx;
		font-weight: 600;
	}

	.detail {
		font-size: 25rpx;
	}

	.edit-icon {
		position: absolute;
		right: 50rpx;
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.edit-icon img {
		width: 60%;
		height: 60%;
	}

	/* 	.actCard{
		position: absolute;
		top: 270rpx;
		border-radius: 5px;
	}
	 */
	.title {

		color: rgba(0, 0, 0, 0.8);
		font-size: 40rpx;
		font-weight: 800;
		margin-bottom: 40rpx;
	}

	.actList {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 160rpx;
	}


	.actList view {
		position: relative;
		top: -15rpx;
		font-family: "myfont";
	}

	button {
		width: 200rpx;
		height: 170rpx;
		background-color: rgba(0, 0, 0, 0);
	}

	button::after {
		border: none;
	}

	.settingCard {
		border-radius: 5px;
		position: absolute;
		top: 800rpx;
		width: 100%;
	}

	.settingList {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		width: 100%;

	}

	.item {
		display: flex;
		justify-content: space-between;

		width: 100%;
	}

	.settingList img {
		transform: translateX(-10rpx);
		margin-top: 20rpx;
		width: auto;
		height: 50%;
	}

	.item img {
		margin-top: 20rpx;
		width: auto;
		height: 50%;
	}

	.settingList button {
		height: 100rpx;
		display: flex;
		width: 100%;
	}

</style>