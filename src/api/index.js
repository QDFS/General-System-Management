import http from '../utils/request'

export const getData = () => {
    return http.get('/home/getData')
}

// 获取用户
export const getUserData = (params) => {
    // console.log(params)
    return http.get('/user/getUser', params)
}

// 删除用户
export const deleteUserData = (data) => {
    return http.post('/user/deleteUser', data)
}

// 添加用户
export const addUserData = (data) => {
    return http.post('/user/addUser', data)

}

//更新用户
export const updateUserData = (data) => {
    return http.post('/user/updateUser', data)
}


// 登录界面
export const getMenu = (data) => {
    return http.post('/login/getMenu', data)
}