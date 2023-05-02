<template>
	<view class="item" id="item">
		<view class="img">
			<image :src="thread.images" mode="widthFix" @load="imgLoad" class="image" />
		</view>

		<view class="content" id="content">
			<view class="article">{{ thread.content }}</view>
			<view class="user">
				<view class="user-info">
					<view class="user-face">
						<image class="user-image" :src="thread.avatarUrl" mode="" />
					</view>
					<view class="user-name">{{ thread.nickName }}</view>
				</view>
				<view class="user-likes">
					<image
						src="https://img2.baidu.com/it/u=3625088017,672579043&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
						class="user-likes-icon" @click.stop="postLike()" />
					{{ thread.likeCount }}
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		props: {
			item: {
				type: Object,
				require: true,
			},
		},
		inject: {
			theme: {
				//函数式组件取值不一样
				default: () => ({}),
			},
		},
		data() {
			return {
				userInfo: '',
				sort: '',
				thread: {},
				showModal: false,
			}
		},

		watch: {
			item: {
				handler() {
					this.thread = this.item
				},
				immediate: true,
			},
		},
		methods: {
			// 可以自行把点赞换成删除按钮，记得换图标
			postDel() {
				this.$emit('del', this.thread)
			},
			postLike() {
				this.thread.liked = !this.thread.liked
				if (this.thread.liked) {
					this.thread.likeCount++
				} else {
					this.thread.likeCount--
				}
			},
			imgLoad(e) {
				this.$emit('imgLoad')
			},
		},
	}
</script>

<style lang="scss" scoped>
	.item {
		background: #fff;
		overflow: hidden;
		font-family: Source Han Sans CN;
	}

	.img {
		position: relative;

		.remark {
			height: 30rpx;
			width: 72rpx;
			position: absolute;
			top: 20rpx;
			left: 20rpx;
			line-height: 30rpx;
			font-size: 20rpx;
			text-align: center;
			color: #0c8e41;
			background-color: #ffffff;
			// border: 2rpx solid #0c8e41;
			border-radius: 15rpx;
		}

		.image {
			display: block;
			width: 100%;
			// 默认设置一个图片的大约值
			height: 300rpx;
		}
	}

	.content {
		margin-top: 16rpx;
		margin-bottom: 40rpx;

		.article {
			width: 300rpx;
			margin-top: 17rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: #333333;
			overflow: hidden;
			text-overflow: ellipsis;
			word-break: break-all;
			display: -webkit-box;
			/*必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。*/
			-webkit-line-clamp: 2;
			/*用来限制在一个块元素显示的文本的行数。*/
			-webkit-box-orient: vertical;
			/*必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。*/
		}

		.user {
			height: 50rpx;
			margin-top: 21rpx;
			// line-height: 60rpx;
			color: #999999;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 24rpx;

			.user-info {
				display: flex;
				align-items: center;

				.user-face {
					width: 48rpx;
					height: 48rpx;

					.user-image {
						width: 48rpx;
						height: 48rpx;
						border-radius: 50%;
					}
				}

				.user-name {
					margin-left: 10rpx;
					width: 159rpx;
					overflow: hidden;
					white-space: nowrap;
				}
			}

			.user-likes {
				display: flex;
				align-items: center;
				font-family: SFUIDisplay;
				font-size: 22rpx;

				.user-likes-icon {
					height: 28rpx;
					width: 25rpx;
					margin-right: 11rpx;
				}
			}

			.user-del {
				height: 38rpx;
				width: 38rpx;

				.user-del-icon {
					height: 38rpx;
					width: 38rpx;
				}
			}
		}
	}
</style>
