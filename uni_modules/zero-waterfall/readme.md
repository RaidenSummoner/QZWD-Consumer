# zero-waterfall


## 使用方法

### 需结合 `zero-lazy-load` 图片懒加载一起使用
 ```
<template>
	<view class="content">
		<zero-waterfall :list="dataList">
			<!--  #ifdef  MP-WEIXIN -->
			<view v-for="(item, index) of dataList" :key="index" slot="slot{{item.id}}">
				<view class="cnt">
					<view class="text">{{ item.extra }}</view>
				</view>
			</view>
			<!--  #endif -->

			<!-- #ifndef  MP-WEIXIN -->
			<template v-slot:default="item">
				<view class="cnt">
					<view class="text">{{ item.extra }}</view>
				</view>
			</template>
			<!-- #endif -->
		</zero-waterfall>
		<uni-load-more bg-color="rgb(240, 240, 240)" :status="loadStatus" @clickLoadMore='loadMore'></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arr: [{
						id: 1,
						url: "https://gimg2.baidu.com/imag_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp09%2F21052112102250D-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643473244&t=b5e08380ae592167bc023b5809a46d1e",
						title: "网络图片1(错误的图片地址)",
						note: "网络图片1,已经失效的图片",
						extra:'自定义slot信息',

					},
					{
						id: 2,
						url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp09%2F21052112102250D-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643473244&t=b5e08380ae592167bc023b5809a46d1e",
						title: "网络图片2",
						note: "网络图片2,可能会失效!网络图片,可能会失效!网络图片,可能会失效!",
						extra:'自定义slot信息',
					},
					{
						id: 3,
						url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp09%2F210611094Q512b-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643473244&t=72c2f08503aeba6b3988f2d96f83775e",
						title: "网络图片3",
						note: "网络图片3,可能会失效!",
						extra:'自定义slot信息',
					},
					{
						id: 4,
						url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0628%2F29618e08j00qverj7001ec000ci00loc.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643473244&t=f1af25d8ea22fda465b7f3e37d9c9fa7",
						title: "网络图片4",
						note: "网络图片4,可能会失效!网络图片,可能会失效!",
						extra:'自定义slot信息',
					},
					{
						id: 5,
						url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2F1114%2F0G320103935%2F200G3103935-1-1200.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643473244&t=f65fa05e38a04d9544a46af86f94b7e8",
						title: "网络图片5",
						note: "网络图片5,可能会失效!",
						extra:'自定义slot信息',
					},
					{
						id: 6,
						url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp01%2F1ZZQ20QJS6-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643473244&t=85113db32df432853292930e541c1af5",
						title: "网络图片6",
						note: "网络图片6,可能会失效!网络图片,可能会失效!",
						extra:'自定义slot信息',
					},
					{
						id: 7,
						url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0531%252F0a85fb25j00qtxwjo000ic000hs00hsc.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643473244&t=4d51c25fa34adee1c02af11d65e910ac",
						title: "网络图片7",
						note: "网络图片7,可能会失效!网络图片,可能会失效!网络图片,可能会失效!",
						extra:'自定义slot信息',
					},
				],
				loading: false,
				dataList: [],
				loadStatus: 'more',
				page: 1,
				pageSize: 5,
			}
		},
		created() {
			this.dataList =this.arr.slice(0,5)
		},
		onReachBottom() {
			if (this.dataList.length >= this.arr.length) {
				this.loadingStatus = 'noMore'
			} else {
				this.loadStatus = 'more';
				setTimeout(() => {
					this.loadMore();
					this.loadStatus = 'loadmore';
				}, 1000)
			}

		},
		methods: {
			// 模拟数据加载
			loadMore() {
				this.loadStatus = 'loading';
				this.page++
				this.dataList = this.dataList.concat(this.arr.slice(this.dataList.length, this.page * this.pageSize))
			},

		}
	}
</script>

<style lang="scss" scoped>

</style>



 ```
 
 
## 参数说明

|参数		|类型	|默认值	|描述			|
|--			|--		|--		|--				|
|list		|Array	|[]	|列表数据，全部传入即可			|
|imgMode	|String	|widthFix	|widthFix		|

插件预览:
![code](https://img.jszero.cn/mweb/we_code.jpg)