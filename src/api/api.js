import axios from 'axios';
/*
* axios返回的是一个promise函数
* */
export default function (url,data = {},method = 'GET') {
    if (method === 'GET'){
        let getMsg = '';
        Object.keys(data).forEach(function (item) {
            getMsg += `${item}=${data[item]}&`
        });
        getMsg = getMsg.substring(0,getMsg.length - 1);
        url = url + '?' + getMsg;
        return axios.get(url)
    }else if(method === 'POST'){
        return axios.post(url,data)
    }
}