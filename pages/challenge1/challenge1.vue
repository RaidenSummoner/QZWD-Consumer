<template>
	<view class="container">
		<view class="conter">
			<h1>1/4</h1>
		<br>
		<h1>您的学校是？</h1>
		</view>
		<br>
			<view class="example-body">
				<view>
				<uni-combox :candidates="candidates" placeholder="请输入学校" v-model="school" @input="getValue"></uni-combox>
				<view class="result-box">
					<text>{{text_prompt}}{{graduate}}{{gra_rate}}{{job}}{{job_rate}}</text>
					<navigator url="../challenge2/challenge2" hover-class="navigator-hover">
						<button type="default" :disabled="isDisabled" class="rounded-button">下一步</button>
					</navigator>
				</view>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				candidates: ['北京大学', '天津工业大学', '清华大学', '武汉大学', '天津大学', '西南交通大学', '浙江大学', '中北大学'],
				school: '',
				index: '',
				isDisabled: true,
				gra_rate:'',
				job_rate:'',
				graduate:'',
				job:'',
				text_prompt: '',
			}
		},
		methods: {
			getValue(e){
				if(this.school == '北京大学'){
					this.text_prompt='北京大学：'
					this.graduate='保研率'
					this.job=' 就业率'
					this.gra_rate='100000'
					this.job_rate='122222'
				}
				else if(this.school == '天津工业大学'){
					this.text_prompt='天津工业大学：'
					this.graduate='保研率'
					this.job=' 就业率'
					this.gra_rate='111111'
					this.job_rate='233333'
				}
				if(this.school != ''){
					this.isDisabled = false;
				}
				console.log("111");
			}
		}
	}
</script>

<style lang="scss">
	
	.result-box {
		text-align: center;
		padding: 20px 0px;
		font-size: 16px;
	}
	.container{
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
	  width: 120px; /* 设置按钮宽度 */
	  height: 50px; /* 设置按钮高度 */
	  background-color: white; /* 设置按钮背景颜色 */
	  border-radius: 15px; /* 设置按钮圆角半径 */
	  color: black; /* 设置按钮字体颜色 */
	  top: 100px;
	  border: 1px solid black;
	}

</style>
