// An highlighted block
<template>
	<view class="content">
		<h1 class="title">注册</h1>
		<view class="form">
			<uni-forms  ref="form" :modelValue="formData" :rules="rules">
				<uni-forms-item name="iphone">
					<input class="input" type="text" value="" v-model="formData.iphone" placeholder="请输入手机号" />
				</uni-forms-item>
				<uni-forms-item name="password">
					<input class="input" type="password" value="" v-model="formData.password" placeholder="请输入密码" />
				</uni-forms-item>
			</uni-forms>

			<view class="loginBtn" @click="submit">
				<text class="btnValue">注册</text>
			</view>
		</view>
	</view>
</template>



<script>
	export default {
		data() {
			return {
				formData: {
					iphone: '',
					password:'',
				},
				rules: {
					iphone: {
						rules: [{
							required: true,
							errorMessage: '请输入注册手机号码'
						}, {
							validateFunction: function(rule, value, data, callback) {
								let iphoneReg = /^1[0-9]{10}$/
								if (!iphoneReg.test(value)) {
									callback('手机号码格式不正确，请重新填写')
								}
								return true
							}
						}]
					}
				}
			}
		},
		onLoad() {

		},
		methods: {
			
			
			submit() {
			           this.$refs.form.validate().then(res=>{
			               console.log('表单数据信息：', res);
										this.register(res)
			           }).catch(err =>{
			               console.log('表单错误信息：', err);
			           })
			       },
			
			req(action,params){
				uni.showLoading({
					title:'请求中'
				})
				return new Promise((resolve)=>{
					uniCloud.callFunction({
						name:'user-center',
						data:{
							action,
							params
						},
						success:res=>{
							uni.hideLoading()
							resolve(res.result);
						},
						fail:res=>{
							resolve(res)
						}
					})
				})
			},
			
			register(e){
				this.req("register",{username:this.formData.iphone,password:this.formData.password}).then(res=>{
					console.log(res)
					  uni.setStorageSync('uni_id_token',res.token)
					  uni.setStorageSync('uni_id_token_expired',res.tokenExpired) 
					  uni.switchTab({
					    url: '/pages/index/index'   
					});
				})
				console.log("跳转提醒")
			},
						
		}
	}
</script>



<style>
	.content {
		width: 100vw;
		height: 100vh;
	}
	.title{
		margin-left: 100rpx;
		margin-top: 180rpx;
		color: #333333;
	}
	.form{
		padding: 0 100upx;
		margin-top: 40px;
	}
	.inputWrapper{
		width: 100%;
		height: 80upx;
		background: white;
		border-radius: 20px;
		border:0.5px solid #a3a3a3;
		box-sizing: border-box;
		padding: 0 20px;
		margin-top: 25px;
	}
	.inputWrapper .input{
		width: 100%;
		height: 100%;
		text-align: center;
		font-size: 15px;
	}
	.loginBtn{
		width: 100%;
		height: 80upx;
		background: #a3a3a3;
		border-radius: 50upx;
		margin-top: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
	.loginBtn .btnValue{
		color: white;
	}
	.forgotBtn{
		text-align: center;
		color: #8d8d8d;
		font-size: 15px;
		margin-top: 20px;
	}
	.input {
		flex: 1;
		font-size: 14px;
		color: #666;
		border: 1px #e5e5e5 solid;
		border-radius: 5px;
		padding: 10px;
	}
</style>
