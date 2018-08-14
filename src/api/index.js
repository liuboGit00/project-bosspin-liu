/*
* axios返回的是一个promise函数
* */
import axios from './api';

export const reqRegister = ({username,password,type}) => axios('/register',{username,password,type},'POST');
export const reqLogin = (username,password) => axios('/login',{username,password},'POST');
export const reqUpdate = (data) => axios('/update',data,'POST');