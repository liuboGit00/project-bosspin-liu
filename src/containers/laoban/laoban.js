import React,{Component} from 'react';
import {connect} from 'react-redux'

import UserList from '../../components/userList/userList'
import {receiveUserList} from '../../redux/actions'
class LaoBan extends Component{
    //分发异步action
    componentDidMount(){
        this.props.receiveUserList('dashen')
    }
    render(){
        const userList = this.props.userList
        return <UserList userList={userList} />
    }
}
export default connect(
    state => ({userList : state.userList}),
    {receiveUserList}
)(LaoBan)