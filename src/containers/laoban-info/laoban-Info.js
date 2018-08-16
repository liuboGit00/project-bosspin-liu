import React,{Component} from 'react';
import { NavBar, WingBlank, WhiteSpace,List,InputItem,Button,TextareaItem} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

import {updateInfo} from '../../redux/actions';
import SelectHeader from '../../components/selectHeader/selectHeader'
class LaoBanInfo extends Component{
    state = {
        header: '', // 头像名称
        info: '', // 职位简介
        post: '', // 职位名称
        company: '', // 公司名称
        salary: '' // 工资
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
        if (header){
            return <Redirect to='/laoban' />
        }
        return (
            <div style={{marginTop: 50}}>
                <NavBar>老板信息完善</NavBar>
                <SelectHeader selectHeader={this.selectHeader}/>
                <WingBlank>
                    <List>
                        <WhiteSpace />
                        <InputItem onChange={val => {this.handleChange('post',val)}}>招聘职位</InputItem>
                        <WhiteSpace />
                        <InputItem onChange={val => {this.handleChange('company',val)}}>公司名称</InputItem>
                        <WhiteSpace />
                        <InputItem onChange={val => {this.handleChange('salary',val)}}>职位薪资</InputItem>
                        <WhiteSpace />
                        <TextareaItem
                            title="职位要求"
                            rows={3}
                            placeholder="请填写您的职位要求"
                            onChange={val => {this.handleChange('info',val)}}
                        />
                        <Button type="primary" onClick={this.saveMsg}>完成</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {updateInfo}
)(LaoBanInfo)