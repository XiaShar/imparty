<template>
	<view>
		<view class="colorBg">
		</view>

		<view class="container">
			<view class="icon">
				<uni-id-pages-avatar width="100rpx" height="100rpx"></uni-id-pages-avatar>
			</view>
			<view class="title-area">
				<view class="name">
					{{ userInfo.nickname }}
				</view>
				<view class="detail">
					2021级 计算机学院
				</view>
			</view>
			<view class="edit-icon"  @click="editInfo()">
				<img src="@/static/edit.png" alt="">
			</view>
		</view>
		
		<view class="actCard">
			<uni-card style="border-radius: 20px;">
				<view class="myAct">
					<view class="title">
						我的活动
					</view>
					<view class="actList">
						<button>
							<img src="@/static/preAct.png" alt="">
							<view style="font-size: 25rpx;">已预约</view> 
						</button>
						<button>
							<img src="@/static/acting.png" alt="">
							<view style="font-size: 25rpx;">进行中</view> 
						</button>
						<button>
							<img src="@/static/endAct.png" alt="">
							<view style="font-size: 25rpx;">已结束</view> 
						</button>
					</view>
				</view>
			</uni-card>
		</view>
		
		<view class="adCard">
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
		</view>
		

		<view class="settingCard">
			<uni-card style="border-radius: 20px;">
				<view class="myAct">
					<view class="title">
						拓展功能
					</view>
					<view class="settingList">
						<button id="test">
							<view class="item">
								<view style="display: flex;">
									<img src="@/static/info.png" alt="">
									<view style="font-size: 35rpx;">信息管理</view> 
								</view>
								<img src="@/static/rightArrow.png" alt="" style="height: 30%;">
							</view>
						</button>
						<button>
							<view class="item">
								<view style="display: flex;">
									<img src="@/static/setting.png" alt="">
									<view style="font-size: 35rpx;">设置</view> 
								</view>
								<img src="@/static/rightArrow.png" alt="" style="height: 30%;">
							</view>
						</button>
						<button>
							<view class="item">
								<view style="display: flex;">
									<img src="@/static/about.png" alt="">
									<view style="font-size: 35rpx;">关于我们</view> 
								</view>
								<img src="@/static/rightArrow.png" alt="" style="height: 30%;">
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
			}
		},
		computed:{
			userInfo(){
				return store.userInfo
			}
		},
		methods: {
			toLogin(){
				uni.navigateTo({
					url:"/uni_modules/uni-id-pages/pages/login/login-withpwd"
				})
			},
			
			editInfo(){
				if(uniCloud.getCurrentUserInfo().uid === null){
					uni.navigateTo({
						url:"/uni_modules/uni-id-pages/pages/login/login-withpwd"
					})
				}else{
					uni.navigateTo({
						url:"./editingView"
					})
				}
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
		top: 100rpx;
		width: 100%;
		height: 200rpx;
		overflow-x: hidden;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	
	.icon{
		position: absolute;
	    left: 50rpx;
	    width: 100rpx;
	    height: 100rpx;
	    border-radius: 50%;
	    overflow: hidden;
	    border: 10rpx solid rgba(255, 255, 255, 0.6);
	}
	
	.icon img{
	    width: 100%;
	    height: 100%;
	    object-fit: cover;
	}
	
	.title-area{
		font-family: "myfont";
		color: white;
		position: relative;
		left: -80rpx;
	}
	
	.name{
		font-size: 35rpx;
		font-weight: 600;
	}
	
	.detail{
		font-size: 25rpx;
	}
	
	.edit-icon{
		position: absolute;
		right: 50rpx;
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		background-color: rgba(0,0,0,0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.edit-icon img{
	    width: 60%;
	    height: 60%;
	}

	.actCard{
		position: absolute;
		top: 270rpx;
		border-radius: 5px;
	}
	
	.title{
		
		color: rgba(0,0,0,0.8);
		font-size: 40rpx;
		font-weight: 800;
		margin-bottom: 40rpx; 
	}
	
	.actList{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 160rpx;
	}
	
	.actList img{
		margin-top: 20rpx;
	    width: 50%;
	    height: auto;
	    object-fit: cover;
	}
	
	.actList view{
		position: relative;
		top: -15rpx;
		font-family: "myfont";
	}
	
	button{
		height: 200rpx;
		background-color: rgba(0,0,0,0);
	}
	button::after{
		border: none;
	}
	
	.settingCard{
		border-radius: 5px;
		position: absolute;
		top: 800rpx;
		width: 100%;
	}
	
	.settingList{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		width: 100%;
		
	}
	
	.item{
		display: flex;
		justify-content: space-between;

		width: 100%;
	}
	
	.settingList img{
		transform: translateX(-10rpx);
		margin-top: 20rpx;
	    width: auto;
	    height: 50%;
	}
	
	.item img{
		margin-top: 20rpx;
	    width: auto;
	    height: 50%;
	}
	
	.settingList button{
		height: 100rpx;
		display: flex;
		width: 100%;
	}
	
	.adCard{
		border-radius: 5px;
		position: absolute;
		top: 600rpx;
		width: 100%;
	}
</style>