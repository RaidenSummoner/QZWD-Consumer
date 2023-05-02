<template>
	<view style="margin-top:128rpx">
		<wiidz-waterfall ref="Waterfall" :rows="rows" v-on:getHandledRows="getHandledRows"></wiidz-waterfall>
	</view>
</template>

<script>
	export default {
		components: {},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			this.page = {
				now: 1,
				size: 10,
			}
			this.newsList = []
			this.getPostList()
			uni.stopPullDownRefresh()
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: async function() {
			if (this.disabledGetMore) return
			let lengthBefore = this.rows.length // 翻页

			let page = this.page
			page.now++
			this.page = page
			await this.getRows()
			this.$refs.Waterfall.startRender()
			let lengthNow = this.rows.length
			if (lengthBefore == lengthNow) this.disabledGetMore = true
		},
		mounted() {
			this.getRows()
		},
		onReady() {

		},
		data() {
			return {
				page: {
					now: 1,
					size: 10,
				},
				disabledGetMore: false,
				rows: []
			}
		},
		methods: {
			// getrows : 获取数据
			async getRows() {
				// 加入分页后的数据
				let rows = this.rows
				let res = await this.simulateRemoteFunc(this.page.now, this.page.size) // 替换成具体的远程的方法
				if (!res[0]) {
					// 错误处理
					console.log("出错啦")
					this.disabledGetMore = true
					return
				}
				let temprows = res[1];
				rows = rows.concat(temprows); // 拼接老数据
				this.rows = rows
			},
			getHandledRows(rows) {
				this.rows = rows
			},
			// simulateRemoteFunc : 模拟方法
			async simulateRemoteFunc(page_now, page_size) {
				let that = this
				await this.sleep(1) // 模拟等待
				if (this.page.now >= 3) {
					return [false, "到底了"]
				}
				let rows = []
				for (let i = 1; i <= page_size; i++) {
					let id = (page_now - 1) * page_size + i
					rows.push({
						id: id,
						thumbnail: that.getRandomImg(),
						title: that.getRandomTitle(id),
						user: {
							id: 1,
							nickname: "test",
							avatar: that.getRandomAvatar(),
						},
					})
				}
				return [true, rows]
			},
			getRandomImg() {
				let imgURLs = [
					"https://anteras-open.oss-cn-hangzhou.aliyuncs.com/imgs/1-1.png",
					"https://anteras-open.oss-cn-hangzhou.aliyuncs.com/imgs/1-2.png",
					"https://anteras-open.oss-cn-hangzhou.aliyuncs.com/imgs/2-1.png",
					"https://anteras-open.oss-cn-hangzhou.aliyuncs.com/imgs/3-4.png",
					"https://anteras-open.oss-cn-hangzhou.aliyuncs.com/imgs/4-3.png",
					"https://anteras-open.oss-cn-hangzhou.aliyuncs.com/imgs/3-5.png",
					"https://anteras-open.oss-cn-hangzhou.aliyuncs.com/imgs/5-3.png",
				]
				return imgURLs[Math.ceil(Math.random() * 6)]
			},
			getRandomAvatar() {
				let imgURLs = [
					"https://anteras-open.oss-cn-hangzhou.aliyuncs.com/imgs/avatar-1.png",
					"https://anteras-open.oss-cn-hangzhou.aliyuncs.com/imgs/avatar-2.png",
					"https://anteras-open.oss-cn-hangzhou.aliyuncs.com/imgs/avatar-3.png",
					"https://anteras-open.oss-cn-hangzhou.aliyuncs.com/imgs/avatar-4.png",
					"https://anteras-open.oss-cn-hangzhou.aliyuncs.com/imgs/avatar-5.png",
					"https://anteras-open.oss-cn-hangzhou.aliyuncs.com/imgs/avatar-6.png",
					"https://anteras-open.oss-cn-hangzhou.aliyuncs.com/imgs/avatar-7.png",
				]
				return imgURLs[Math.ceil(Math.random() * 7)]
			},
			getRandomTitle(index) {
				let title = "【" + index + "】测试标题-"
				let addLength = Math.ceil(Math.random() * 40)
				for (let i = 0; i < addLength; i++) {
					let ascii = Math.ceil(Math.random() * 122)
					title += String.fromCharCode(ascii)
				}
				return title
			},
			sleep: function(time) {
				return new Promise(function(resolve, reject) {
					setTimeout(() => {
						resolve();
					}, time);
				});
			},
		}
	}
</script>

<style>
</style>
