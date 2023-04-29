<template>
	<view>
		<view class="box">
			<image class="pict" src="../../static/notice.png"></image>
		<h4>张三</h4>
		</view>
		<view>
			<uni-list>
				<view @click="jump">
				<uni-list-item thumb="/static/logo.png" :show-extra-icon="true" showArrow :extra-icon="extraIcon" title="我的测评" />
				</view>
				<view @click="jump1">
				<uni-list-item thumb="/static/logo.png" :show-extra-icon="true" showArrow :extra-icon="extraIcon" title="我的收藏" />
				</view>
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{
						name:"我的测评"
					},
					{
						name:"我的收藏"
					},
					{
						
					}
				]
			}
		},
		methods: {
			jump(){
				uni.navigateTo({
					url:'/pages/pinggu/pinggu'
				})
			},
			jump1(){
				uni.navigateTo({
					url:'/pages/shoucang/shoucang'
				})
			}
		}
	}
</script>

<style>
	.box{
		height: 100px;
		width: 98%;
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
		height: 100px;
		width: 100px;
		border-radius: 30px;
	}
</style>
