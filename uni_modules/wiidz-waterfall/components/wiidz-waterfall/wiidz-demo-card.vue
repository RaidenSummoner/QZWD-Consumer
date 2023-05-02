<!--文章-->
<template>
	<view class="card-demo" hover-class="hoverClass" @click="open">
		<image class="img-thumb" mode="aspectFill" :src="cardData.thumbnail"
			:style="'height:'+cardData.imgEleHeight+'px'"></image>
		<view :id="'block-info-' + index" class="span-info">
			<text class="text-title">{{cardData.title}}</text>
			<view class="bar-bottom">
				<view class="box-user">
					<img class="img-avatar" :src="cardData.user.avatar" mode="aspectFit" alt="">
					<text class="text-nickname">{{cardData.user.nickname}}</text>
				</view>
				<view class="flex-justify-end" @tap.stop="clickLike">
					<img class="icon-like" :src="cardData.is_liked?imgURLs.liked:imgURLs.like" mode="aspectFit" alt="">
					<text v-if="cardData.like_amount > 0" class="text-like-amount">{{cardData.like_amount}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			index: {
				type: Number,
				default: 0,
			},
			cardData: {
				type: Object,
				default: function() {
					return {
						id: 1,
						title: "post标题", // post的标题
						is_liked: false, // 是否已点赞
						like_amount: 0, // 点赞数
						thumbnail: "", // 预览图
						author: {
							avatar_uri: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJiauLTAOUcvdWYKQdMte77K88xABZwK33DEu37e1WKFbwOuKaJ9IQIAiaXB596lcz8N533U0N3ue4A/132',
							nick_name: "测试昵称"
						}, // 作者信息
						// imgEleHeight:0,  // 单位px
					}
				}
			},
		},
		data() {
			return {
				imgURLs: {
					like: "https://emall-oss-center.21b.cn/icon/icon-like.png",
					liked: "https://emall-oss-center.21b.cn/icon/icon-liked.png",
				},
			}
		},
		mounted() {
			let that = this
			this.$nextTick(() => {
				that.$nextTick(() => {
					uni.createSelectorQuery().in(that).select('#block-info-' + that.index)
						.boundingClientRect(data => {
							// Tips：开启运行时压缩代码会失效
							that.$emit('getInfoHeight', [that.index, data.height])
						}).exec();
				})
			})
		},
		methods: {

			clickLike() {
				console.log("like")
			},

			open() {
				console.log("open")
			},
		}
	}
</script>

<style lang="scss">
	.card-demo {
		overflow: hidden;
		border-radius: 16rpx;
		background: #fff;
		display: flex;
		justify-content: center;
		align-items: middle;
		flex-wrap: wrap;

		.span-user {
			width: 100%;
		}

		.img-avatar {
			width: 36rpx;
			height: 36rpx;
			min-width: 36rpx;
			border-radius: 100%;
			border-color: #fafafa;
			margin-right: 8rpx;
		}

		.icon-like {
			width: 24rpx;
			height: 24rpx;
			min-width: 24rpx;
			margin-right: 8rpx;
		}

		.case-name {
			max-width: 140rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

	:host {
		width: 100%;
	}

	image {
		width: 100%;
	}

	.span-info {
		width: 100%;
	}

	.text-name {
		white-space: pre-wrap;
	}

	.img-thumb {
		min-width: 100%;
		width: 100%;
		height: 100%;
	}

	.span-info {
		padding: 16rpx;
		display: flex;
		flex-wrap: wrap;
	}

	.text-title {
		width: 100%;
		display: block;
		font-size: 28rpx;
		line-height: 150%;
		font-weight: bold;
	}


	.bar-bottom {
		display: flex;
		justify-content: space-between;
		align-items: middle;
		width: 100%;
		margin-top: 12rpx;
	}

	.box-user {
		display: flex;
		justify-content: start;
	}

	.text-nickname {
		display: block;
		width: 100%;
		font-size: 20rpx;
		line-height: 150%;
		color: #606266;
	}

	.text-like-amount {
		display: block;
		width: 100%;
		font-size: 20rpx;
		color: #909399;
		line-height: 100%;
	}
</style>
