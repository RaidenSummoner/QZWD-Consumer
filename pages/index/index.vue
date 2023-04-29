<template>
	<view class="page">
		<view v-if="role===0">
			<view class="rili">
				<view class="date">
					<span>{{nowTime[0].year}}年{{nowTime[1].month}}月{{nowTime[2].day}}日 &nbsp;{{nowTime[3].week}}</span>
				</view>
				<hr>
				<view class="date1">
					<view v-for="(info,index) in infos" :key="index">
						<span>
							距离<a style="color: aqua;">{{info.name}}</a>还剩<a style="color: aqua;">{{info.num}}</a>天
						</span><br>
						<span>距离四六级考试还剩<a style="color: aqua;">{{2}}</a>天</span><br>
					</view>
				</view>
			</view>
			<view class="guess-section">
				<view v-for="(item, index) in goodsList" :key="index" class="guess-item" @click="navToDetailPage(item)">
					<view class="image-wrapper">
						<image :src="item.image" mode="aspectFill"></image>
					</view>
					<text class="title clamp">{{item.title}}</text>
					<span class="hol">
						<span class="hole">{{item.first+" "+item.second}}</span>
						&nbsp

						<image v-if="item.star===0" class="star" src="../../static/收藏.png" @click.stop="add(index)">
						</image>
						<image v-if="item.star===1" class="star" src="../../static/收藏1.png" @click.stop="del(index)">
						</image>
						{{item.num}}
					</span>
				</view>
			</view>
			111
		</view>
	</view>

</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				role: 0,
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
				infos: [{
						name: "产品经理夏令营",
						num: '3'
					},
					{
						name: "产品经理夏令营",
						num: '3'
					}
				],
				goodsList: [{
						image: "https://ts3.cn.mm.bing.net/th?id=OIP-C.3-o-WBUIxf5Zg5egIcgtpAAAAA&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
						image2: "http://pic.rmb.bdstatic.com/819a044daa66718c2c40a48c1ba971e6.jpeg",
						image3: "http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg",
						title: "英语高强度补习班",
						first: "案例分析",
						second: "AI大数据",
						num: 99,
						sales: 61,
						check: false,
						star: 0,
					},
					{
						image: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg",
						image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554013048&di=a3dc9fd1406dd7bad7fbb97b5489ec04&imgtype=jpg&er=1&src=http%3A%2F%2Fimg009.hc360.cn%2Fhb%2FnKo44ac2656F831c684507E3Da0E3a26841.jpg",
						image3: "http://img.zcool.cn/community/017a4e58b4eab6a801219c77084373.jpg",
						title: "英语高强度补习班",
						first: "案例分析",
						second: "AI大数据",
						num: 99,
						sales: 16,
						check: false,
						star: 0,
					},
					{
						image: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg",
						image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554013048&di=a3dc9fd1406dd7bad7fbb97b5489ec04&imgtype=jpg&er=1&src=http%3A%2F%2Fimg009.hc360.cn%2Fhb%2FnKo44ac2656F831c684507E3Da0E3a26841.jpg",
						image3: "http://img.zcool.cn/community/017a4e58b4eab6a801219c77084373.jpg",
						title: "英语高强度补习班",
						first: "案例分析",
						second: "AI大数据",
						num: 99,
						sales: 16,
						check: false,
						star: 0,
					},
				],

			}
		},
		onLoad() {

		},
		mounted() {
			this.getNowDate()
		},
		methods: {
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
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
				this.nowTime[3].week = weekArr[date.getDay()];
				// 给一位数的数据前面加 “0”
				if (this.nowTime[1].month >= 1 && this.nowTime[1].month <= 9) {
					this.nowTime[1].month = "0" + this.nowTime[1].month;
				}
				if (this.nowTime[2].day >= 0 && this.nowTime[2].day <= 9) {
					this.nowTime[2].day = "0" + this.nowTime[2].day;
				}
			},
			
		}
	}
</script>

<style>
	.page {
		height: 100vh;
		width: 100vw;
		background-color: white;
	}

	.star {
		width: 15px;
		height: 15px;
		margin-left: auto;
		right: 10px;
	}

	.rili {
		position: relative;
		margin-left: auto;
		margin-right: auto;
		top: 5px;
		width: 80%;
		background-color: white;
		border-radius: 10px;
		border: 3px solid grey;
	}


	.date {
		text-align: center;
	}

	.date1 {
		left: 10px;
	}

	.guess-section {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx;

		.guess-item {
			display: flex;
			background-color: white;
			border-radius: 15px;
			/* 设置按钮圆角半径 */
			border: 1px solid black;
			flex-direction: column;
			width: 46%;
			padding-bottom: 40upx;

			&:nth-child(2n+1) {
				margin-right: 4%;
			}
		}

		.image-wrapper {
			width: 100%;
			height: 330upx;
			border-radius: 15px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}

		.title {
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;

		}

		.hol {
			display: flex;
			font-size: 4px;
			line-height: 2.5;
			color: gray;
			margin-left: 2px;
		}

		.hole {
			font-size: $font-lg;
			overflow: hidden;
			font-size: 4px;
			white-space: nowrap;
			margin-left: 1em;
			margin-right: 1em;
		}
	}
</style>