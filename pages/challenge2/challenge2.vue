<template>
	<view class="container">
		<view class="conter">
			<h1>2/4</h1>
			<h1>您的学历是？</h1>
		</view>
		<br>
		<view>
			<view>
				<picker @change="bindPickerChange" :value="index" :range="array">
					<view style="padding: 20rpx;border-style:solid; border-radius: 10px;">{{array[index]}}</view>
				</picker>
				<view>{{text_c}}</view>
			</view>
		</view>
		<navigator url="../challenge3/challenge3" hover-class="navigator-hover">
			<button @click="submit" type="default" :disabled="isDisabled" class="rounded-button">下一步</button>
		</navigator>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'picker',
			array: ['专科', '专升本', '硕士', '本科'],
			index: 0,
			time: '12:01',
			text_c: '学历不能代表一切，实习经历仍是企业看重的点，快戳 “下一步” ，来提高更多竟争力！',
			isDisabled: true,
			selected: ''
		}
	},
	methods: {
		bindPickerChange: function (e) {
			this.selected = e.detail.value;
			console.log('picker发送选择改变，携带值为', e.detail.value)
			this.index = e.detail.value
			if (e.detail.value == 0) {
				this.text_c = '学历不能代表一切，实习经历仍是企业看重的点，快戳 “下一步” ，来提高更多竟争力！';
			} else if (e.detail.value == 1) {
				this.text_c = '向上是唯一方向，你已经拿到大部分岗位的敲门砖，快戳 “下一步”，来提高更多竞争力！';
			} else if (e.detail.value == 2) {
				this.text_c = '纠结于是否需要考研？努力拓宽你的视野，让自己拥有更多可能性，不考研也可以找到高薪工作！';
			} else if (e.detail.value == 3) {
				this.text_c = '研究生扩招带来学历贬值，焦虑 ？快戳“下一步”，来提高更多竞争力！';
			}
			if (e.detail.value >= 0 && e.detail.value <= 3) {
				this.isDisabled = false;
				console.log(this.isDisabled);
			}
		},
		submit() {
			let data = this.$store.state.testData;
			data.question2 = this.array[this.selected];
			this.$store.commit('updateTest', data);
		}
	}
}
</script>

<style>
.form-item-picker {
	width: 100%;
	height: 44px;
	background: #f3f3f3;
	display: flex;
	flex-direction: row;
	position: relative;
}

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