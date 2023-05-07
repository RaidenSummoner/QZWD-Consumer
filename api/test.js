import { request } from "../utils/request"
//测评模块接口

//提交评测，返回结果
export function postTest(data){
    return request({
        url: '/test',
        method: 'POST',
        data
    })
}

//第一题，带入大学名字显示蓝色文字
export function getTest1(name){
    return request({
        url: '/test/getUnv?name='+name,
        method: 'GET'
    })
}

//输入大学名字时显示提示内容。当输入框有文字时，将输入框的文字提交到后端，进行模糊查询
export function getPrompt(s){
    return request({
        url: '/test/getText?s='+s,
        method: 'GET'
    })
}

//第四题，输入专业名称显示提示内容。当输入框有文字时，将文字提交到后端，进行模糊查询
export function getMajor(s){
    return request({
        url: '/test/getMajor?s='+s,
        method: 'GET'
    })
}

//根据用户ID得到评测结果
export function getResult(id){
    return request({
        url: '/test/getResult?userId='+id,
        method: 'GET'
    })
}