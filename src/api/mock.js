import Mock from 'mockjs'

import getHomeData from './mockServeData/Home'
import User from './mockServeData/User'
import Permission from './mockServeData/Permission'

Mock.mock('/api/home/getData', getHomeData.getStatisticalData)


// 获取用户
Mock.mock(/\/api\/user\/getUser/, User.getUserList)

// 删除用户
Mock.mock('/api/user/deleteUser', 'post', User.deleteUser)

// 添加用户
Mock.mock('/api/user/addUser', 'post', User.createUser)

//更新用户
Mock.mock('/api/user/updateUser', 'post', User.updateUser)

//登录接口
Mock.mock('/api/login/getMenu', 'post', Permission.getMenu)