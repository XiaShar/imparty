<template>
	<view>
		<uni-forms ref="dynamicForm" :rules="dynamicRules" :model="dynamicFormData" label-position="top">
<!-- 			<view class="title">
				<text style="margin-top: auto;margin-bottom: auto;margin-left: 50rpx;">头像</text>
				<view class="icon">
					<uni-id-pages-avatar width="80rpx" height="80rpx"></uni-id-pages-avatar>
				</view>
			</view>

			<view class="line" style="margin-bottom: 35rpx;"></view> -->

			<uni-forms-item label="姓名" name="name" class="item">
				<uni-easyinput v-model="dynamicFormData.name" :inputBorder="false" :clearSize="20" :styles="{backgroundColor:'#f5f5f5'}" :clearable="false"/>
			</uni-forms-item>

			<view class="line" style="transform: translateY(-35rpx);"></view>

			<uni-forms-item label="性别" name="gender" class="item">
				<hpy-form-select :dataList="sexs" text="text" name="value" v-model="dynamicFormData.gender" :hide-border="true" />
			</uni-forms-item>
			
			<view class="line" style="transform: translateY(-35rpx);"></view>
			
			<uni-forms-item label="学院" name="school" class="item">
				<hpy-form-select :dataList="schools" text="text" name="value" v-model="dynamicFormData.school" :hide-border="true" />
			</uni-forms-item>

			<view class="line" style="transform: translateY(-35rpx);"></view>	
			
			<uni-forms-item label="生日" name="birthday" class="item">
				<hpy-form-select mode="date" start="1900-01-01" end="2010-12-31" v-model="dynamicFormData.birthday" :hide-border="true" />
			</uni-forms-item>
			
			<view class="line" style="transform: translateY(-35rpx);"></view>	
			
			<uni-forms-item label="手机号" name="phone" class="item" >
				<view style="height: 60rpx; width: 100%;" @click="updatePhone()" >{{ dynamicFormData.phone }}</view>
			</uni-forms-item>
			
			<view class="line" style="transform: translateY(-35rpx);"></view>
			
			<uni-forms-item label="邮箱" name="email" class="item">
				<uni-easyinput v-model="dynamicFormData.email" :inputBorder="false" :styles="{backgroundColor:'#f5f5f5'}" :clearable="false"/>
			</uni-forms-item>
			
			<view class="line" style="transform: translateY(-35rpx);"></view>


		</uni-forms>
		<view class="button-group">
			<button type="primary" class="subButn" size="mini" @click="submit('dynamicForm')">提交</button>
			<button class="logoutButn" size="mini" @click="logout()">登出</button>
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
				// 数据源
				dynamicFormData: {
					name: store.userInfo.nickname,
					gender: store.userInfo.gender,
					school: store.userInfo.comment,
					birthday: "",
					phone: store.userInfo.phone,
					email: store.userInfo.email
				},
				// 规则
				dynamicRules: {
					name: {
						rules: [
							{
								required: true,
								errorMessage: '姓名不能为空'
							}, 
							{
								format: 'string',
								errorMessage: '请正确填写姓名'
							},
						]
					},
					phone: {
						rules: [
							{
								required: true,
								errorMessage: '手机号不能为空'
							}, 
							{
								format: 'string',
								errorMessage: '请正确填写手机号'
							},
						]
					},
					email: {
						rules: [
							{
								format: 'email',
								errorMessage: '请正确填写邮箱'
							},
						]
					}
				},
				sexs: [{
					text: '男',
					value: 1
				}, {
					text: '女',
					value: 2
				}],
				schools: [{
					text: '计算机学院',
					value: '计算机学院'
				}, {
					text: '新闻与传播学院',
					value: '新闻与传播学院'
				}],
			}
		},
		methods: {
			logout(){
				mutations.logout()
			},
			
			submit(ref) {
				// this.$refs[ref].validate((err, value) => {
				// 	mutations.setUserInfo({ this.dynamicFormData.name })
				// })
				mutations.updateUserInfo({
					nickname: this.dynamicFormData.name,
					gender: this.dynamicFormData.gender
				})
			},
			
			updatePhone(){
				uni.navigateTo({
					url: "/uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile"
				})
			}
		}
	}
</script>

<style>
	.title {
		margin-top: 30rpx;
		display: flex;
		justify-content: space-between;
	}

	.icon {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 50rpx;
		margin-bottom: 20rpx;
	}

	.icon img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.line {
		position: relative;
		right: -50rpx;
		background-color: gray;
		height: 1px;
		width: 650rpx;
	}

	.item {
		margin-left: 50rpx;
		margin-right: 50rpx;
	}

	.pop {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 500rpx;
	}

	.uni-pb-5 {
		padding: 40px;
	}
	
	.button-group{
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: 20rpx;
		flex-direction: column;
	}
	
	.subButn{
		width: 70%;
		height: 75rpx;
		border-radius: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FCA464;
		font-size: 30rpx;
	}
	
	.logoutButn{
		color: white;
		margin-top: 50rpx;
		width: 70%;
		height: 75rpx;
		border-radius: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: red;
		opacity: 0.5;
		font-size: 30rpx;
	}

</style>