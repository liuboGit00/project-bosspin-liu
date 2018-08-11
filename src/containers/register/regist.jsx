import React, {Component} from 'react'
import { NavBar, WingBlank, WhiteSpace,List,InputItem,Radio,Button} from 'antd-mobile';

import Logo from '../../assets/logo/logo';
export default class Register extends Component {
    state = {
        username: '',
        password: '',
        confirmPwd: '',
        type: 'dashen'
    };
    handleChange = (name,val) => {
        this.setState({
            [name]: val
        })
    };
    handleRegist = () => {
        console.log(this.state)
    };
    toLogin = () => {
      this.props.history.replace('/login')
    };
    render() {
        const {type} = this.state
        return (
            <div>
                <NavBar>注册</NavBar>
                <Logo />
                <WingBlank>
                    <List>
                        <WhiteSpace />
                        <InputItem placeholder='请输入用户名'
                           onChange={(val) => {this.handleChange('username',val)}}
                        >用户名</InputItem>
                        <WhiteSpace />
                        <InputItem type='password' placeholder='请输入密码'
                           onChange={(val) => {this.handleChange('password',val)}}
                        >密码</InputItem>
                        <WhiteSpace />
                        <InputItem type='password' placeholder='请确认密码'
                           onChange={(val) => {this.handleChange('confirmPwd',val)}}
                        >确认密码</InputItem>
                        <WhiteSpace />
                        <List.Item>
                            <span>选择类型：</span>
                            <Radio checked={type === 'dashen'} onChange={() => {this.handleChange('type','dashen')}}>大神</Radio>&nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'laoban'} onChange={() => {this.handleChange('type','laoban')}}>老板</Radio>
                        </List.Item>
                        <WhiteSpace />
                        <Button type="primary" onClick={this.handleRegist}>注册</Button>
                        <WhiteSpace />
                        <Button onClick={this.toLogin}>已有账户</Button>
                    </List>
                </WingBlank>
            </div>

        )
    }
}
