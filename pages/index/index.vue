<template>
	<view class="page">
		<view class="rili">
			<view class="date">
				<span>{{nowTime[0].year}}年{{nowTime[1].month}}月{{nowTime[2].day}}日 &nbsp;{{nowTime[3].week}}</span>
			</view>
			<hr>
			<view class="date1">
				
				<!-- <view v-for="(info,index) in infos" :key="index">
					
					<span>
						距离<a style="color: aqua;">{{info.name}}</a>还剩<a style="color: aqua;">{{info.num}}</a>天
					</span><br>
					<span>距离四六级考试还剩<a style="color: aqua;">{{2}}</a>天</span><br>
				</view> -->
				<yealuo-select the-style="margin: 20upx auto;font-size: 46upx;" 
						value="选项2" 
						item-key="value" 
						:binData="data2"
						checkType="checkbox"
						tags="name"
						inputStyle=""
						selectStyle=""
						overflow="hide"
						@getBackVal="getBackVal"
						:selectIco="true"
						>
						</yealuo-select>
			</view>
			
		</view>
		<br>
		<view class="down">
		<zero-waterfall :list="dataList" @click="navToDetailPage">
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
	</view></view>
</template>

<script>
	export default {
		data() {
			return {
				role: 0,
				isShow:false,
				data2: [
					{id: 1, value: '四六级考试',day1:6},
					{id: 2, value: '期末考试',day1:6},
					{id: 3, value: '普通话考试',day1:6},
					{id: 4, value: '雅思考试',day1:6},
				],
				nowTime: [{
						year: ''
					},
					{
						month: ''
					},
					{
						day: ''
					},
					{
						week: ''
					},
				],
				columnList: [], //分配后的每列图片
				columWidth: 0, //每列宽度
				columnCount: 2, //显示几列
				infos: [{
						name: "产品经理夏令营",
						num: '3'
					},
					{
						name: "产品经理夏令营",
						num: '3'
					}
				],
				arr: [{
						id: 1,
						url: "https://ts3.cn.mm.bing.net/th?id=OIP-C.3-o-WBUIxf5Zg5egIcgtpAAAAA&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
						title: "英语高强度补习班英语高强度补习班",
						first: "案例分析",
						second: "AI大数据",
						num: 99,
						star: 0,
					},
					{
						id: 2,
						url: "https://ts4.cn.mm.bing.net/th?id=OIP-C.yAlx1GaXbzwas9x7JSFJBQHaFP&w=297&h=210&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
						title: "英语高强度补习班英语高强度补习班",
						first: "案例分析",
						second: "AI大数据",
						num: 99,
						star: 0,
					},
					{
						id: 3,
						url: "https://ts4.cn.mm.bing.net/th?id=OIP-C.F1kR5M4E7LznaGkvKgC8bwHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
						title: "英语高强度补习班英语高强度补习班",
						first: "案例分析",
						second: "AI大数据",
						num: 99,
						star: 0,
					},
					{
						id: 4,
						url: "https://ts4.cn.mm.bing.net/th?id=OIP-C.yAlx1GaXbzwas9x7JSFJBQHaFP&w=297&h=210&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
						title: "英语高强度补习班英语高强度补习班",
						first: "案例分析",
						second: "AI大数据",
						num: 99,
						star: 0,
					},
					{
						id: 5,
						url: "https://ts4.cn.mm.bing.net/th?id=OIP-C.yAlx1GaXbzwas9x7JSFJBQHaFP&w=297&h=210&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
						title: "英语高强度补习班aaaaaaaaaaaa",
						first: "案例分析",
						second: "AI大数据",
						num: 99,
						star: 0,
					},
					{
						id: 6,
						url: "https://tse2-mm.cn.bing.net/th/id/OIP-C.jgZ0YJ6mYqgy-DCqiS2NKQHaFj?w=250&h=188&c=7&r=0&o=5&dpr=1.5&pid=1.7",
						title: "英语高强度补习班",
						first: "案例分析",
						second: "AI大数据",
						num: 99,
						star: 0,
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
			this.dataList = this.arr.slice(0, 5)

		},
		mounted() {
			this.getNowDate()
			this.$nextTick(() => {
				this.setWaterFallLayout();
			})
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

			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			navToDetailPage(e) {
				uni.navigateTo({
					url: '/pages/introduct/introduct'
				})
			},
			add(e) {
				this.goodsList[e].num++;
				this.goodsList[e].star++
			},
			del(e) {
				this.goodsList[e].num--;
				this.goodsList[e].star--
			},
			onTab(index, item) {
				console.log(index, item)
				this.role = index
				if (this.role === 1) {
					uni.switchTab({
						url: '/pages/improve/improve'
					})
				} else if (this.role === 2) {
					uni.switchTab({
						url: '/pages/myself/myself'
					})
				} else {
					uni.switchTab({
						url: '/pages/index2/index2'
					})
				}
			},
			onTab(index, item) {
				console.log(index, item)
				this.role = index
				if (this.role === 1) {
					uni.switchTab({
						url: '/pages/improve/improve'
					})
				} else if (this.role === 2) {
					uni.switchTab({
						url: '/pages/myself/myself'
					})
				} else {
					uni.switchTab({
						url: '/pages/index/index'
					})
				}
			},
			async setWaterFallLayout() {
				for (let item of this.goodsList) {
					let columnHeight = this.$refs.column.map((item) => item.clientHeight); //每列高度数组
					let min = Math.min(...columnHeight); //找出最小高度值
					let index = columnHeight.findIndex((item) => item === min); //找出最小高度列的索引
					this.columnList[index].push(item); //放入图片
					await this.$nextTick(); //等待渲染完成后重新比较高度
				}
			},
			navToDetailPage(e) {
				uni.navigateTo({
					url: '/pages/introduct/introduct'
				})
			},
			getNowDate() {
				var date = new Date();
				var sign2 = ":";
				this.nowTime[0].year = date.getFullYear(); // 年
				this.nowTime[1].month = date.getMonth() + 1; // 月
				this.nowTime[2].day = date.getDate(); // 日
				var weekArr = [
					"星期一",
					"星期二",
					"星期三",
					"星期四",
					"星期五",
					"星期六",
					"星期天",
				];
				this.nowTime[3].week = weekArr[date.getDay() - 1];
				// 给一位数的数据前面加 “0”
				if (this.nowTime[1].month >= 1 && this.nowTime[1].month <= 9) {
					this.nowTime[1].month = "0" + this.nowTime[1].month;
				}
				if (this.nowTime[2].day >= 0 && this.nowTime[2].day <= 9) {
					this.nowTime[2].day = "0" + this.nowTime[2].day;
				}
			},
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
	.page {
		height: 100%;
		width: 100vw;
		background-color: GhostWhite ;
	}

	.icon1 {
		text-align: center;
	}

	.rili {
		position: relative;
		margin-left: auto;
		margin-right: auto;
		top: 5px;
		width: 94%;
		background-color: white;
		border-radius: 10px;
	}
	.down{
		top: 20px;
	}
	.date {
		text-align: center;
	}

	.date1 {
		left: 10px;
	}
</style>