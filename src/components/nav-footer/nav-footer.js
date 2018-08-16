import React,{Component} from 'react'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'

class NavFooter extends Component{
    static propTypes = {
        navList: PropTypes.array.isRequired
    }

    render() {
        //过滤掉hidden为true的
        const navList = this.props.navList.filter(item => !item.hide);
        const path = this.props.location.pathname;
        return (
            <TabBar>
                {
                    navList.map((item,index) => (
                        <TabBar.Item
                            icon={{ uri: require(`./images/${item.icon}.png`) }}
                            selectedIcon={{ uri: require(`./images/${item.icon}-selected.png`) }}
                            title={item.text}
                            key={index}
                            selected={path === item.path}
                            onPress={() => {this.props.history.replace(item.path)}}
                        />
                    ))
                }
            </TabBar>
        )
    }

}
export default withRouter (NavFooter)
