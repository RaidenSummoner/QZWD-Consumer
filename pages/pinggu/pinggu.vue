<template>
	<view>
		<br>
		<uni-collapse  v-model="accordionVal" @change="change">
			<view v-for="(item,index) in titles" :id="index">
				<uni-collapse-item  v-bind:title="item.data+' '+item.title">
					<button>进入深度测评</button>
					<br>
					{{item.title}}{{item.items[0]}}
					<view class="uni-padding-wrap uni-common-mt">
						<uni-segmented-control :current="item.current" :values="item.items" :active-color="activeColor"
							@clickItem="onClickItem" />
					</view>
					<view class="content">
						<view v-if="item.current === 0"><text class="content-text">{{item.items[0]}}</text></view>
						<view v-if="item.current === 1"><text class="content-text">{{item.items[1]}}</text></view>
						<view v-if="item.current === 2"><text class="content-text">{{item.items[2]}}</text></view>
					</view>
					<br>
				</uni-collapse-item>
				<br>
			</view>
		</uni-collapse>
		<br>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titles: [{
						title: '产品类',
						data: "90%",
						current: 0,
						items: ['选项卡1', '选项卡2', '选项卡3'],
						content: [],
					}, {
						title: 'AI大数据类',
						data: "80%",
						current: 0,
						items: ['选项卡1', '选项卡2', '选项卡3'],
						content: [],
					}, {
						title: '编程类',
						data: "70%",
						current: 0,
						items: ['选项卡1', '选项卡2', '选项卡3'],
						content: [],
					}, {
						title: '运营类',
						data: "60%",
						current: 0,
						items: ['选项卡1', '选项卡2', '选项卡3'],
						content: [],
					}, {
						title: '管培类',
						data: "59%",
						current: 0,
						items: ['选项卡1', '选项卡2', '选项卡3'],
						content: [],
					},
					{
						title: '财会类',
						data: "45%",
						current: 0,
						items: ['选项卡1', '选项卡2', '选项卡3'],
						content: [],
					},
					{
						title: '营销类',
						data: "40%",
						current: 0,
						items: ['选项卡1', '选项卡2', '选项卡3'],
						content: [],
					},
					{
						title: '金融类',
						data: "20%",
						current: 0,
						items: ['选项卡1', '选项卡2', '选项卡3'],
						content: [],
					},
				],
				accordionVal: '1',
				extraIcon: {
					color: '#4cd964',
					size: '26',
					type: 'image'
				},
				items: ['选项卡1', '选项卡2', '选项卡3'],
				current: 0,
				activeColor: '#007aff',
			}
		},
		methods: {
			add() {
				if (this.content.length > 35) {
					this.content = '折叠内容主体，可自定义内容及样式，点击按钮修改内容使高度发生变化。'
				} else {
					this.content = '折叠内容主体，这是一段比较长内容。通过点击按钮修改后内容后，使组件高度发生变化，在次点击按钮恢复之前的内容和高度。'
				}
				// TODO 小程序中不支持自动更新 ，需要手动resize 更新组件高度
				// #ifdef MP
				this.$nextTick(() => {
					this.$refs.collapse.resize()
				})
				// #endif
			},
			onClick(e) {
				uni.showToast({
					title: '列表被点击'
				})
			},
			change(e) {
				console.log(e);
			},
			onClickItem(e) {
				for (var i = 0; i < this.titles.length; i++)
					if (this.titles[i].current !== e.currentIndex) {
						this.titles[i].current = e.currentIndex
					}
			},
		}
	}
</script>

<style lang="scss">
	.example-body {
		flex-direction: column;
		flex: 1;
	}

	.content {
		padding: 15px;
	}

	.text {
		font-size: 14px;
		color: #666;
		line-height: 20px;

	}

	.button {
		// margin-top: 10px;
		margin: 10px;
		margin-bottom: 0;
	}

	.uni-collapse-item {
		border: 1px solid black;
		border-radius: 4px;
	}

	.uni-collapse-item.uni-collapse-item--active .uni-collapse-item__header {
		background-color: #f5f5f5;
	}

	.uni-collapse-item__header {
		border-bottom: 1px solid black;
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
		padding: 10px;
		cursor: pointer;
	}

	.uni-collapse-item__title {
		color: #333;
		margin: 0;
	}

	.uni-collapse-item__content {
		border-top: 1px solid black;
		padding: 10px;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>