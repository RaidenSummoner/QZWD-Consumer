<template>
	<view>
		<view class="image-wrapper">
			<image @click="jump" class="imgg" src="../../static/logo.png" mode="aspectFill"></image>
		</view>
		<view>
			<h3>{{item.title}}</h3>
			<h2>项目简介</h2>
			<br>
			<h4>
				{{item.content}}
			</h4>
			<br>
			<h2>时间安排</h2>
			<br>
			<h4>第一节-用户体验</h4>
			<br>
			<h2>讲师简历</h2>
			<h4>{{item.introduce}}</h4>
		</view>
		<view class="down">
			<hr>
			<view>
				<image src="../../static/转发.png" class="zhuan"></image><a @click="share()" class="zhuanfa">转发</a>
				<image src="../../static/收藏.png" class="shou" @click="star"></image>
				<a @click="collect()" class="shoucang">收藏</a></view>
		</view>
	</view>
</template>

<script>
	import {addFavorites, deleteFavorites} from '../../api/favorites'
	export default {
		data() {
			return {
				item: {
					contentId: '1659105766260563970',
					title: "产品经理集训营-第一期",
					content: "基于'MBTI'产品",
					introduce: "老师简介",
					star: 0
				}
			}
		},
		methods: {
			collect() {
				console.log("已收藏")
				alert("已收藏")
			},
			share() {
				console.log("已分享")
				alert("已分享")
			},
			jump(){
				uni.navigateTo({
					url: '/pages/vidio/vidio'
				})
			},
			async star(){
				const userId = await uni.getStorageSync('userId')
				const params = {
					contentId: this.item.contentId,
					category: 2,	//2表示课程
					userId: userId
				}
				if(!this.item.star){
					addFavorites(params).then(res=>{
						if(res.code==1){
							uni.showToast({
								title: '收藏成功',
								icon: 'success',
								mask: true
							})
						}
					})
				}
				else{
					deleteFavorites(params).then(res=>{
						if(res.code==1){
							uni.showToast({
								title: '取消收藏成功',
								icon: 'success',
								mask: true
							})
						}
					})
				}
			}
		}
	}
</script>

<style>
	.image-wrapper {
		width: 100%;
		height: 500upx;
		border-radius: 15px;
		overflow: hidden;

		/* image {
			width: 100%;
			height: 100%;
			opacity: 1;
		} */
	}

	.imgg {
		width: 100%;
		height: 100%;
		opacity: 1;
	}

	.zhuanfa {
		position: absolute;
		left: 100px;
	}

	.shoucang {
		position: absolute;
		left: 270px;
	}

	.zhuan {
		width: 15px;
		height: 15px;
		left: 75px;
	}

	.shou {
		width: 15px;
		height: 15px;
		left: 230px;
	}

	.down {
		position: absolute;
		margin-left: auto;
		margin-right: auto;
		bottom: 0px;
		width: 100%;
		height: 50px;
		line-height: 50px;
		margin-left: auto;
		margin-right: auto;
	}
</style>