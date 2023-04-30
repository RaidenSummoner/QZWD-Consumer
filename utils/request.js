//不出现在h5中的部分
// #ifndef H5
export const BASE_URL = "https://qzwdapi.haaland.top"
// #endif

//只出现在h5中的部分（用于解决跨域）
// #ifdef H5
export const BASE_URL = "/api"
// #endif

export const request = (options) => {  // {url: '', method: '', data: {}}
	return new Promise((resolve, reject) => {
		const isToken = (options.headers || {}).isToken === false
		if (uni.getStorageSync('user').token!=null && !isToken) {
		  options.headers = {
			  'Content-Type':'application/json',
			 	// 让每个请求携带自定义token 请根据实际情况自行修改，有token的话解除下面的注释
				//  "satoken-authorization": uni.getStorageSync('user').token.tokenValue
			} 
		}
		console.log(options)
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			header: options.headers,
			data: options.data || {},
			success: (res) => {
				const data = res.data
				//console.log(res)
				//console.log(options.headers)
				//console.log(options.data)
				if (data.code === 401) {  // 401表示无权限
					uni.navigateTo({
						url: '/pages/auth/login'
					})
					return
				} 
				else if(data.code == 400 && (data.msg == "未提供token")||(data.msg == "token已过期")){
					// uni.showToast({
					// 	icon:'error',
					// 	title:"请重新登陆"
					// }).then(()=>{
					// 	uni.navigateTo({
					// 		url:"/pages/auth/login"	
					// 	})
					// })
				}
				
				else if(data.code !== 200) {
					// uni.showToast({
					// 	icon: 'error',
					// 	title: '操作错误'
					// })
				}
				resolve(data) 
			},
			fail: (error) => {
				console.log(error)
				uni.showToast({
					icon: 'error',
					title: '系统错误'
				})
				reject(error)
			}
		})
	})
}