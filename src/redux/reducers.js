import {combineReducers} from 'redux'

import {AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    GET_USERLIST,
    RECEIVE_CHAT_MSGS,
    RECEIVE_CHAT_MSG
} from './actions-type';
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

const initChatMsgs = {
    chatMsgs:[],
    users:{},
    unReadCount: 0
}
function chat(preState = initChatMsgs,action) {
    switch (action.type){
        case RECEIVE_CHAT_MSGS:
            const {users,chatMsgs} = action.data
            return {
                users,
                chatMsgs,
                unReadCount: 0
            }
        case RECEIVE_CHAT_MSG:
            return {
                users: preState.users,
                chatMsgs: [...preState.chatMsgs, action.data],
                unReadCount: 0
            }
        default:
            return preState
    }
}

export default combineReducers({
    user,
    userList,
    chat
})
/*
1. 向外暴露是一个整合后的reducer函数: function (state, action)
2. state的结构为: {xxx: xxx(), yyy: yyy()}
 */