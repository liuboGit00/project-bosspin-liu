import React,{Component} from 'react';
import {NavBar,List,InputItem} from 'antd-mobile'
import {connect} from 'react-redux'

import {sendMsg} from '../../redux/actions'
const Item = List.Item
class Chat extends Component{
    state = {
        content:''
    }
    sendMsgs = () => {
        const {content} = this.state
        const from = this.props.user._id;
        const to = this.props.match.params.id
        if (!content.trim()){
            return
        }
        console.log(content)
        this.props.sendMsg({content,from,to})

        this.setState({content:''})
    }
    // 初始化显示滚动到底部
    componentDidMount() {
        // 初始显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }

    // 更新显示时滚动到底部
    componentDidUpdate () {
        // 更新显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }

    render(){
        //目标用户的id
        const targetId = this.props.match.params.id
        const {user} = this.props
        //我的id
        const meId = user._id
        const chatId = [targetId,meId].sort().join('_')
        const {users,chatMsgs} = this.props.chat
        //users数据还没获取到
        if (!users[meId]){
            return <h1>loading...</h1>
        }
        //过滤出我与当前目标用户的聊天
        const msg = chatMsgs.filter(item => item.chat_id === chatId)
        // 目标用户的头像图片对象
        const targetIcon = require(`../../components/selectHeader/images/${users[targetId].header}.png`)
        return (
            <div id='chat-page'>
                <NavBar>{users[targetId].username}</NavBar>
                <List style={{marginTop:50}}>
                    {
                        msg.map((item,index) => {
                            if (item.to === meId ){ //别人发给我的
                                return (
                                    <Item
                                        key={index}
                                        thumb={targetIcon}
                                    >
                                        {item.content}
                                    </Item>
                                )
                            }else { //我发给别人的
                                return (
                                    <Item
                                        key={index}
                                        className='chat-me'
                                        extra='我'
                                    >
                                        {item.content}
                                    </Item>
                                )

                            }
                        })
                    }
                </List>

                <div className='am-tab-bar'>
                    <InputItem
                        onChange={val => {this.setState({content:val})}}
                        placeholder="请输入"
                        value={this.state.content}
                        extra={
                            <span onClick={this.sendMsgs}>发送</span>
                        }
                    />
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user,chat : state.chat}),
    {sendMsg}
)(Chat)