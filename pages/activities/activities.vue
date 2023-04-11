<template>
<<<<<<< HEAD
  <view>
    <view class="line" style="transform: translateY(0rpx);"></view>
    <view class="section">
      正在进行中
    </view>
<!-- 这里是进行中的活动 -->
    <view v-for="(item,index) in nowdata" :key="item._id">
    

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
          <text style="width: 100rpx;overflow: hidden;text-overflow: clip;;white-space: nowrap;">联合活动</text>
        </view>
      </view>
    </uni-card>


</view>
<!-- 这里是进行中的活动的结束位置 -->
<!-- 这里是即将到来的活动 -->
    <view class="line" style="transform: translateY(0rpx);"></view>
    <view class="section">
      即将到来
    </view>
<view v-for="(item,index) in willdata" :key="item._id">


    <uni-card @click="showDetail(item)">
      <view class="uni-card">
        <view>
          <h3>{{item.title}}</h3>
          <view class="tag">
            <text v-for="(itemtag,indextag) in item.actag" :key="indextag">{{itemtag}}</text>
          </view>
          <text>{{item.ddl}}</text>
        </view>
        <view class="rightCard">
          <image src="../../static/2.png" style="width: 100rpx; height: 130rpx;"></image>
          <text style="width: 100rpx;overflow: hidden;text-overflow: clip;;white-space: nowrap;">联合活动</text>
        </view>
      </view>
    </uni-card>
</view>
<!-- 这里是即将到来的活动的结束位置 -->

=======

	<view>
		<view class="line" style="transform: translateY(0rpx);"></view>
		<view class="section">
			正在进行中
		</view>
		<uni-card>
			<view class="uni-card">
				<view>
					<h3>Behere樱笋时寻声</h3>
					<view class="tag">
						<text>歌手大赛</text>
						<text>信息学部</text>
						<text>很强</text>
					</view>
					<text>截止时间：4-8 22:00</text>
				</view>
				<view class="rightCard">
					<image src="../../static/1.png" style="width: 100rpx; height: 130rpx;"></image>
					<text style="width: 100rpx;overflow: hidden;text-overflow: clip;;white-space: nowrap;">联合活动</text>
				</view>
			</view>
		</uni-card>

		<view class="line" style="transform: translateY(0rpx);"></view>
		<view class="section">
			即将到来
		</view>
>>>>>>> d53ff959617b4b38dfdf7df7be52bcac881d5660

		<uni-card @click="showDetail()">
			<view class="uni-card">
				<view>
					<h3>新计联谊</h3>
					<view class="tag">
						<text>联谊</text>
						<text>这是联谊</text>
						<text>这是联谊啊啊啊</text>
					</view>
					<text>截止时间：4-21 23:59</text>
				</view>
				<view class="rightCard">
					<image src="../../static/2.png" style="width: 100rpx; height: 130rpx;"></image>
					<text style="width: 100rpx;overflow: hidden;text-overflow: clip;;white-space: nowrap;">联合活动</text>
				</view>
			</view>
		</uni-card>

	</view>
	<uni-fab ref="fab" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical"
		:direction="direction" @trigger="trigger" @fabClick="fabClick" />
</template>

<script>
<<<<<<< HEAD
  export default {
    components: {},
    data() {
      return {
        //渲染数据
        firstdata:[],
        nowdata:[],
        willdata:[],
        // cover: 'https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
        avatar: [
          'https://img1.baidu.com/it/u=2407625550,1485951297&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1680627600&t=2d3299bc86c91a1048d93cf01096bc15',
          'https://img1.baidu.com/it/u=4120075661,439968901&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1680627600&t=8682d52389e8faa8b2aa4f37969ba30e'
        ],
        extraIcon: {
          color: '#4cd964',
          size: '22',
          type: 'gear-filled'
        }
      }
    },
    methods: {
      showDetail(item){
        uni.navigateTo({
        	"url":`../activeDetail/activeDetail?_id=${item._id}`
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
      }
    },
    mounted() {
      uniCloud.callFunction({
        name: 'detail-activities'
      }).then((res) => {
        this.firstdata = res.result.data
        for(let i = 0;i<this.firstdata.length;i++){
          if(this.firstdata[i].isdoing==="now"){
            this.nowdata.push(this.firstdata[i])
          }else{
            this.willdata.push(this.firstdata[i])
          }
        }
        console.log(this.nowdata)
        console.log(this.willdata)
        console.log(res.result.data)
      }).catch((err) => {
        console.error(err)
      })
    }
  }
=======
	export default {
		components: {},
		data() {
			return {
				// cover: 'https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
				avatar: [
					'https://img1.baidu.com/it/u=2407625550,1485951297&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1680627600&t=2d3299bc86c91a1048d93cf01096bc15',
					'https://img1.baidu.com/it/u=4120075661,439968901&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1680627600&t=8682d52389e8faa8b2aa4f37969ba30e'
				],
				extraIcon: {
					color: '#4cd964',
					size: '22',
					type: 'gear-filled'
				},
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#FCA464',
					buttonColor: '#FCA464',
					iconColor: '#fff'
				},
				content: [{
						iconPath: '/static/image.png',
						selectedIconPath: '/static/image-active.png',
						text: '相册',
						active: false
					},
					{
						iconPath: '/static/home.png',
						selectedIconPath: '/static/home-active.png',
						text: '首页',
						active: false
					},
					{
						iconPath: '/static/star.png',
						selectedIconPath: '/static/star-active.png',
						text: '收藏',
						active: false
					}
				]
			}
		},
		methods: {
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
		},
		trigger(e) {
			console.log(e)
			this.content[e.index].active = !e.item.active
			uni.showModal({
				title: '提示',
				content: `您${this.content[e.index].active ? '选中了' : '取消了'}${e.item.text}`,
				success: function(res) {
					if (res.confirm) {
						console.log('用户点击确定')
					} else if (res.cancel) {
						console.log('用户点击取消')
					}
				}
			})
		},
	}
>>>>>>> d53ff959617b4b38dfdf7df7be52bcac881d5660
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
</style>