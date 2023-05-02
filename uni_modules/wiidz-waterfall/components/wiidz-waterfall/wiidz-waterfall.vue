<!--瀑布流文章-->
<template>
	<view>
		<view class="container-fall" :style="'padding:0 '+paddingOut+'rpx'">
			<view v-for="(item,index) in handledListData" :key="index" :id="'column-'+index" class="column"
				:style="[columnStyleObj]">
				<block v-for="(goods, goodsIndex) in item" :key="goodsIndex">
					<DemoCard :index="goods.index" :cardData="goods" v-on:getInfoHeight="getInfoHeight"
						:style="'margin-bottom:'+spacing+'rpx'"></DemoCard>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import DemoCard from "./wiidz-demo-card"
	import asyncPool from "tiny-async-pool";

	const PostApi = require("@js/apiConsumer/post").default;
	const Tool = require("@js/miniHelper/tool").default;
	const WechatNetwork = require("@js/miniHelper/network").default;

	const App = getApp()
	const InfoDefaultHeight = 40 // 根据项目自行修改，单位px

	export default {
		name: "WaterFallGoods",
		components: {
			DemoCard
		},
		props: {
			rows: {
				type: Array,
				default: []
			},
			paddingOut: {
				type: Number,
				default: 32 // 单位rpx
			},
			spacing: {
				type: Number,
				default: 16 // 单位rpx
			},
			isPull: {
				type: Boolean,
				default: false, //是否下拉刷新，是的话清除之前的数据
			},
			columnAmount: {
				type: Number,
				default: 2,
			}
		},
		data() {
			return {
				isReset: false, //标识，是否重置
				isiInitialized: false, // 标识，新加入的元素是否已初始化
				isHandled: false, // 标识，新加入的元素是否已处理
				trueHeights: [], // 真实高度数组
				trueAmounts: [], // 真实的列行数数量，数组
				mixedHeights: [], // 真假混合的高度数组（已处理的真实高度+预处理的高度）
				handledRows: [], // post元数据
				infoHeights: [], // 按index依次存放各个元素的底部说明的高度
				handledListData: [], // 二维数组，用于页面上的渲染
				columnStyleObj: {}, // 样式，列
				columnWidth: 0,
				maxHeight: 0, // 预设的单个图片元素的最高高度
				requireImgWidth: 0, // oss不能读取小数，这里采用二倍图的方案（计算得）
			}
		},
		computed: {
			// 处理过后的列表数据，主要是处理缩略图
			handle() {
				this.reset()
				this.handledRows = this.rows
				if (!this.isiInitialized && this.handledRows.length > 0) {
					this.initHandledData()
				}
			},
		},
		methods: {
			// 获取列的样式
			getColumnStyleObj() {
				// spacing 和 列数都是初始化完毕就不让调整了
				let that = this
				let paddingOutPx = Tool.getPx(this.paddingOut) // 计算外边距
				let spacingPx = Tool.getPx(this.spacing) // 计算内间距

				this.columnWidth = (App.globalData.systemInfo.screenWidth - paddingOutPx * 2 - spacingPx * (this
					.columnAmount - 1)) / this.columnAmount //计算 瀑布流展示的宽度
				this.maxHeight = this.columnWidth * 1.5 //计算瀑布流的最大高度，防止长图霸屏

				this.columnStyleObj = {
					"width": that.columnWidth + "px",
					"margin-right": that.spacing + "rpx",
				}

				this.requireImgWidth = Math.round(this.columnWidth * 2) // oss 不能读取小数，这里采用二倍图的方案
			},

			// 初始化数据，不考虑各个元素的高度，按顺序依次填充
			initHandledData() {
				let that = this
				let rows = this.handledRows
				let handledListData = this.handledListData
				let mixedHeights = this.mixedHeights
				let infoHeights = this.infoHeights

				rows.forEach((v, k) => {
					if (v.trueColumn == undefined) {
						rows[k].index = k // 标识
						rows[k].imgEleWidth = parseInt(that.columnWidth); // 列的宽度
						rows[k].imgEleHeight = parseInt(that.columnWidth); // 预设都是正方形
						// rows[k].thumbnail = v.thumbnail_img + "?x-oss-process=image/resize,w_" + that.requireImgWidth
						rows[k].name = v.name_cn
						rows[k].price = v.lowest_price

						let minIndex = that.getMinHeightIndex(mixedHeights)
						rows[k].tempColumn = minIndex // 临时的列，记得删掉
						mixedHeights[minIndex] += InfoDefaultHeight + rows[k].imgEleHeight
						handledListData[minIndex].push(rows[k])
						infoHeights.push(0)
					}
				})

				this.handledRows = rows
				this.mixedHeights = mixedHeights
				this.infoHeights = infoHeights
				this.handledListData = handledListData
				this.isiInitialized = true
			},
			// 获取高度数组里最小的那个
			getMinHeightIndex(heights) {
				let length = heights.length
				if (length === 1) {
					return 0
				}

				let minIndex = 0
				let minHeight = heights[minIndex]

				for (let i = 1; i < length; i++) {
					if (minHeight > heights[i]) {
						minHeight = heights[i]
						minIndex = i
					}
				}
				return minIndex
			},
			getMaxHeightIndex(heights) {
				let length = heights.length
				if (length === 1) {
					return 0
				}

				let maxIndex = 0
				let maxHeight = heights[maxIndex]

				for (let i = 1; i < length; i++) {
					if (maxHeight < heights[i]) {
						maxHeight = heights[i]
						maxIndex = i
					}
				}
				return maxIndex
			},
			// 获取高度数组里最大值
			getMaxHeight(heights) {
				let maxHeight = heights[0]
				for (let i = 1; i < heights.length; i++) {
					if (maxHeight < heights[i]) {
						maxHeight = heights[i]
					}
				}
				return maxHeight
			},
			// 向父节点汇报高度
			reportNodeHeight(heights) {
				let that = this
				if (heights.length === 0) {
					return
				}
				const query = uni.createSelectorQuery().in(this);
				let maxIndex = that.getMaxHeightIndex(heights)
				query.select('#column-' + maxIndex).boundingClientRect(data => {
					that.$emit("getNodeHeight", data.height)
				}).exec();
			},
			// getInfoHeight：获取该元素除了图片以外，下方的信息的高度
			async getInfoHeight(data) {

				let index = data[0]
				let infoHeight = data[1]

				let heights = this.infoHeights
				heights[index] = infoHeight
				this.infoHeights = heights

				if (index === this.rows.length - 1 && !this.isHandled) {
					// 说明最后一个也加载完了，可以开始调整顺序
					await this.optimizeListData()
				}
			},
			// 优化排列规则
			async optimizeListData() {

				let that = this
				let rows = this.handledRows

				let handledListData = this.handledListData
				let trueHeights = this.trueHeights
				let trueAmounts = this.trueAmounts // 用于存放已经被调整过的项目

				let unhandledRows = []

				rows.forEach((v, k) => {
					if (v.trueColumn == undefined) {
						unhandledRows.push(v)
					}
				})

				//【1】异步加载全部的图片
				let imgURLs = []
				for (let i = 0, len = unhandledRows.length; i < len; i++) {
					imgURLs.push(unhandledRows[i].thumbnail)
				}
				let res = await asyncPool(5, imgURLs, WechatNetwork.getImgSize); // 小程序多线程不能超过10

				//【2】逐一处理
				let spacingPx = Tool.getPx(this.spacing)
				for (let i = 0, len = unhandledRows.length; i < len; i++) {

					let tmp = unhandledRows[i]
					let size = res[i]

					tmp.picWidth = parseInt(size.width); // 图片真实宽度
					tmp.picHeight = parseInt(size.height); // 图片真实高度
					tmp.imgEleWidth = that.columnWidth // 图片元素的宽度

					let per = tmp.picWidth / tmp.imgEleWidth; // 图片宽高比
					tmp.imgEleHeight = tmp.picHeight / per; // 图片元素的高度

					if (tmp.imgEleHeight > that.maxHeight) {
						tmp.imgEleHeight = that.maxHeight; //image 高度，不超过最大高度
					}

					let minIndex = that.getMinHeightIndex(trueHeights)
					let infoHeight = this.infoHeights[tmp.index]
					tmp.trueColumn = minIndex // 真实的列

					trueHeights[minIndex] += tmp.imgEleHeight + infoHeight + spacingPx // 注意计算 图片高度 + 下方信息高度 + spacing
					trueAmounts[minIndex]++

					// 计算真实的位置
					let tempRow = this.getIndex(handledListData[tmp.tempColumn], tmp.index) // 当前所处的行

					handledListData[tmp.tempColumn].splice(tempRow, 1) // 删除原来的位置
					handledListData[minIndex].splice(trueAmounts[minIndex], 0,
						tmp); // 在索引为trueAmounts[minIndex]的位置插入temp

					// 【附加】将handledRows里也进行修改
					let handledRowIndex = this.getIndex(rows, tmp.index) // 当前所处的行
					rows[handledRowIndex] = tmp
				}

				this.handledListData = handledListData
				this.trueAmounts = trueAmounts
				this.trueHeights = trueHeights
				this.mixedHeights = trueHeights
				this.isHandled = true
				this.handledRows = rows // 附加

				this.$emit("getHandledRows", rows)

				// 汇报整个节点的高度
				that.$nextTick(() => {
					that.reportNodeHeight(trueHeights)
				})
			},
			getIndex(slice, niddleIndex) {
				let index = -1
				for (let i = 0; i < slice.length; i++) {
					if (slice[i].index === niddleIndex) {
						index = i
						break
					}
				}
				return index
			},
			// 重置数据
			reset() {
				if (this.isReset) {
					return
				}
				this.startRender()
				this.getColumnStyleObj() // 注意，列样式不随动
				let that = this
				this.handledRows = []

				this.handledListData = Array.from({
					length: that.columnAmount
				}, () => [])

				this.heights = Array.from({
					length: that.columnAmount
				}, () => 0)

				this.trueHeights = Array.from({
					length: that.columnAmount
				}, () => 0)

				this.trueAmounts = Array.from({
					length: that.columnAmount
				}, () => 0)

				this.mixedHeights = Array.from({
					length: that.columnAmount
				}, () => 0)

				this.infoHeights = []

				this.page = {
					now: 1,
					size: 10,
				}

				this.isReset = true
			},
			// 开启渲染
			startRender() {
				this.isHandled = false
				this.isiInitialized = false
			},
			// 重新开启渲染
			restartRender() {
				this.isReset = false
				this.isHandled = false
				this.isiInitialized = false
			},
		}
	}
</script>

<style scoped lang="scss">
	.column {
		display: flex;
		flex-direction: column;
	}

	.column:last-child {
		margin-right: 0 !important;
	}

	.container-fall {
		width: 100%;
		max-width: 100vw;
		display: flex;
	}
</style>
