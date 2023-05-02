# water-fall
### 瀑布流插件，适用于没有照片的宽高比例信息时，按照照片宽高加载,因为是先获取照片信息再去排列，可能在照片过大的时候，加载缓慢
## 使用方法
### 1、页面引入并使用，传入两个参数，一个是照片信息，另一个是触发方法

### 	<WaterFall :wfList="imgList" @postsTap="tap"></WaterFall>


### 	imgList的格式
	[
		{
			avatarUrl: "https://img0.baidu.com/it/u=2447135182,2703616006&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=607",
			content: "这是一段内容",
			images: "https://img0.baidu.com/it/u=2447135182,2703616006&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=607",
			likeCount: 111,
			nickName: "小明",
			top: 1,
			liked: false
		}
	]
### tap接受的参数（item）
###  item 为你传入的图片对象信息，以及多了一个type值
	switch (item.type) {
		case 'jump':
			// 点击了整个照片触发，例子：进入详情页。
			break;
		case 'del':
			// 点击了右下角，例子：执行点赞、删除操作，需要自己更改，默认为点赞，没有触发del。
			break;
		default:
			break;
	}
