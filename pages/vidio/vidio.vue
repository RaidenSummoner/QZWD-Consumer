<template>
	<view>
		<view class="down">
			<hr>
			<view>
				<span>介绍内容</span>
				<a @click="share()" class="zhuanfa">转发</a><a @click="collect()" class="shoucang">收藏</a></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.zhuanfa{
		position: absolute;
		left:100px;
	}
	.shoucang{
		position: absolute;
		left:270px;
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
