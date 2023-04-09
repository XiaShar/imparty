<template>
	<view>
		<uni-forms ref="dynamicForm" :rules="dynamicRules" :model="dynamicFormData" label-position="top">
			<view class="title">
				<text style="margin-top: auto;margin-bottom: auto;margin-left: 50rpx;">头像</text>
				<view class="icon">
					<img src="@/static/user-img.png" alt="">
				</view>
			</view>

			<view class="line" style="margin-bottom: 35rpx;"></view>

			<uni-forms-item label="姓名" name="name" class="item">
				<uni-easyinput v-model="dynamicFormData.name" :inputBorder="false" />
			</uni-forms-item>

			<view class="line" style="transform: translateY(-35rpx);"></view>

			<uni-forms-item label="性别" name="sex" class="item">
				<hpy-form-select :dataList="sexs" text="text" name="value" v-model="dynamicFormData.sex" :hide-border="true" />
			</uni-forms-item>

			<view class="line" style="transform: translateY(-35rpx);"></view>	
			
			<uni-forms-item label="生日" name="birthday" class="item">
				<hpy-form-select mode="date" start="1900-01-01" end="2010-12-31" v-model="dynamicFormData.birthday" :hide-border="true" />
			</uni-forms-item>
			
			<view class="line" style="transform: translateY(-35rpx);"></view>	
			
			<uni-forms-item label="手机号" name="phone" class="item">
				<uni-easyinput v-model="dynamicFormData.phone" :inputBorder="false" />
			</uni-forms-item>
			
			<view class="line" style="transform: translateY(-35rpx);"></view>
			
			<uni-forms-item label="邮箱" name="email" class="item">
				<uni-easyinput v-model="dynamicFormData.email" :inputBorder="false" />
			</uni-forms-item>
			
			<view class="line" style="transform: translateY(-35rpx);"></view>


		</uni-forms>
		<view class="button-group">
			<button type="primary" class="subButn" size="mini" @click="submit('dynamicForm')">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 数据源
				dynamicFormData: {
					name: "",
					sex: 0,
					birthday: "",
					phone:"",
					email:""
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
					value: 0
				}, {
					text: '女',
					value: 1
				}],
			}
		},
		methods: {
			submit(ref) {
				this.$refs[ref].validate((err, value) => {
					console.log(err, value);
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
</style>