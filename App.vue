<script>
	import uniIdPageInit from '@/uni_modules/uni-id-pages/init.js';
	export default {
		onLaunch: async function() {
			console.log('App Launch')
			await uniIdPageInit()
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
	
	// @font-face {
	//     font-family: myfont;
	//     src: url('~@/static/TsangerYuYangT_W03_W03.ttf');
		
	// }
	
	/* CDN 服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
	@font-face {
	  font-family: myfont;font-weight: 400;src: url("//at.alicdn.com/wf/webfont/NvHjKPz9AuKF/ioJnbDAuIJCD.woff2") format("woff2"),
	  url("//at.alicdn.com/wf/webfont/NvHjKPz9AuKF/odLs42wWWNIO.woff") format("woff");
	  font-display: swap;
	}
</style>
