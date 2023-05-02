<template>
	<view class="post">
		<view>
			<view id="left">
				<view v-for="(item, index) in leftList" :key="index" class="item " @tap="postsTap(item)">
					<WaterfallsFlowItem :item="item" @del="postsTapDel" @imgLoad="imgLoad" />
				</view>
			</view>
		</view>
		<view>
			<view id="right">
				<view v-for="(item, index) in rightList" :key="index" class="item " @tap="postsTap(item)">
					<WaterfallsFlowItem :item="item" @del="postsTapDel" @imgLoad="imgLoad" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import WaterfallsFlowItem from './water-fall-item.vue'

	export default {
		components: {
			WaterfallsFlowItem,
		},

		props: {
			// 瀑布流列表
			wfList: {
				type: Array,
				require: true,
			},
			// 代码格式，有需求自行调配
			// [{
			// 		avatarUrl: "https://img0.baidu.com/it/u=2447135182,2703616006&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=607",
			// 		content: "这是一段内容",
			// 		images: "https://img0.baidu.com/it/u=2447135182,2703616006&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=607",
			// 		likeCount: 111,
			// 		nickName: "小明",
			// 		top: 1,
			// 		liked: false
			// 	},
			// 	{
			// 		avatarUrl: "https://img2.baidu.com/it/u=1902275754,442121690&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=501",
			// 		content: "这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容",
			// 		images: "https://img2.baidu.com/it/u=1902275754,442121690&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=501",
			// 		likeCount: 222,
			// 		nickName: "小红",
			// 		top: 1,
			// 		liked: false
			// 	},
			// 	{
			// 		avatarUrl: "https://img0.baidu.com/it/u=2862968767,567781450&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=607",
			// 		content: "我就像一阵风，只是从你的世界飘过",
			// 		images: "https://img0.baidu.com/it/u=2862968767,567781450&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=607",
			// 		likeCount: 999,
			// 		nickName: "jelly",
			// 		top: 1,
			// 		liked: false
			// 	},
			// 	{
			// 		avatarUrl: "https://img0.baidu.com/it/u=138834547,660632974&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=625",
			// 		content: "如果可以，我想我们互换",
			// 		images: "https://img0.baidu.com/it/u=138834547,660632974&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=625",
			// 		likeCount: 999,
			// 		nickName: "dd",
			// 		top: 1,
			// 		liked: false
			// 	}
			// ]
		},
		data() {
			return {
				allList: [], // 全部列表
				leftList: [], // 左边列表
				rightList: [], // 右边列表
				markdd: 0,
			}
		},

		watch: {
			wfList: function() {
				if (!this.wfList.length || this.wfList.length <= this.allList.length) {
					this.allList = []
					this.leftList = []
					this.rightList = []
					this.markdd = 0
				}
				if (this.wfList.length) {
					this.allList = this.wfList
					this.renderList()
				}
			},
			markdd() {
				const len = this.allList.length
				if (this.markdd < len && this.markdd !== 0) {
					this.renderList()
				}
			},
		},
		methods: {
			renderList() {
				const that = this
				const list = this.allList
				const len = list.length
				let i = this.markdd
				if (len > i) {
					const query = wx.createSelectorQuery().in(this)
					query
						.selectAll('#right , #left')
						.boundingClientRect()
						.exec(res => {
							let r = res[0]
							let leftH = i != 0 ? r[0].height : 0
							let rightH = i != 0 ? r[1].height : 0
							let leftList = that.leftList
							let rightList = that.rightList
							// console.log(`同步第${i}次`, leftH, rightH)
							if (i == leftList.length + rightList.length) {
								if (leftH <= rightH) {
									leftList.push(list[i])
								} else {
									rightList.push(list[i])
								}
							}
						})
				}
			},
			postsTap(item) {
				this.$emit('postsTap', {
					...item,
					type: 'jump'
				})
			},
			postsTapDel(item) {
				this.$emit('postsTap', {
					...item,
					type: 'del'
				})
			},
			imgLoad() {
				this.markdd++
			},
		},

	}
</script>

<style lang="scss" scoped>
	.post {
		display: flex;
		justify-content: space-between;
		padding: 0 60rpx;
	}

	.item {
		width: 300rpx;
		padding: 0 5rpx;
	}
</style>
