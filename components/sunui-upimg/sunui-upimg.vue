<template>
	<view class="s-add-list">
		<view
			class="s-add-list-items"
			:style="{
				height: size[0],
				width: size[1]
			}"
			v-for="(item, index) in imageList"
			:key="index"
		>
			<image :src="item[filedImage]" :url="item.url" @tap="showImgs" class="s-add-list-img" :mode="imgMode"></image>
			<view class="s-add-list-remove s-icons icon-close" @tap.stop="removeImg" :id="'s-items-img-' + index"><icon type="clear" :color="closeColor"></icon></view>
			<view class="upload-progress" :style="{ width: size[1] }">
				<progress :percent="item.progress" :stroke-width="progressSize" :activeColor="progressColor" :backgroundColor="progressBgColor" />
			</view>
			<view class="s-add-list-reup" @tap.stop="retry" :data-index="index" v-if="item.error">
				<text class="s-add-list-reup-icon s-icons icon-retry"></text>
				<text class="s-add-list-reup-text">失败重试</text>
			</view>
		</view>
		<view
			class="s-add-list-items s-add-list-btn"
			:style="{
				height: size[0],
				width: size[1],
				backgroundColor: backgroundColor
			}"
			:class="disabled ? 's-disabled' : ''"
			@tap="addImg"
			v-if="imageList.length < number"
		>
			<slot name="icon"></slot>
			<view class="s-add-list-btn-text">{{ title }}</view>
		</view>
	</view>
</template>
<script>
export default {
	props: {
		// 图片字段
		filedImage: {
			type: String,
			default: 'url'
		},
		// 背景颜色
		backgroundColor: {
			type: String,
			default: '#f7f7f7'
		},
		// 是否禁用
		disabled: {
			type: Boolean,
			default: false
		},
		// 上传数量
		number: {
			type: Number,
			default: 9
		},
		// 按钮名称
		title: {
			type: String,
			default: '添加照片'
		},
		// 上传文字颜色
		titleColor: {
			type: String,
			default: "#666"
		},
		// 图片大小
		size: {
			type: Array,
			default: () => ['222rpx', '222rpx']
		},
		// 上传前钩子
		beforeUpload: {
			type: Function
		},
		// 关闭按钮颜色
		closeColor: {
			type: String,
			default: "#666"
		},
		// 服务器地址
		url: {
			type: String,
			default: ''
		},
		// 进度条进度
		progressSize: {
			type: Number,
			default: 1
		},
		// 进度条颜色
		progressColor: {
			type: String,
			default: "#0475fd"
		},
		// 进度条背景颜色
		progressBgColor: {
			type: String,
			default: "#666"
		},
		// 上传文件名称
		fileName: { type: String, default: 'img' },
		// 携带的form数据
		formData: {
			type: Object,
			default: () => {
				return {};
			}
		},
		// 图片模式
		imgMode: { type: String, default: 'widthFix' },
		// 携带的请求头
		header: {
			type: Object,
			default: () => {
				return {};
			}
		}
	},
	data() {
		return {
			imageList: [],
			upDate: false
		};
	},
	watch: {
		imageList(newVal, oldVal) {
			if (!this.upDate) {
				this.$emit('change', newVal);
			}
		}
	},
	methods: {
		clearAllImgs() {
			this.imageList = [];
		},
		addImg() {
			if (this.disabled) return;
			let num = this.number - this.imageList.length;
			if (num < 1) {
				return false;
			}
			uni.chooseImage({
				count: num,
				sizeType: ['compressed'],
				success: async res => {
					let file = res.tempFiles;
					for (let i = 0; i < res.tempFilePaths.length; i++) {
						if (this.beforeUpload) {
							const valid = await this.beforeUpload(file[i], i);
							if (valid === false) {
								return false;
							}
						}
						this.imageList.push({ url: res.tempFilePaths[i], progress: 0, error: false });
					}
				}
			});
		},
		removeImg(e) {
			let index = e.currentTarget.id.replace('s-items-img-', '');
			let removeImg = this.imageList.splice(index, 1);
			this.$emit('remove', removeImg[0]);
		},
		showImgs(e) {
			let currentImg = e.currentTarget.dataset.url;
			let imgs = [];
			for (let i = 0; i < this.imageList.length; i++) {
				imgs.push(this.imageList[i][this.filedImage]);
			}
			uni.previewImage({
				urls: imgs,
				current: currentImg
			});
		},
		upload(index) {
			if (this.upDate) {
				return;
			}
			this.upDate = true;
			if (!index) {
				index = 0;
			}
			uni.showLoading({ title: '图片上传中' });
			this.uploadBase(index);
		},
		retry(e) {
			let index = e.currentTarget.dataset.index;
			this.upload(index);
		},
		uploadBase(index) {
			// 全部上传完成
			if (index > this.imageList.length - 1) {
				uni.hideLoading();
				this.upDate = false;
				this.$emit('upload', this.imageList);
				return;
			}
			// 验证后端
			if (this.url == '') {
				uni.showToast({ title: '请设置上传服务器地址', icon: 'none' });
				return;
			}
			// 检查是否是默认值
			if (this.imageList[index].progress >= 1) {
				this.uploadBase(index + 1);
				return;
			}
			this.imageList[index].error = false;
			// 创建上传对象
			const upTask = uni.uploadFile({
				url: this.url,
				filePath: this.imageList[index].url,
				name: 'file' || this.fileName,
				formData: this.formData,
				header: this.header,
				success: uploadRes => {
					uploadRes = JSON.parse(uploadRes.data);
					if (uploadRes.code != 0) {
						uni.showToast({ title: '上传失败 : ' + uploadRes.data, icon: 'none' });
						this.error(index);
					} else {
						//上传图片成功
						this.imageList[index].progress = 100;
						this.imageList[index].url = uploadRes.data;
						this.imageList[index].result = uploadRes;
						this.uploadBase(index + 1);
					}
				},
				fail: e => {
					uni.showToast({ title: '上传失败，请点击图片重试', icon: 'none' });
					this.error(index);
				}
			});
			upTask.onProgressUpdate(res => {
				if (res.progress > 0) {
					this.imageList[index].progress = res.progress;
					this.imageList.splice(index, 1, this.imageList[index]);
				}
			});
		},
		// 上传错误
		error(index) {
			this.upDate = false;
			setTimeout(() => {
				this.imageList[index].progress = 0;
				this.imageList[index].error = true;
				this.$emit('uploaderror');
			}, 500);
		},
		// 设置默认值
		setItems(items) {
			if (items.length) {
				this.imageList = [];
				for (let i = 0; i < items.length; i++) {
					this.imageList.push({ url: items[i], progress: 100 });
				}
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.s-disabled {
	cursor: not-allowed;
}

.s-add-list {
	display: flex;
	flex-wrap: wrap;
}
.s-add-list-btn {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.s-add-list-btn-text {
	font-size: 26rpx;
	line-height: 36rpx;
	text-align: center;
	color: #999;
	width: 100%;
}
.s-add-list-items {
	width: 222rpx;
	height: 222rpx;
	overflow: hidden;
	margin-bottom: 10rpx;
	margin-right: 11rpx;
	/* background: #f6f7f8; */
	font-size: 0;
	position: relative;
	border-radius: 10rpx;
}
.s-add-list-image {
	width: 222rpx;
}
.s-add-list-remove {
	position: absolute;
	z-index: 15;
	right: 10rpx;
	top: 0;
	color: #888888;
}
.upload-progress {
	position: absolute;
	z-index: 99;
	left: 0;
	bottom: 10rpx;
	// width: 180rpx;
	padding: 0 21rpx;
}
.s-add-list-reup {
	position: absolute;
	z-index: 3;
	left: 0;
	top: 0rpx;
	width: 222rpx;
	height: 222rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.3);
	flex-direction: column;
}
.s-add-list-reup-icon {
	text-align: center;
	width: 100%;
	color: #ffffff;
	display: block;
	font-size: 80rpx;
	line-height: 100rpx;
}
.s-add-list-reup-text {
	text-align: center;
	width: 100%;
	color: #ffffff;
	display: block;
	font-size: 20rpx;
	line-height: 30rpx;
}
.s-add-list-img {
	width: 100%;
	height: 100%;
}
</style>
