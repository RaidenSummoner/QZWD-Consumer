import { request } from "../utils/request"

//根据用户id获取收藏列表
export async function  getFavorites(){
    const userId = await uni.getStorageSync('userId')
    return request({
        url: '/favorites?userId=' + userId,
        method: 'get'
    })
}

//添加收藏
export function addFavorites(data){
    return request({
        url: '/favorites',
        method: 'post',
        data
    })
}
// 传参实例
// {
//     "category": 0,
//     "contentId": 0,
//     "userId": 0
//   }

//删除收藏
export function deleteFavorites(data){
    return request({
        url: '/favorites/',
        method: 'delete',
        data
    })
}