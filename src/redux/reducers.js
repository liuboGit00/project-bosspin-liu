import {combineReducers} from 'redux'

import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER} from './actions-type';
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
            return {...user,redirectTo: path(user.type)};
        case ERROR_MSG :
            const msg = action.data;
            return {...preState,msg}
        case RECEIVE_USER :
            const updateUser = action.data;
            return updateUser
        case RESET_USER :
            const resetMsg = action.data;
            return {...preState,msg: resetMsg}
        default:
            return preState
    }

}

export default combineReducers({
    user
})
/*
1. 向外暴露是一个整合后的reducer函数: function (state, action)
2. state的结构为: {xxx: xxx(), yyy: yyy()}
 */