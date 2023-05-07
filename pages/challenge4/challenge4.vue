<template>
	<view class="container">
		<view class="conter">
			<h1>4/4</h1>
			<br>
			<h1>您的专业是？</h1>
		</view>
		<br>
		<view>
			<view class="example-body">

				<view class="example-body">
					<uni-combox :candidates="candidates" placeholder="请选择专业" v-model="speciality"
						@input="changerole"></uni-combox>
				</view>
			</view>
			<br>
			<h3 style="color: rgb(0, 204, 255); margin-top: 20rpx" v-if="role===1">已完成基础测评,快查看结果吧！</h3>
		</view>
		<br>
		<button class="rounded-button" @click="next" v-bind:disabled="isbutton">查看结果</button>

	</view>
</template>

<script>
import { getMajor } from '../../api/test'
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
			searchText: '', // 存储搜索框中的文本
			showPopupFlag: false, // 控制下拉框的显示
			position: 'bottom', // 下拉框的位置
			popupHeight: 0, // 下拉框的高度
			searchResult: [], // 存储搜索结果f
			candidates: ['计算机科学与技术', '软件工程', '物联网工程', '网络安全工程', '机械工程',],
			speciality: ''
		}
	},
	mounted() {
		this.single = Date.now();
		getMajor('').then(res => {
			if (res.code == 1) {
				this.candidates = res.data
			}
		})
	},
	computed: {
		isbutton() {
			return this.role === 0
		}
	},
	methods: {
		change(e) {
			console.log(e)
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
		},

		//输入事件
		changerole() {
			getMajor(this.speciality).then(res => {
				if (res.code == 1) {
					this.candidates = res.data
				}
			})
			this.role = 1;
		},
		next() {
			let data = this.$store.state.testData;
			data.question4 = this.speciality;
			this.$store.commit('updateTest', data);
			uni.redirectTo({ url: '/pages/result/result' })
		},
		search() {
			// 请求专业列表数据
			// ...
			const list = [{
				id: 1,
				name: '计算机科学与技术'
			},
			{
				id: 2,
				name: '软件工程'
			},
			{
				id: 3,
				name: '信息安全'
			},
			{
				id: 4,
				name: '物联网工程'
			},
			{
				id: 5,
				name: '数据科学与大数据技术'
			},
			{
				id: 6,
				name: '人工智能'
			},
				// ...
			]
			this.searchResult = list.filter(item => item.name.includes(this.searchText))
			this.popupHeight = this.searchResult.length * 50 // 计算下拉框的高度
			console.log("search")
		},
		// 显示下拉框
		showPopup() {
			this.showPopupFlag = true
		},
		// 隐藏下拉框
		hidePopup() {
			this.showPopupFlag = false
		},
		// 选中搜索结果
		select(item) {
			console.log(item)
			this.searchText = item.name
			this.hidePopup()
			this.role = 1
		},
		// 下拉框点击事件
		popupClick() {
			// 防止点击下拉框时触发blur事件，导致下拉框无法正常关闭
			setTimeout(() => {
				this.hidePopup()
			}, 0)
		}
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
}
</style>