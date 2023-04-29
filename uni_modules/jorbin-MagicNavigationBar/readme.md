# jorbin-MagicNavigationBar
# 使用说明：
## 1. 导入插件
```javascript
import jorbinMagicNavigationBar from "@/uni_modules/jorbin-MagicNavigationBar/components/jorbin-MagicNavigationBar/jorbin-MagicNavigationBar.vue"//导入插件
	export default {
		components:{
			jorbinMagicNavigationBar//定义组件
		},
		data() {
			return {
				/**
				 * 构造数据
				 * 
				 */
				dataList:[
					{
						text:"dashbord",//导航栏选项的文字
						icon:{
							width:40,//导航栏选项的图片宽,1.0.0的是with，之后版本都是width
							height:40,//导航栏选项的图片高
							src:require("@/static/dashboard.png")//图片地址
						}
					},
					{text:"store",icon:{with:40,height:40,src:require("@/static/store.png")}},
					{text:"setting",icon:{widdth:40,height:40,src:require("@/static/setting.png")}}
				]
			}
		},
		...
```

## 2.在视图中引用
``` html
<view class="content">
		<!-- 需要在外层容器内使用,默认固定在页面底部-->
		
		<jorbin-MagicNavigationBar :items="dataList" :height="60">
		<!-- 文字以插槽方式加入，可以自定义样式进行修改 -->
			<template v-slot:text="{text}">
				{{text}}
			</template>
		</jorbin-MagicNavigationBar>
	</view>
```
## 3.属性列表
| 名称 | 类型 | 说明 |
| --- | --- | --- |
|height|Number|默认60(px),底部导航栏高度|
|backgroundColor|String|导航栏背景色|
|indicatorBackgroundColor|String|圆形指示器颜色|
|screenBackgroundColor|String|屏幕背景色,改颜色为底色,必须和屏幕背景色一致，如#fff或者white|
|indicatorPadding|Number|指示器外部圆环的宽度,圆环颜色与屏幕背景色一致|
|indicatorSize|Number|指示器大小|
|digHoleAngle|Object|挖洞参数。如：{width:25,height:20}|
|items|Array|导航栏数据。|
