<template>
	<view>、
		<h1 style="font-family: 'myfont';">Behere樱笋时寻声</h1>
		<uni-card style="border-radius: 20rpx;">
			<view style="display: flex;">
				<view class="icon">
					<img src="../../static/1.png" alt="">
				</view>
				<view>
					<h3>测绘学院、电子信息学院、网络安全学院、计算机学院</h3>
					<h4 style="font-weight: 200;">联合举办</h4>
				</view>
			</view>
		</uni-card>



		<uni-card style="overflow:visible; padding-bottom:25rpx; margin-top: 60rpx; border-radius: 20rpx;">
			<view>
				<view class="card-icon">
					<view class="container"><img src="@/static/content.png" alt=""></view>
					<h3 style="color: #FCA464;">活动介绍</h3>
				</view>

				<pre class="content">
春风，春暖，春日，春长，万籁逢于春。

是什么让我们怦然心动？

是音符淌过高低的谱线，写下春天的风物诗；

是乐声描摹暖阳与繁花，唱尽时光与情长；

是我们同在，在舞台上一起闪耀，

是在聚光灯下看见最明媚的你我。


我们期待每一次与歌声的相遇，
期待每一份真挚而热烈的爱于此奏响。
这个四月，樱笋时寻声。
				</pre>
			</view>

		</uni-card>

		<uni-card style="overflow:visible; padding-bottom:25rpx; margin-top: 60rpx; border-radius: 20rpx;">
			<view>
				<view class="card-icon">
					<view class="container"><img src="@/static/act_time.png" alt=""></view>
					<h3 style="color: #FCA464;">活动须知</h3>
				</view>

				<pre class="content">
报名时间：4.1 0:00 - 4.6 23:59
正式演出时间：4.8 18:00 - 20:30
活动地点：信息学部大学生活动中心
				</pre>
			</view>
		</uni-card>

		<uni-card style="overflow:visible; padding-bottom:25rpx; margin-top: 60rpx; border-radius: 20rpx;">
			<view>
				<view class="card-icon">
					<view class="container"><img src="@/static/require.png" alt=""></view>
					<h3 style="color: #FCA464;">报名要求</h3>
				</view>

				<pre class="content">
<text style="color: #FCA464;">①</text> 是热爱歌唱的小伙伴
<text style="color: #FCA464;">②</text> 遵守活动现场纪律
<text style="color: #FCA464;">③</text> 任何学院均可报名！
				</pre>
			</view>
		</uni-card>




	</view>
</template>

<script>
	export default {
		data() {
			return {
				uniiconsize: 40,
			}
		},
		methods: {

		}
	}
</script>

<style>

	h1 {
		margin-left: 20rpx;
	}

	.custom-list {
		list-style: none;
	}

	.card-icon {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		transform: translateY(-60rpx);
	}

	.card-icon .container {
		display: flex;

		justify-content: center;
		align-items: center;
		width: 80rpx;
		height: 80rpx;
		border: 5rpx solid #FCA464;
		border-radius: 100%;
	}

	.card-icon img {
		width: 50rpx;
		height: 50rpx;
		object-fit: fill;
	}

	.content {
		margin: 30rpx;
		font-weight: 550;
		line-height: 50rpx;
		font-size: 28rpx;
	}

	.cardicon2 uni-icons {}

	.custom-list {
		display: flex;
	}

	.custom-list img {
		width: 50rpx;
		height: 50rpx;
	}

	.custom-list view {
		line-height: 50rpx;
		list-style-type: none;
		vertical-align: middle;
		font-size: 40rpx;
	}

	.icon {
		width: 100rpx;
		left: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		margin-right: 15rpx;

	}

	.icon img {
		width: 100rpx;
		height: 120rpx;
		object-fit: fill;
	}
</style>