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
					<uni-datetime-picker v-model="single" @change="change"/>
				</view>
				<br>
				<h3 style="color: aqua;" v-if="this.role===1">距离秋招({{this.year}})年({{this.month}})个月({{this.day}})天,秋招前有({{this.number}})份及以上实习</h3>
			</view>
			<br>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				single: '',
				role:0,
				month:'',
				number:'',
				nowtime:'',
				year:'',
				day:''
			}
		},
		mounted(){
			this.single=Date.now();
		},
		computed:{
			isbutton() {
				return this.role===0
			}
		},
		methods: {
			change(e) {
				var date = new Date();
							this.single = e;
							this.role=1;
							console.log('change事件:', this.single = e);
							let year1=this.single.slice(0,4);
							let month1=this.single.slice(5,7);
							let day1=this.single.slice(8,10);
							this.year=year1-date.getFullYear();
							this.month=month1-date.getMonth()-1;
							this.day=day1-date.getDate();
							console.log('change事件:', year1,month1,day1);
				},
			next(){
				console.log("111")
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
	.conter{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.element{
		position:fixed;
		top:70%;
		justify-content:center ;
	}
</style>
