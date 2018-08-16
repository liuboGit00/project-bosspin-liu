import {combineReducers} from 'redux'

import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER,GET_USERLIST} from './actions-type';
import path from '../utils/path/setPath';
const initData = {
    username: '',
    password: '',
    msg: '',
    redirectTo: ''
}

function user(preState = initData,action) {
    switch (action.type){
        case AUTH_SUCCESS :
            const user = action.data;
            console.log(user)
            return {...user,redirectTo: path(user.type,user.header)};
        case ERROR_MSG :
            const msg = action.data;
            return {...preState,msg}
        case RECEIVE_USER :
            const updateUser = action.data;
            return updateUser
        case RESET_USER :
            const resetMsg = action.data;
            console.log(resetMsg)
            return {...initData,msg: resetMsg}
        default:
            return preState
    }

}

const initList = []
function userList(preState = initList,action) {
    switch (action.type){
        case GET_USERLIST:
            return action.data
        default:
            return preState
    }
}

export default combineReducers({
    user,
    userList
})
/*
1. 向外暴露是一个整合后的reducer函数: function (state, action)
2. state的结构为: {xxx: xxx(), yyy: yyy()}
 */