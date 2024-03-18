import http from '../utils/request'

//请求首页数据接口
export const getData = () => {
    return http.get('/home/getData')//后端提供的接口,返回一个promise对象 
}

export const getUser = (params) => {
    //返回用户列表
    return http.get('/user/getUser', params)
}

export const addUser = (data) => {
    //返回用户列表
    return http.post('/user/add', data)//post传入的和get不一样，看官方文档
}

export const editUser = (data) => {
    //返回用户列表
    return http.post('/user/edit', data)//post传入的和get不一样，看官方文档
}

export const delUser = (data) => {
    //返回用户列表
    return http.post('/user/del', data)//post传入的和get不一样，看官方文档
}
export const getMenu = (data) => {
    return http.post('/permission/getMenu', data)
}