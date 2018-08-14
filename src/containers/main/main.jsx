/*
应用主界面路由组件
 */
import React, {Component} from 'react'
import {Switch,Route} from 'react-router-dom'
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom'

import LaoBanInfo from '../laoban-info/laoban-Info'
import DaShenInfo from '../dashen-info/dashen-Info'
import LaoBan from '../laoban/laoban';
import DaShen from '../dashen/dashen'
import NotFound from '../../components/notFound/notFound'

export default class Main extends Component {
    render() {
        const cookie = Cookies.get('userId');
        if (!cookie){
            return <Redirect to='/login' />
        }

        return (
                <Switch>
                    <Route path='/laobaninfo' component={LaoBanInfo}></Route>
                    <Route path='/dasheninfo' component={DaShenInfo}></Route>
                    <Route path='/laoban' component={LaoBan} ></Route>
                    <Route path='/dashen' component={DaShen} ></Route>
                    <Route component={NotFound}></Route>
                </Switch>
        )
    }
}
