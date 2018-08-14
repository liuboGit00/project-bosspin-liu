import React,{Component} from 'react';
import {Link} from 'react-router-dom';
export default class notFound extends Component{
    render(){
        return (
            <div>
                <h1>页面未找到</h1>
                <Link to='/login'>点击跳转登陆页面</Link>
            </div>
        )
    }
}