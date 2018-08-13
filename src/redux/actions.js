/*
* 此模块为actions模块
* */
import {AUTH_SUCCESS,ERROR_MSG} from './actions-type';
import {reqRegister,reqLogin} from '../api/index';
/*
* 注册异步的action
* */

const authSuccess = user => ({type: AUTH_SUCCESS,data:user});
const errMsg = msg => ({type: ERROR_MSG,data: msg})

export function register({username,password,type}) {
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