/*
应用主界面路由组件
 */
import React, {Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import Cookies from 'js-cookie';
import {NavBar} from 'antd-mobile'
import {connect} from 'react-redux'

import LaoBanInfo from '../laoban-info/laoban-Info'
import DaShenInfo from '../dashen-info/dashen-Info'
import LaoBan from '../laoban/laoban';
import DaShen from '../dashen/dashen';
import Message from '../message/message'
import Personal from '../person/person'
import Chat from '../chat/chat'
import FootBar from '../../components/nav-footer/nav-footer'
import NotFound from '../../components/notFound/notFound'
import {getUser} from '../../redux/actions'
import setPath from '../../utils/path/setPath'
class Main extends Component {

    // 给组件对象添加属性
    navList = [
        {
            path: '/laoban', // 路由路径
            component: LaoBan,
            title: '大神列表',
            icon: 'dashen',
            text: '大神',
        },
        {
            path: '/dashen', // 路由路径
            component: DaShen,
            title: '老板列表',
            icon: 'laoban',
            text: '老板',
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ]
    componentDidMount() {
        // 只有当前面登陆过, 但当前还没有登陆, 才去发请求获取用户信息
        const userid = Cookies.get('userId')
        const {user} = this.props
        if(userid && !user._id) {
            console.log(111)
            this.props.getUser()
        }
    }
    render() {
        const cookie = Cookies.get('userId')
        if (!cookie){
            return <Redirect to='/login' />
        }
        const path = this.props.location.pathname;
        const {user} = this.props;

        if(!user._id) { // 不能在render中发送ajax请求  为什么要加这句话
            return <div>LOADING...</div>
        }
        if (path === '/'){
            return <Redirect to= {setPath(user.type,user.header)} />
        }

        if (user.type === 'dashen'){
            this.navList[0].hide = true
        }else if (user.type === 'laoban'){
            this.navList[1].hide = true
        }

        const currentNav = this.navList.find((nav,index) =>  nav.path === path);
        return (
                <div>
                    { currentNav ? <NavBar>{currentNav.title}</NavBar> : null}
                    <Switch>
                        <Route path='/laobaninfo' component={LaoBanInfo} />
                        <Route path='/dasheninfo' component={DaShenInfo} />
                        <Route path='/laoban' component={LaoBan} />
                        <Route path='/dashen' component={DaShen} />
                        <Route path='/personal' component={Personal} />
                        <Route path='/message' component={Message} />
                        <Route path='/chat/:id' component={Chat} />
                        <Route component={NotFound} />
                    </Switch>
                    { currentNav ? <FootBar navList={this.navList}/> : null}
                </div>

        )
    }
}
export default connect(
    state => ({user : state.user}),
    {getUser}
)(Main)
