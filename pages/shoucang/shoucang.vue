<template>
	<view>

		<view>
			<view class="guess-section">
				<view v-for="(item, index) in infos" :key="index" class="guess-item" @click="navToDetailPage(item)">
					<!-- <view v-for="(item, index) in infos" :key="index" v-if="item.star===1" class="guess-item" @click="navToDetailPage(item)"> -->
					<view class="image-wrapper">
						<image :src="item.image" mode="aspectFill"></image>
					</view>
					<text class="title clamp">{{ item.title }}</text>
					<span class="hol">
						<span class="hole">{{ item.kind + " " + item.subKind }}</span>
						&nbsp

						<image v-if="item.star === 0" class="star" src="../../static/收藏.png" @click.stop="add(index)">
						</image>
						<image v-if="item.star === 1" class="star" src="../../static/收藏1.png" @click.stop="del(index)">
						</image>
						{{ item.num }}
					</span>
				</view>
			</view>

			<p>一天前</p>

			<br>
			<hr>
			<br>
		</view>
		<br>
		<view>
			<!-- <view v-for="(item,index) in courses" :key="index" v-if="item.star===1"> -->
			<view v-for="(item, index) in courses" :key="index">
				<view class="book" @click="jump">
					<view>
						<image class="pict" :src="item.image"></image>
					</view>
					<view class="content">
						<h4>{{ item.title }}</h4>
						<br>
						<h6>开课时间:{{ item.updateTime }}</h6>
					</view>
					<view class="star1">
						<image v-if="item.star === 0" class="star2" src="../../static/收藏.png" @click.stop="add1(index)">
						</image>
						<image v-if="item.star === 1" class="star2" src="../../static/收藏1.png" @click.stop="del1(index)">
						</image>
						<p>{{ item.num }}</p>
					</view>
				</view>
				<br>
			</view>
			<p>一年以前</p>
			<br>
			<hr>
		</view>
	</view>
</template>

<script>
import { getFavorites } from '../../api/favorites'
export default {
	data() {
		return {
			infos: [
				// 	{
				// 	image: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg",
				// 	image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554013048&di=a3dc9fd1406dd7bad7fbb97b5489ec04&imgtype=jpg&er=1&src=http%3A%2F%2Fimg009.hc360.cn%2Fhb%2FnKo44ac2656F831c684507E3Da0E3a26841.jpg",
				// 	image3: "http://img.zcool.cn/community/017a4e58b4eab6a801219c77084373.jpg",
				// 	title: "英语高强度补习班",
				// 	first: "案例分析",
				// 	second: "AI大数据",
				// 	num: 99,
				// 	sales: 16,
				// 	check: false,
				// 	star:1
				// }
			],
			courses: [
				// 	{
				// 	title: '产品经理集训营第1期',
				// 	time: '1-10 20:00',
				// 	num: 53,
				// 	star:1
				// }
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
		}
	},
	mounted() {
		this.getNowDate()
		console.log(uni.getStorageSync('userId'))
		getFavorites().then(res => {
			if (res.code == 1) {
				console.log(res.data)
				this.courses = res.data.lessons
				this.infos = res.data.contents
				console.log(this.infos)
			}
		})
	},
	methods: {
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
		add(e) {
			this.infos[e].num++;
			this.infos[e].star++
		},
		del(e) {
			this.infos[e].num--;
			this.infos[e].star--;
			this.infos.splice(e, 1);
		},
		add1(e) {
			this.courses[e].num++;
			this.courses[e].star++
		},
		del1(e) {
			this.courses[e].num--;
			this.courses[e].star--
		},
		navToDetailPage(e) {
			uni.navigateTo({
				url: '/pages/introduct/introduct'
			})
		},
		jump() {
			uni.navigateTo({
				url: '/pages/course/course'
			})
		}


	}
}
</script>

<style lang="scss">
.guess-section {
	display: flex;
	flex-wrap: wrap;
	padding: 0 30upx;
	top: 10px;

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
}

.star2 {
	float: right;
	font-size: 13px;
	width: 15px;
	height: 15px;
	right: 40px;
	bottom: 0px;
	text-align: right;
	margin-left: auto;
}

.star1 {

	margin-left: auto;
	right: 10px;
}

.star {
	width: 15px;
	height: 15px;
	margin-left: auto;
	right: 10px;
}

p {
	text-align: right;
	margin-left: auto;
	bottom: 4px;
	color: grey;
}

.pict {
	float: left;
	height: 120px;
	width: 100px;
	border-radius: 15px;
}

.content {
	position: relative;
	left: 10px;
	top: 25px;
}

.image-wrapper {
	width: 100%;
	height: 330upx;
	border-radius: 15px;
	overflow: hidden;

	/* image {
				width: 100%;
				height: 100%;
				opacity: 1;
			} */
}

.title {
	font-size: $font-lg;
	color: $font-color-dark;
	line-height: 80upx;

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
</style>