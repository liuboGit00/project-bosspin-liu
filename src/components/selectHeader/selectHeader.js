import React,{Component} from 'react';
import { List,Grid} from 'antd-mobile';
import PropTypes from 'prop-types';

export default class selectHeader extends Component{
    static propTypes = {
        selectHeader: PropTypes.func.isRequired
    };
    state = {
        icon: null  //当前选择的头像
    };
    constructor(){
        super();
        //初始数据
        this.headList = [];
        for (let i=0;i<20;i++){
            const text = `头像${i+1}`
            const icon = require(`./images/${text}.png`);
            this.headList.push({icon,text})
        }
    }
    selectHeader = ({icon,text}) => {
        this.setState({icon});
        this.props.selectHeader(text)
    };
    render(){
        const {icon} = this.state;
        const head = icon ? <div>已选择头像 <img src={icon} alt="icon"/> </div> : '请选择头像';
        return (
            <List renderHeader={() => head}>
                <Grid
                    columnNum = {5}
                    data={this.headList}
                    onClick={this.selectHeader}
                />
            </List>
        )
    }
}