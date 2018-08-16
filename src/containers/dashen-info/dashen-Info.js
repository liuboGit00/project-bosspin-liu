import React,{Component} from 'react';
import { NavBar, WingBlank, WhiteSpace,List,InputItem,Button,TextareaItem} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

import {updateInfo} from '../../redux/actions';
import SelectHeader from '../../components/selectHeader/selectHeader'
class DaShenInfo extends Component{
    state = {
        header: '', // 头像名称
        info: '', // 职位简介
        post: '', // 职位名称
    };

    selectHeader = (header) => {
        this.setState({header})
    };
    handleChange = (name,value) => {
        this.setState({
            [name]:value
        })
    };
    saveMsg = () => {
        this.props.updateInfo(this.state)
    };

    render(){
        const {header} = this.props.user;
        //判断是否填写信息完整
        if (header){
            return <Redirect to='/dashen' />
        }
        return (
            <div style={{marginTop: 50}}>
                <NavBar>大神信息完善</NavBar>
                <SelectHeader selectHeader={this.selectHeader}/>
                <WingBlank>
                    <List>
                        <WhiteSpace />
                        <InputItem onChange={val => {this.handleChange('post',val)}}>求职岗位</InputItem>
                        <WhiteSpace />
                        <TextareaItem
                            title="个人介绍"
                            rows={3}
                            placeholder="请填写个人介绍"
                            onChange={val => {this.handleChange('info',val)}}
                        />
                        <Button type="primary" onClick={this.saveMsg}>保存</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {updateInfo}
)(DaShenInfo)