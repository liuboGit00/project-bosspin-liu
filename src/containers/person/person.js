import React,{Component} from 'react';
import {connect} from 'react-redux'
import {Result,List,WhiteSpace,Button,Modal} from 'antd-mobile'
import Cookies from 'js-cookie'

import {resetUser} from '../../redux/actions'
const Item = List.Item
const Brief = Item.Brief
class Person extends Component{

    logout = () => {
        Modal.alert('退出', '确认退出登录吗?', [
            {
                text: '取消',
                onPress: () => console.log('cancel')
            },
            {
                text: '确认',
                onPress: () => {
                    // 删除cookie中的userid
                    Cookies.remove('userId')
                    // 重置state中的user
                    console.log(666)
                    this.props.resetUser()
                }
            }
        ])
    }
    render(){
        const {post,info,salary,header,username,company} = this.props.user;
       return (
           <div style={{marginTop: 50}}>
               <Result
                   img={<img src={require(`../../components/selectHeader/images/${header}.png`)} style={{width: 50}} alt="header"/>}
                   title={username}
                   message={company}
               />
               <List renderHeader={() => '相关信息'}>
                   <Item multipleLine>
                       {post ? <Brief>职位: {post}</Brief> : null}
                       {info ? <Brief>简介: {info}</Brief> : null}
                       {salary ? <Brief>薪资: {salary}</Brief> : null}
                   </Item>
               </List>
               <WhiteSpace/>
               <List>
                   <Button type='warning' onClick={this.logout}>退出登录</Button>
               </List>
           </div>
       )
    }
}
export default connect(
    state => ({user: state.user}),
    {resetUser}
)(Person)