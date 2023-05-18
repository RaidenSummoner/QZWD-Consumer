<template>
	<view class="yealuo-select">
		<view class="yealuo-background" @tap="isShow=false" v-show="isShow"></view>
		<view class="text1">
			<radio-group @change="selectCheckbox">
				<view class="select-item" :class="'item-'+overflow" v-for="(item, index) in nowData" :key="index">
					<view v-if="index<2">
						<label class="item-text" :class="{active: theValue==item.value}">
							距离<a style="color: aqua;">{{item.value}}</a>还剩<a style="color: aqua;">{{item.day1}}</a>天
						</label>
					</view>
				</view>
			</radio-group>
		</view>

		<view class="yealuo-select" v-show="show" :style="selectStyle">
			<view class="data">
				<radio-group v-if="checkType=='radio'" @change="selectCheckbox">
					<view class="select-item" :class="'item-'+overflow" v-for="(item, index) in nowData" :key="index">
						<view v-if="index>=2">
							<label class="item-text" :class="{active: theValue==item.value}">
								距离<a style="color: aqua;">{{item.value}}</a>还剩<a style="color: aqua;">{{item.day1}}</a>天
							</label>
						</view>
					</view>
				</radio-group>
				<checkbox-group v-else-if="checkType=='checkbox'" :style="{top:200+'px'}" @change="selectCheckbox">
					<view class="select-item" :class="'item-'+overflow" v-for="(item, index) in nowData" :key="index">
						<view v-if="index>=2">
							<label class="item-text" :class="{active: theValue.indexOf(item.value)!=-1 }">
								距离<a style="color: aqua;">{{item.value}}</a>还剩<a style="color: aqua;">{{item.day1}}</a>天
							</label>
						</view>
					</view>
				</checkbox-group>
				<radio-group v-else @change="selectCheckbox">
					<view class="select-item" :class="'item-'+overflow" v-for="(item, index) in nowData" :key="index">
						<view v-if="index>=2">
							<label class="item-text" :class="{active: theValue==item.value}">
								距离<a style="color: aqua;">{{item.value}}</a>还剩<a style="color: aqua;">{{item.day1}}</a>天
							</label>
						</view>
					</view>
				</radio-group>

			</view>
			<view class="item-close" @tap="isShow=false">收起</view>
		</view>

		<view class="icon1" @tap="isShow=!isShow" @change="selectCheckbox">
			<slot name='right' v-if="selectIco">
				<svg v-if="!isShow" t="1683204340118"
					style="width: 1.5em; height: 1.5em;vertical-align: middle;fill: currentColor;overflow: hidden;"
					class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7969"
					width="200" height="200">
					<path
						d="M79.123059 327.850933l405.024593 413.260162c15.690354 16.009625 41.469484 16.009625 57.160861 0l405.02357-413.260162c24.819269-25.323758 6.877641-68.028373-28.579919-68.028373L107.704001 259.82256C72.245418 259.82256 54.30379 302.527175 79.123059 327.850933z"
						fill="#272636" p-id="7970"></path>
				</svg>
				<svg t="1683204185329" v-else class="icon"
					style="width: 1.5em; height: 1.5em;vertical-align: middle;fill: currentColor;overflow: hidden;"
					viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7014" width="200"
					height="200">
					<path
						d="M583.93 296.842l234.8 318.515a73.059 73.059 0 0 1-14.99 102.048l-2.62 1.806a78.116 78.116 0 0 1-44.612 13.908h-469.6a75.588 75.588 0 0 1-76.762-74.414 72.878 72.878 0 0 1 14.269-43.348l234.8-318.515a78.568 78.568 0 0 1 106.834-16.888 77.574 77.574 0 0 1 17.881 16.888z"
						p-id="7015"></path>
				</svg>
			</slot>
		</view>

	</view>
</template>

<script>
	/**
	 * v1.0.3
	 * 最后修改: 2021.02.02
	 * 创建: 2020.9.30
	 * Author:yealuo.com
	 * contact:470797533@qq.com
	 */
	let fontUnit = 'upx'
	// #ifdef MP-WEIXIN
	fontUnit = 'rpx'
	// #endif
	export default {
		name: 'yealuoInputs',
		props: {
			placeholder: {
				type: String,
				default: ''
			},
			value: {
				type: String,
				default: ''
			},
			checkType: {
				type: String,
				default: ''
			},
			itemKey: {
				type: String,
				default: ''
			},
			width: {
				type: String,
				default: '600'
			},
			disabled: {
				type: Boolean,
				default: false
			},
			inputStyle: {
				type: String,
				default: ''
			},
			selectStyle: {
				type: String,
				default: '选项1'
			},
			overflow: {
				type: String,
				default: 'auto'
			},
			tags: {
				type: String,
				default: ''
			},

			binData: {
				type: Array,
				default: ''
			},
			selectIco: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				odData: this.binData,
				nowData: this.binData,
				isShow: false,
				theValue: this.value,
				theDisabled: this.disabled
			}
		},
		watch: {
			value(val) {
				this.theValue = val;
			},
			//监听数据变化
			nowData: {
				handler: function() {
					this.nowData = this.binData;
				},
				deep: true
			}

		},
		computed: {
			show() {
				return this.isShow && this.nowData.length
			}
		},
		methods: {
			//获取焦点
			theFocus(e) {
				this.nowData = this.odData;
			},
			//失去焦点
			theBlur(e) {
				this.$emit('blur', e)
			},
			//获取输入值
			theInput(e) {
				var val = e.detail.value;
				let data = [];
				var odData = this.odData;
				for (var i = 0; i < odData.length; i++) {
					var isHas = false;
					if (odData[i].value.indexOf(val) != -1) {
						data.push(odData[i])
						if (odData[i].value == val) {
							isHas = true;
							var arr = [];
							arr.push(odData[i].value + "|" + odData[i].id)
							this.$emit('getBackVal', arr);
						}
					}
					if (!isHas) {
						var arr = [];
						arr.push(val)
						this.$emit('getBackVal', arr);
					}
				}
				this.nowData = data;
			},
			//下拉选中
			selectCheckbox(e) {
				var val = e.target.value;
				var str = val;
				if (typeof(str) != "string") {
					str = "";
					for (var i = 0; i < val.length; i++) {
						var vt = val[i].split("|");
						str += i > 0 ? "," + vt[0] : vt[0];
					}
				} else {
					this.isShow = false;
					str = str.split("|")[0];
				}
				this.$emit('getBackVal', val + "|" + this.tags)
				this.theValue = str;
			}
		},
	}
</script>

<style lang="scss" scoped>
	.yealuo-select {
		max-width: 100%;
		position: relative;
		border-radius: 10px;
		.yealuo-background {
			position: fixed;
			top: 0;
			left: 0;
			width: 750upx;
			height: 100%;
		}

		.yealuo-con {
			display: flex;
			align-items: center;
			justify-content: center;
			input {
				flex: 1;
				margin: 0 6upx;
			}
		}

		.text1 {
			color: black;
			padding: 10upx;
			overflow: auto;
			display: block;
		}

		.icon1 {
			text-align: center;
		}

		.yealuo-select {
			position: absolute;
			z-index: 999;
			background: #fff;
			width: 99.2%;

			.data {
				max-height: 600upx;
				padding: 10upx;
				overflow: auto;
				.select-item {
					width: 100%;
					color: black;
					border-radius: 10px;
					.item-text {
						width: 100%;
						display: block;
					}

					.active {
						font-weight: bold;
					}
				}

				.item-auto {
					overflow: auto;

					.item-text {
						width: max-content;
					}
				}

				.item-hide .item-text {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			.item-close {
				padding: 20upx;
				text-align: center;
				font-size: 32upx;
				border-top: 1px solid #f3f3f4;
				color: #8F8F94;
				border-radius: 10px;
			}
		}
	}
</style>