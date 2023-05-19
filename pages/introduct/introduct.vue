<template>
	<view>
		<view class="image-wrapper">
			<image class="imgg" src="../../static/logo.png" mode="aspectFill"></image>
		</view>
		<view>
			<h2>{{item.title}}大厂产品经理</h2>
			<br>
			<h5>{{item.first}} &nbsp;{{item.second}}</h5>
			<view>
				&nbsp;&nbsp;{{item.content}}大概在十年前.....
			</view>
		</view><br>
		<hr>
		<br>
		<h4>推荐课程:</h4>
		<br>
		<view class="book" @click="jump">
			<view>
				<image class="pict" src="../../static/th.jpg"></image>
			</view>
			<view class="content">
				<h4>{{item.name}}</h4>
				<br>
				<h6>开课时间:{{item.time}}</h6>
			</view>
			<br>
			<br>
			<view class="star1">
				<image v-if="item.star===0" class="star" src="../../static/收藏.png" @click.stop="add(index)"></image>
				<image v-if="item.star===1" class="star" src="../../static/收藏1.png" @click.stop="del(index)"></image>
				<p>{{item.num}}</p>
			</view>
		</view>
		<br>
		<view class="down">
			<hr>
			<view>
				<image src="../../static/转发.png" class="zhuan"></image><a @click="share()" class="zhuanfa">转发</a>
				<image src="../../static/收藏.png" class="shou" @click="collect"></image>
				<a class="shoucang">收藏</a>
			</view>
		</view>
	</view>

</template>

<script>
	import {addFavorites} from '../../api/favorites'
	export default {
		data() {
			return {
				item: {
					contentId: '1643457990705033217',
					title: '11',
					first: '行业资讯',
					second: '产品',
					content: '大概十年前',
					name: '产品经理集训营第1期',
					time: '1-10 20:00',
					num: 53,
					star: 0,
				},
				check: false
			}
		},
		methods: {

			add(e) {
				this.item.num++;
				this.item.star++
			},
			del(e) {
				this.item.num--;
				this.item.star--
			},
			share() {
				console.log("已分享")
				alert("已分享")
			},
			jump() {
				uni.navigateTo({
					url: '/pages/course/course'
				})
			},
			async collect(){
				const userId = await uni.getStorageSync('userId')
				const params = {
					contentId: this.item.contentId,
					category: 1,	//1表示资讯
					userId: userId
				}
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
		}
	}
</script>

<style lang="scss">
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

	.imgg {
		width: 100%;
		height: 100%;
		opacity: 1;
	}

	.content {
		position: relative;
		left: 10px;
		top: 25px;
	}

	.star {
		float: right;
		font-size: 13px;
		width: 15px;
		height: 15px;
		right: 40px;
		bottom: 0px;
		text-align: right;
		margin-left: auto;
	}

	p {
		text-align: right;
		margin-left: auto;
	}

	.star1 {

		margin-left: auto;
		right: 10px;
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

	.zhuanfa {
		position: absolute;
		left: 100px;
	}

	.shoucang {
		position: absolute;
		left: 270px;
	}

	.book {
		height: 100px;
		width: 90%;
		background-color: white;
		border-radius: 15px;
		/* 设置按钮圆角半径 */
		border: 3px solid grey;
		flex-direction: column;
		padding-bottom: 40upx;
		margin-left: auto;
		margin-right: auto;

		&:nth-child(2n+1) {
			margin-right: 4%;
		}
	}

	.pict {
		float: left;
		height: 120px;
		width: 100px;
		border-radius: 15px;
	}
</style>