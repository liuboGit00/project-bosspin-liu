import {combineReducers} from 'redux'
const xxxInit = 1;
const yyyInit = 2;
function xxx(preState = xxxInit,action) {
    switch (action.type){
        default :
            return preState
    }
}

function yyy(preState = yyyInit,action) {
    switch (action.type){
        default :
            return preState
    }
}

export default combineReducers({
    xxx,
    yyy
})
/*
1. 向外暴露是一个整合后的reducer函数: function (state, action)
2. state的结构为: {xxx: xxx(), yyy: yyy()}
 */