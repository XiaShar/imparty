<template>


	<view v-for="(item,index) in dedata" :key="dedata.id">
		<!-- title -->
		<view style="font-family: 'myfont';font-size: 60rpx; margin-left: 20rpx; margin-top: 20rpx;">{{item.title}}
		</view>
		<uni-card style="border-radius: 20rpx; margin-top: 20rpx;">
			<view style="display: flex;">
				<view class="icon">
					<image src="../../static/1.png" style="width: 100rpx;height: 120rpx;"></image>
				</view>
				<view>
					<!-- 举办方 masteratti-->
					<view style="font-size: 35rpx;">{{item.masteratti.join(',')}}</view>
					<!-- aligintitle -->
					<h4 style="font-weight: 200;">{{item.aligintitle}}</h4>
				</view>
			</view>
		</uni-card>

		<view style="margin-top: 60rpx;">
			<uni-card style="overflow:visible; padding-bottom:25rpx; margin-top: 60rpx;">
				<view>
					<view class="card-icon">
						<view class="container">
							<image src="@/static/content.png" style="width: 50rpx;height: 50rpx;"></image>
						</view>
						<h3 style="color: #FCA464;">活动介绍</h3>
					</view>
					<!-- description -->
					<pre class="content">
					{{item.description}}
					</pre>
				</view>
			</uni-card>
		</view>

		<view style="margin-top: 60rpx;">
			<uni-card style="overflow:visible; padding-bottom:25rpx; margin-top: 60rpx; border-radius: 20rpx;">
				<view>
					<view class="card-icon">
						<view class="container">
							<image src="@/static/act_time.png" style="width: 50rpx;height: 50rpx;"></image>
						</view>
						<h3 style="color: #FCA464;">活动须知</h3>
					</view>
					<pre class="content">
					{{item.known}}
					</pre>
				</view>
			</uni-card>
		</view>


		<view style="margin-top: 60rpx; margin-bottom: 40rpx;">
			<uni-card style="overflow:visible; padding-bottom:25rpx; margin-top: 60rpx; border-radius: 20rpx;">
				<view>
					<view class="card-icon">
						<view class="container">
							<image src="@/static/require.png" style="width: 50rpx;height: 50rpx;"></image>
						</view>
						<h3 style="color: #FCA464;">报名要求</h3>
					</view>

					<pre class="content" v-for="(mitem,mindex) in item.requirement" :key="mitem.mindex">
			  <text style="color: #FCA464;">{{mitem.index}}</text>{{mitem.der}}
			</pre>
				</view>
			</uni-card>
		</view>

		<uni-fab ref="fab" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical"
			:direction="direction" @trigger="trigger" :show="true" />


	</view>
</template>

<script>
	let opt_id = ''
  import {
  	store,
  	mutations
  } from '@/uni_modules/uni-id-pages/common/store.js'
	//title,masteratti,aligintitle,description,known,requirement
	export default {
		data() {
			return {
				uniiconsize: 40,
				dedata: [],
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#FCA464',
					buttonColor: '#FCA464',
					iconColor: '#fff'
				},
				horizontal: 'right',
				vertical: 'bottom',
				direction: 'horizontal',
				content: [{
						iconPath: '/static/commit.png',
						selectedIconPath: '/static/commit.png',
						text: '咨询',
						active: false
					},
					{
						iconPath: '/static/intro.png',
						selectedIconPath: '/static/intro.png',
						text: '报名',
						active: false
					},

				]
			}
		},
		methods: {
			trigger(e) {
				if (e.index === 0) {
					uni.showModal({
						title: "提示",
						content: "该功能尚在开发中..."
					})
				} else if (e.index === 1) {
          let flag = true
          uniCloud.callFunction({
            name:"getMyActivity",
            data:{_id:store.userInfo._id}
          }).then((res)=>{
            // console.log(res.result)
            res.result.forEach(item=>{
              if(item._id===this.dedata[0]._id){
                flag = false
                // console.log(this.dedata[0]._id)
                // console.log(flag)
              }
            })
          if(flag){
            // console.log(1)
            uni.navigateTo({
            	url: `../formPage/formPage?activities_id=${this.dedata[0]._id}`
            })
          }else{
            uni.showToast({
              title:"您已报名该活动"
              })
            }					        
          })
          
          
				}
			},
		},
		computed: {},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			opt_id = option._id
		},
		mounted() {
			uniCloud.callFunction({
				name: 'detail-activities',
				data: {
					objId: opt_id
				}
			}).then((res) => {
				this.dedata = res.result.data
				console.log(res.result.data)
			}).catch((err) => {
				console.error(err)
			})
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