<template>
	<view class="whi">
		<view>
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="120">
				<view class="container">
					<view class="item" v-for="(item,index) in job " :key="index">
						<button>{{item.name}}</button>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="uni-common-pb"></view>
		<scroll-view class="tab-scroll-sticky" id="tabs" scroll-y="true" @scroll="tabScoll" :scroll-top="scrollInto">
			<view class="scroll-content">
				<view class="scroll-tab" :class="[barshow?'scroll-tab-fixed':'scroll-tab-static']"
					:style="{top:barshow?fixedTop+'px':'0'}">
					<view class="scroll-tab-list" v-for="(item,index) in tabList"
						:style="{color:activeTab == index?activeColor:'#333333'}" @click="changeTab(index)"
						:id="'tabs'+index" :key="index">
						<text class="scroll-tab-list-text">{{item.text}}</text>
					</view>
					<view class="scroll-tab-bar" :style="[tabBarStyle]"></view>
				</view>
			</view>
			<br>
			<view class="scroll-warp">

				<view class="scroll-warp-list" :id="'wrap'+index" v-for="(item,index) in tabList" :key="index">
					{{item.text}} <br>
					<view v-for="(items,index) in 10" :key="index">
						<br>
						<view class="book" @click="jump">
							<view>
								<image class="pict" src="../../static/th.jpg"></image>
							</view>
							<view class="content">
								<h4>{{item.name}}</h4>
								<br>
								<h6>开课时间:{{item.time}}</h6>
							</view>
						</view>

					</view>

				</view>

			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: 'tab-scroll-sticky',
		data() {
			return {
				id: 1,
				barshow: false,
				tabTop: 0,
				activeTab: 0,
				scrollInto: 0,
				tabBarStyle: {},
				warpTop: [],
				scrollWarp: [],
				job: [{
						name: "产品类"
					},
					{
						name: "产品类"
					},
					{
						name: "产品类"
					},
					{
						name: "产品类"
					}, {
						name: "产品类"
					}
				],
				tabList: [{
						text: "推荐和收藏",
						navTarget: "第一列",
						name: "英语强化练习",
						time: "1-10日  10:00"
					}, {
						text: "实训项目",
						navTarget: "第二列",
						name: "英语强化练习",
						time: "1-10日  10:00"
					}, {
						text: "Softskill",
						navTarget: "第三列",
						name: "英语强化练习",
						time: "1-10日  10:00"
					}, {
						text: "岗位技能",
						navTarget: "第四列",
						name: "英语强化练习",
						time: "1-10日  10:00"
					},
					{
						text: "求职技巧",
						navTarget: "第五列",
						name: "英语强化练习",
						time: "1-10日  10:00"
					},
				],
				fixedTop: 44,
				activeColor: 'red'
			};
		},
		computed: {},
		onLoad() {
			this.$nextTick(async function() {
				let rect = await this.GetRect("#scrollTop");
				this.tabTop = rect.height;
				this._getTabRect(0);
				this.barInit();
			})
		},
		watch: {},
		methods: {
			//获取节点信息
			GetRect(selector) {
				return new Promise((resolve, reject) => {
					let view = uni.createSelectorQuery().in(this)
					view.select(selector).boundingClientRect(rect => {
						resolve(rect)
					}).exec();
				})
			},
			//tab切换
			changeTab(e) {
				this.activeTab = e;
				this._getTabRect(this.activeTab);
				if (e == 0) {
					this.scrollInto = this.warpTop[e] - 44;
				} else {
					this.scrollInto = this.warpTop[e] - 88;
				}
			},
			//获取tab宽度
			async _getTabRect(itemIndex) {
				let rect = await this.GetRect("#tabs" + itemIndex);
				let rect1 = await this.GetRect("#tabs" + itemIndex + ">.scroll-tab-list-text");
				let width = (rect1.width * 0.67);
				this.tabBarStyle = {
					left: (rect.left + (rect.width - width) / 2) + 'px',
					width: width + 'px',
					background: this.activeColor
				}
			},
			//scroll滚动
			async tabScoll(e) {
				let scrollTop = e.detail.scrollTop;
				let rect = await this.GetRect("#scrollTop");
				if (this.tabTop == 0) {
					let rect = await this.GetRect("#scrollTop");
					this.tabTop = rect.height;
				}
				this.barshow = scrollTop >= this.tabTop ? true : false;
				let scrollTop1 = scrollTop;
				if (scrollTop1 <= this.warpTop[1] - 93) {
					this.activeTab = 0;
					this._getTabRect(0);
				}
				if (scrollTop1 > this.warpTop[1] - 93 && scrollTop1 < this.warpTop[2] - 93) {
					this.activeTab = 1;
					this._getTabRect(1);
				}
				if (scrollTop1 > this.warpTop[2] - 93 && scrollTop1 < this.warpTop[3] - 93) {
					this.activeTab = 2;
					this._getTabRect(2);
				}
				if (scrollTop1 > this.warpTop[3] - 93 && scrollTop1 < this.warpTop[4] - 93) {
					this.activeTab = 3;
					this._getTabRect(3);
				}
				if (scrollTop1 > this.warpTop[4] - 93) {
					this.activeTab = 4;
					this._getTabRect(4);
				}
			},
			//获取节点距离顶部距离
			barInit: async function(index) {
				let navTargetTop = [];
				let navTargetTop1 = [];
				let randoms = 93; //顶部栏高度+tab高度+兼容值				
				for (let i = 0; i < this.tabList.length; i++) {
					this.GetRect("#wrap" + i).then(res => {
						navTargetTop.push(parseInt(res.top))
						navTargetTop1.push(parseInt(res.top) + randoms)
					})
				}
				this.warpTop = navTargetTop;
				this.scrollWarp = navTargetTop1;
			},
			favClick() {
				this.check = !this.check
				console.log(this.check, 'this.check ')
				this.$forceUpdate()
				this.item.num++
			},
			jump() {
				uni.navigateTo({
					url: '/pages/course/course'
				})
			},

		}
	};
</script>

<style lang="scss" scoped>
	.whi{
		background-color: GhostWhite ;
	}
	.flexRowCc {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.item {
		flex: 1;
		margin: 5px;
	}

	.scroll-content {
		position: relative;

		.scroll-tab {
			@extend .flexRowCc;
			justify-content: space-between;
			width: 100%;
			height: 44px;
			box-sizing: border-box;
			border-top: 1px solid #F1F1F1;
			border-bottom: 1px solid #F1F1F1;
			background: #FFFFFF;
			position: relative;
			z-index: 999;

			&-static {
				position: relative !important;
			}

			&-fixed {
				position: fixed;
				top: 44px;
				left: 0;
			}

			&-list {
				text-align: center;
				font-size: 32rpx;
				flex: 1 1 auto;

				&-text {
					display: inline-block;
				}
			}

			&-bar {
				width: 64rpx;
				height: 4rpx;
				background: rgba(222, 37, 37, 100);
				position: absolute;
				bottom: 8rpx;
				border-radius: 16rpx;
				transition-duration: .5s;
			}
		}
	}

	.content {
		position: relative;
		left: 10px;
		top: 25px;
	}

	.container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.book {
		height: 100px;
		width: 90%;
		background-color: white;
		border-radius: 15px;
		/* 设置按钮圆角半径 */
		flex-direction: column;
		padding-bottom: 40upx;
		margin-left: auto;
		margin-right: auto;

		&:nth-child(2n+1) {
			margin-right: 4%;
		}
	}

	.pict {
		float: left;
		height: 120px;
		width: 100px;
		border-radius: 15px;
	}

	.scroll-warp {
		height: 100vh;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
	}
</style>