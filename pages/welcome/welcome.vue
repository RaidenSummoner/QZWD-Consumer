<template>
	<view class="container">
		<view >
		  <text style="font-size: 22px;">16年寒窗苦读</text>
		</view>
		<view>
		  <text style="font-size: 22px;">5000月薪你甘心吗</text>
		</view>
		
		<view>
		  <text>基于10万条高薪人才案例数据</text>
		</view>
		<view>
		  <text>精准匹配你的专属高薪岗位</text>
		</view>
			<navigator url="../challenge1/challenge1" hover-class="navigator-hover">
				<button type="default">开启我的高薪赛道</button>
			</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		onLoad() {
			uni.getStorage({
				key: 'userId',
				success: function(res) {
					uni.switchTab({
						url: '/pages/index/index'
					})
				}
			})
		}
	}
</script>

<style>
	.container{
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
  }
.container{
  	  display: flex;
  	  flex-direction: column;
  	  align-items: center;
  	  justify-content: center;
  	  padding: 20px;
  	  font-size: 14px;
  	  line-height: 24px;
  }
</style>
