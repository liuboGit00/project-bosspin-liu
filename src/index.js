import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux'
import {HashRouter, Switch, Route} from 'react-router-dom'

import login from './containers/login/login'
import register from './containers/register/regist'
import main from './containers/main/main'
import store from './redux/store'
import './assets/index/index.less';
import './test/socketio_test'

ReactDom.render(
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path='/login' component={login}/>
                <Route path='/register' component={register}/>
                <Route component={main}/>
            </Switch>
        </HashRouter>
    </Provider>
    ,document.getElementById('app'));