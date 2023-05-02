<template>
    <view class="page">
		<view class="rili">
			<view class="date">
				<span>{{nowTime[0].year}}年{{nowTime[1].month}}月{{nowTime[2].day}}日 &nbsp;{{nowTime[3].week}}</span>
			</view>
			<hr>
			<view class="date1">
				<view v-for="(info,index) in infos" :key="index">
					<span>
						距离<a style="color: aqua;">{{info.name}}</a>还剩<a style="color: aqua;">{{info.num}}</a>天
					</span><br>
					<span>距离四六级考试还剩<a style="color: aqua;">{{2}}</a>天</span><br>
				</view>
			</view>
		</view>
        <zero-waterfall :list="dataList">
            <!--  #ifdef  MP-WEIXIN -->
            <view v-for="(item, index) of dataList" :key="index" slot="slot{{item.id}}">
                <view class="cnt">
                    <view class="text">{{ item.extra }}</view>
                </view>
				
            </view>
            <!--  #endif -->

            <!-- #ifndef  MP-WEIXIN -->
            <template v-slot:default="item">
                <view class="cnt">
                    <view class="text">{{ item.extra }}</view>
                </view>
            </template>
            <!-- #endif -->
        </zero-waterfall>
        <uni-load-more bg-color="rgb(240, 240, 240)" :status="loadStatus" @clickLoadMore='loadMore'></uni-load-more>
    </view>
</template>

<script>
    export default {
        data() {
            return {
				role: 0,
				nowTime: [{
						year: ''
					},
					{
						month: ''
					},
					{
						day: ''
					},
					{
						week: ''
					},
				],
				columnList: [], //分配后的每列图片
				columWidth: 0, //每列宽度
				columnCount: 2, //显示几列
				infos: [{
						name: "产品经理夏令营",
						num: '3'
					},
					{
						name: "产品经理夏令营",
						num: '3'
					}
				],
                arr: [{
                        id: 1,
                        url: "https://ts3.cn.mm.bing.net/th?id=OIP-C.3-o-WBUIxf5Zg5egIcgtpAAAAA&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
                        title: "英语高强度补习班",
                        first: "案例分析",
                        second: "AI大数据",
                        num: 99,						
                        star: 0,
                    },
                    {
                        id: 2,
                        url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp09%2F21052112102250D-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643473244&t=b5e08380ae592167bc023b5809a46d1e",
                        title: "英语高强度补习班",
                        first: "案例分析",
                        second: "AI大数据",
                        num: 99,						
                        star: 0,
                    },
                    {
                        id: 3,
                        url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp09%2F210611094Q512b-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643473244&t=72c2f08503aeba6b3988f2d96f83775e",
                        title: "英语高强度补习班",
                        first: "案例分析",
                        second: "AI大数据",
                        num: 99,						
                        star: 0,
                    },
                    {
                        id: 4,
                        url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0628%2F29618e08j00qverj7001ec000ci00loc.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643473244&t=f1af25d8ea22fda465b7f3e37d9c9fa7",
                        title: "英语高强度补习班",
                        first: "案例分析",
                        second: "AI大数据",
                        num: 99,						
                        star: 0,
                    },
                    {
                        id: 5,
                        url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2F1114%2F0G320103935%2F200G3103935-1-1200.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643473244&t=f65fa05e38a04d9544a46af86f94b7e8",
                        title: "英语高强度补习班",
                        first: "案例分析",
                        second: "AI大数据",
                        num: 99,						
                        star: 0,
                    },
                    {
                        id: 6,
                        url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp01%2F1ZZQ20QJS6-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643473244&t=85113db32df432853292930e541c1af5",
                        title: "英语高强度补习班",
                        first: "案例分析",
                        second: "AI大数据",
                        num: 99,						
                        star: 0,
                    },
                    {
                        id: 7,
                        url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0531%252F0a85fb25j00qtxwjo000ic000hs00hsc.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643473244&t=4d51c25fa34adee1c02af11d65e910ac",
                        title: "英语高强度补习班",
                        first: "案例分析",
                        second: "AI大数据",
                        num: 99,						
                        star: 0,
                    },
                ],
                loading: false,
                dataList: [],
                loadStatus: 'more',
                page: 1,
                pageSize: 5,
            }
        },
        created() {
            this.dataList =this.arr.slice(0,5)
			
        },
		mounted(){
			this.getNowDate()
			
			  this.$nextTick(()=>{
			    this.setWaterFallLayout();
			  })
		},
        onReachBottom() {
            if (this.dataList.length >= this.arr.length) {
                this.loadingStatus = 'noMore'
            } else {
                this.loadStatus = 'more';
                setTimeout(() => {
                    this.loadMore();
                    this.loadStatus = 'loadmore';
                }, 1000)
            }

        },
        methods: {
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			onTab(index, item) {
				console.log(index, item)
				this.role = index
				if (this.role === 1) {
					uni.switchTab({
						url: '/pages/improve/improve'
					})
				} else if (this.role === 2) {
					uni.switchTab({
						url: '/pages/myself/myself'
					})
				} else {
					uni.switchTab({
						url: '/pages/index2/index2'
					})
				}
			},
			onTab(index, item) {
				console.log(index, item)
				this.role = index
				if (this.role === 1) {
					uni.switchTab({
						url: '/pages/improve/improve'
					})
				} else if (this.role === 2) {
					uni.switchTab({
						url: '/pages/myself/myself'
					})
				} else {
					uni.switchTab({
						url: '/pages/index/index'
					})
				}
			},
			async setWaterFallLayout() {
			  for (let item of this.goodsList) {
			    let columnHeight = this.$refs.column.map((item) => item.clientHeight); //每列高度数组
			    let min = Math.min(...columnHeight); //找出最小高度值
			    let index = columnHeight.findIndex((item) => item === min); //找出最小高度列的索引
			    this.columnList[index].push(item);//放入图片
			    await this.$nextTick(); //等待渲染完成后重新比较高度
			  }
			},
			navToDetailPage(e) {
				uni.navigateTo({
					url: '/pages/introduct/introduct'
				})
			},
			add(e) {
				this.goodsList[e].num++;
				this.goodsList[e].star++
			},
			del(e) {
				this.goodsList[e].num--;
				this.goodsList[e].star--
			},
			getNowDate() {
				var date = new Date();
				var sign2 = ":";
				this.nowTime[0].year = date.getFullYear(); // 年
				this.nowTime[1].month = date.getMonth() + 1; // 月
				this.nowTime[2].day = date.getDate(); // 日
				var weekArr = [
					"星期一",
					"星期二",
					"星期三",
					"星期四",
					"星期五",
					"星期六",
					"星期天",
				];
				this.nowTime[3].week = weekArr[date.getDay()];
				// 给一位数的数据前面加 “0”
				if (this.nowTime[1].month >= 1 && this.nowTime[1].month <= 9) {
					this.nowTime[1].month = "0" + this.nowTime[1].month;
				}
				if (this.nowTime[2].day >= 0 && this.nowTime[2].day <= 9) {
					this.nowTime[2].day = "0" + this.nowTime[2].day;
				}
			},
			
            // 模拟数据加载
            loadMore() {
                this.loadStatus = 'loading';
                this.page++
                this.dataList = this.dataList.concat(this.arr.slice(this.dataList.length, this.page * this.pageSize))
            },

        }
    }
</script>

<style lang="scss" scoped>
.rili {
		position: relative;
		margin-left: auto;
		margin-right: auto;
		top: 5px;
		width: 80%;
		background-color: white;
		border-radius: 10px;
		border: 3px solid grey;
	}
</style>