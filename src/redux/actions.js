/*
* 此模块为actions模块
* */
import {AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    GET_USERLIST,
    RECEIVE_CHAT_MSGS,
    RECEIVE_CHAT_MSG
} from './actions-type';

import {reqRegister,
    reqLogin,
    reqUpdate,
    reqGetuser,
    reqUserList,
    reqChatMsgs
} from '../api/index';
/*
* 注册异步的action
* */

/*引入Io对象*/
import io from 'socket.io-client'


const authSuccess = user => ({type: AUTH_SUCCESS,data:user});
const errMsg = msg => ({type: ERROR_MSG,data: msg});

//收到用户信息同步
const achieveUser = user => ({type: RECEIVE_USER,data:user});
export const resetUser = msg => ({type: RESET_USER,data:msg});

const getUserList = userList => ({type:GET_USERLIST,data:userList})

//获取所有的消息列表
const getChatMsgs = chatMsgs => ({type:RECEIVE_CHAT_MSGS,data:chatMsgs})

const getChatMsg = chatMsg => ({type:RECEIVE_CHAT_MSG,data:chatMsg})



export function register({username,password,confirmPwd,type}) {
    if (!username){
        return {type: ERROR_MSG,data: '用户名不能为空'}
    }else if (!password){
        return {type: ERROR_MSG,data: '密码不能为空'}
    }else if (confirmPwd !== password){
        return {type: ERROR_MSG,data: '两次输入的密码不一致'}
    }
    return dispatch => {
        reqRegister({username,password,type}).then(response => {
            //转化成同步的
            const result = response.data // {code: 0, data: user} | {code: 1, msg: 'xxx'}
            if (result.code === 0){
                const user = result.data
                //获取所有的聊天列表
                receiveChatMsgs(dispatch,user._id)
                dispatch(authSuccess(user))
            }else {
                const msg = result.msg
                dispatch(errMsg(msg))
            }
        })
    }
}

export function login({username,password}) {
    return dispatch => {
        if (!username){
            dispatch(errMsg('用户不能为空'))
        }else if (!password){
            dispatch(errMsg('密码不能为空'))
        }


        reqLogin(username,password).then(response => {
            //转化成同步的
            const result = response.data // {code: 0, data: user} | {code: 1, msg: 'xxx'}
            if (result.code === 0){
                const user = result.data
                //获取所有的聊天列表
                receiveChatMsgs(dispatch,user._id)
                dispatch(authSuccess(user))
            }else {
                const msg = result.msg
                dispatch(errMsg(msg))
            }
        })
    }
}

//更新信息
export function updateInfo(data) {
    return async dispatch => {
        console.log(data)
        const response = await reqUpdate(data);
        const result = response.data;
        if (result.code === 0){
            const user = result.data
            dispatch(achieveUser(user))
        }else {
            const msg = result.msg
            dispatch(resetUser(msg))
        }
    }
}

//当刷新时重新进行请求
export function getUser() {
    return async dispatch => {
        const response = await reqGetuser();
        const result = response.data;
        if (result.code === 0){
            const user = result.data
            receiveChatMsgs(dispatch,user._id)
            dispatch(achieveUser(user))
        }else {
            const msg = result.msg
            dispatch(resetUser(msg))
        }
    }
}

//获取列表
export function receiveUserList(type) {
    return async dispatch => {
        //异步操作
        const response = await reqUserList(type)
        const result = response.data;
        if (result.code === 0){
            dispatch(getUserList(result.data))
        }
    }
}

//初始化IO
function initSocketIo(dispatch,meId) {
    if (!io.socket){
        io.socket = io('ws://localhost:4000')
        //浏览器端接收到消息
        io.socket.on('receiveMsg', function (chatMsg) {
            console.log('浏览器接收到服务发送的消息', chatMsg)
            //只有当是我发的 或者 发给我的才可以
            if (chatMsg.from === meId || chatMsg.to === meId){
                //分发同步数据
                dispatch(getChatMsg(chatMsg))
            }
        })

    }


}

//获取用户所有聊天信息
async function receiveChatMsgs(dispatch,meId) {
        initSocketIo(dispatch,meId)
        //异步请求
        const response = await reqChatMsgs();
        const result = response.data
        if (result.code === 0){
            //分发同步action
            console.log(result.data)
            dispatch(getChatMsgs(result.data))
        }
}

//发送消息
export function sendMsg({content,from,to}) {
    return dispatch => {
        io.socket.emit('sendMsg', {content,from,to})
        console.log('浏览器向服务器发消息', {content, from, to})
    }
}


