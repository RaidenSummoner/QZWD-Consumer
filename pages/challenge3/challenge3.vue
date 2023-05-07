<template>
	<view class="container">
		<view class="conter">
			<h1>3/4</h1>
			<br>
			<h1>您的毕业时间是？</h1>
		</view>
		<br>
		<view>
			<view class="example-body">
				<uni-datetime-picker v-model="single" @change="change" />
			</view>
			<br>
			<!-- 蓝色提示文字 -->
			<view style="color: rgb(0, 204, 255); margin-top: 20rpx" v-show="role==1">{{ text }}</view>
			<!-- <view style="color: aqua;" v-if="role===1">距离秋招({{this.year}})年({{this.month}})个月({{this.day}})天,秋招前有({{this.number}})份及以上实习</view> -->
		</view>
		<br>
		<navigator url="../challenge4/challenge4" hover-class="navigator-hover">
			<button class="rounded-button" @click="next" v-bind:disabled="isbutton">下一步</button>
		</navigator>

	</view>
</template>

<script>
import {getDatePrompt} from '../../api/test'
export default {
	data() {
		return {
			single: '',
			role: 0,
			month: '',
			number: '',
			nowtime: '',
			year: '',
			day: '',
			text: '',
			question3: ''
		}
	},
	mounted() {
		this.single = Date.now();
	},
	computed: {
		isbutton() {
			return this.role === 0
		}
	},
	methods: {
		change(e) {
			var date = new Date();
			this.single = e;
			this.role = 1;
			console.log('change事件:', this.single = e);
			let year1 = this.single.slice(0, 4);
			let month1 = this.single.slice(5, 7);
			let day1 = this.single.slice(8, 10);
			this.year = year1 - date.getFullYear();
			this.month = month1 - date.getMonth() - 1;
			this.day = day1 - date.getDate();
			console.log('change事件:', year1, month1, day1);
			console.log("当前role: ",this.role)
			getDatePrompt(year1).then(res=>{
				if(res.code == 1){
					this.text = res.data;
				}
			})
			this.question3 = parseInt(year1);
		},
		next() {
			let data = this.$store.state.testData;
			data.question3 = this.question3;
			this.$store.commit('updateTest',data);
		},
		getNowDate() {
			var date = new Date();
			var sign2 = ":";
			var year = date.getFullYear(); // 年
			var month = date.getMonth() + 1; // 月
			var day = date.getDate(); // 日
			var weekArr = [
				"星期一",
				"星期二",
				"星期三",
				"星期四",
				"星期五",
				"星期六",
				"星期天",
			];
			var week = weekArr[date.getDay()];
			// 给一位数的数据前面加 “0”
			if (month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if (day >= 0 && day <= 9) {
				day = "0" + day;
			}
			this.nowTime = year + "-" + month + "-" + day;
		},

	}
}
</script>

<style>
.container {
	padding: 20px;
	font-size: 14px;
	line-height: 24px;
}

.conter {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.element {
	position: fixed;
	top: 70%;
	justify-content: center;
}

.rounded-button {
	width: 120px;
	/* 设置按钮宽度 */
	height: 50px;
	/* 设置按钮高度 */
	background-color: white;
	/* 设置按钮背景颜色 */
	border-radius: 15px;
	/* 设置按钮圆角半径 */
	color: black;
	/* 设置按钮字体颜色 */
	top: 100px;
	border: 1px solid black;
}</style>
