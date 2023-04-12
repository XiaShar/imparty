<template>
	<view class="container">
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
			
			<uni-forms-item label="手机号" name="phone" class="item" >
				<uni-easyinput v-model="dynamicFormData.phone" :inputBorder="false" :clearSize="20" :styles="{backgroundColor:'#f5f5f5'}" :clearable="false"/>
			</uni-forms-item>
			
			<view class="line" style="transform: translateY(-35rpx);"></view>
			
			<uni-forms-item label="星座" name="sign" class="item" >
				<uni-easyinput v-model="dynamicFormData.sign" :inputBorder="false" :clearSize="20" :styles="{backgroundColor:'#f5f5f5'}" :clearable="false"/>
			</uni-forms-item>
			
			<view class="line" style="transform: translateY(-35rpx);"></view>
			
			<uni-forms-item label="对方性别" name="goalGender" class="item">
				<hpy-form-select :dataList="sexs" text="text" name="value" v-model="dynamicFormData.goalGender" :hide-border="true" />
			</uni-forms-item>
			
			<view class="line" style="transform: translateY(-35rpx);"></view>
			
			<uni-forms-item label="对方学院" name="goalSchool" class="item">
				<hpy-form-select :dataList="schools" text="text" name="value" v-model="dynamicFormData.goalSchool" :hide-border="true" />
			</uni-forms-item>
			
			<view class="line" style="transform: translateY(-35rpx);"></view>	
			


		</uni-forms>
		<view class="button-group">
			<button class="subButn" size="default" @click="submit('dynamicForm')">提交</button>
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
					school: store.userInfo.school,
					phone: store.userInfo.phone,
					sign:"",
					goalGender:"",
					goalSchool:"",
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
					gender: {
						rules: [
							{
								required: true,
								errorMessage: '请选择您的性别'
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
					school: {
						rules: [
							{
								format: 'string',
								errorMessage: '请正确填写邮箱'
							},
							{
								required: true,
								errorMessage: '请填写您的学院'
							}, 
						]
					}
				},
				sexs: [{
					text: '男',
					value: "男"
				}, {
					text: '女',
					value: "女"
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
			submit(ref) {
				this.$refs[ref].validate((err, value) => {
					console.log(123)
				})
			},

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
		color: white;
		width: 70%;
		height: 75rpx;
		border-radius: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FCA464;
		opacity: 0.9;
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
	.container{
		margin-left: 50rpx;
		margin-right: 50rpx;
	}
</style>