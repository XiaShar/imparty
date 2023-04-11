<script>
	import uniIdPageInit from '@/uni_modules/uni-id-pages/init.js';
	export default {
		onLaunch:function(){
			console.log('App Launch')
      
      uni.onPushMessage((res) => {
      			console.log("收到推送消息：",res) //监听推送消息
      		})
      
      uni.getPushClientId({
      	success: (res) => {
      		let push_clientid = res.cid
          uniCloud.callFunction({
            name:'doUniPush',
            data:{pushCliendId:push_clientid}
          })
      		console.log('客户端推送标识:',push_clientid)
      	},
      	fail(err) {
      		console.log(err)
      	}
      })
      
      
      
    
          
			//await uniIdPageInit()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
	
	@font-face {
	    font-family: myfont;
	    src: url('~@/static/TsangerYuYangT_W03_W03.ttf');
	}
</style>
