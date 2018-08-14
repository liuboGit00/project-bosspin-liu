/*
用户登陆的路由组件
 */
import React, {Component} from 'react'
import { NavBar, WingBlank, WhiteSpace,List,InputItem,Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from  'react-router-dom';

import {login} from '../../redux/actions';
import Logo from '../../components/logo/logo';
class Login extends Component {
    state = {
      username: '',
      password: ''
    };
    handleChange = (name,val) => {
        this.setState({
            [name]: val
        })
    };
    handleLoad = () => {
        this.props.login(this.state)
    };
    toRegist = () => {
        this.props.history.replace('/register')
    };
    render() {
        const {msg,redirectTo} = this.props.user;
        if (redirectTo){
            return <Redirect to={redirectTo} />
        }
        return (
            <div>
                <NavBar>注册</NavBar>
                <Logo />
                <WingBlank>
                    <List>
                        <p className='errMsg'>{msg}</p>
                        <WhiteSpace />
                        <InputItem placeholder='请输入用户名'
                             onChange={(val) => {this.handleChange('username',val)}}
                        >用户名</InputItem>
                        <WhiteSpace />
                        <InputItem type='password' placeholder='请输入密码'
                             onChange={(val) => {this.handleChange('password',val)}}
                        >密码</InputItem>
                        <WhiteSpace />
                        <Button type="primary" onClick={this.handleLoad}>登陆</Button>
                        <WhiteSpace />
                        <Button onClick={this.toRegist}>前往注册</Button>
                    </List>
                </WingBlank>
            </div>

        )
    }
}

export default connect (
    state => ({user: state.user}),
    {login}
)(Login)