/*
* 此模块为actions模块
* */
import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER} from './actions-type';
import {reqRegister,reqLogin,reqUpdate} from '../api/index';
/*
* 注册异步的action
* */

const authSuccess = user => ({type: AUTH_SUCCESS,data:user});
const errMsg = msg => ({type: ERROR_MSG,data: msg});

//收到用户信息同步
const achieveUser = user => ({type: RECEIVE_USER,data:user});
const resetUser = msg => ({type: RESET_USER,data:msg})


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
                console.log(user)
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
                dispatch(authSuccess(user))
            }else {
                const msg = result.msg
                dispatch(errMsg(msg))
            }
        })
    }
}

export function updateInfo(data) {
    return async dispatch => {
        console.log(data)
        const response = await reqUpdate(data);
        const result = response.data;
        console.log(result)
        if (result.code === 0){
            const user = result.data
            dispatch(achieveUser(user))
        }else {
            const msg = result.msg
            dispatch(resetUser(msg))
        }
    }
}