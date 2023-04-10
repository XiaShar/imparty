<template>


  <view v-for="(item,index) in dedata" :key="dedata.id">
    <!-- title -->
    <h1 style="font-family: 'myfont';">{{item.title}}</h1>
    <uni-card style="border-radius: 20rpx;">
      <view style="display: flex;">
        <view class="icon">
          <img src="../../static/1.png" alt="">
        </view>
        <view>
          <!-- 举办方 masteratti-->
          <h3>{{item.masteratti.join(',')}}</h3>
          <!-- aligintitle -->
          <h4 style="font-weight: 200;">{{item.aligintitle}}</h4>
        </view>
      </view>
    </uni-card>



    <uni-card style="overflow:visible; padding-bottom:25rpx; margin-top: 60rpx; border-radius: 20rpx;">
      <view>
        <view class="card-icon">
          <view class="container"><img src="@/static/content.png" alt=""></view>
          <h3 style="color: #FCA464;">活动介绍</h3>
        </view>
        <!-- description -->
        <pre class="content">
{{item.description}}
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
{{item.known}}
        </pre>
      </view>
    </uni-card>

    <uni-card style="overflow:visible; padding-bottom:25rpx; margin-top: 60rpx; border-radius: 20rpx;">
      <view>
        <view class="card-icon">
          <view class="container"><img src="@/static/require.png" alt=""></view>
          <h3 style="color: #FCA464;">报名要求</h3>
        </view>

        <pre class="content"  v-for="(mitem,mindex) in item.requirement" :key="mitem.mindex">
          <text style="color: #FCA464;">{{mitem.index}}</text>{{mitem.der}}
        </pre>
      </view>
    </uni-card>




  </view>
</template>

<script>
  //title,masteratti,aligintitle,description,known,requirement
  export default {
    data() {
      return {
        uniiconsize: 40,
        dedata: []
      }
    },
    methods: {

    },
    computed: {},
    mounted() {
      uniCloud.callFunction({
        name: 'detail-activities'
      }).then((res) => {
        this.dedata = res.result.data
        console.log(res.dedata.requirement)
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