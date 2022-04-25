/**
 * 项目业务请求接口
 */

 import request from './request'

 //封装登录接口
 export function LoginApi(data){ 
   return request({
     url: '/login',
     method: 'POST',   //delete ,put    用data
     data
   })
 }

 //左侧菜单接口  getMenusApi
 export function getMenusApi(){
    return request({
       url:'/menus',
       method:'GET'
    })
 }


 //用户列表接口
 export  function getUserListapi(params){
    return request({
       url:'/users',
       method:'GET',    //get   用params
       params
    })
 }