import React, { useContext, useEffect } from 'react';
import { AppContext } from '@/App';
import { Link } from 'react-router-dom';
import { GET_USER_STATUS } from '@/const/api';
import { AUTH } from '@/const/text';
import { ADVANCED_USER, GENERAL_USER } from '@/store/actionType';

import get from 'lodash/get';
import ajax from '@/util/request';
import './index.less';

//用户权限 1为高级， 2为普通
const AUTH_STATUS = {
    1: ADVANCED_USER,
    2: GENERAL_USER
};

function Header () {
    const [state, dispatch] = useContext(AppContext);

    function getUserStatus () {
        ajax({
            url: GET_USER_STATUS
        }).then(res => {
            let auth = get(res, 'data.auth', 0),
                user = get(res, 'data.user', '');
                dispatch({
                    type: AUTH_STATUS[auth],
                    user
                });
        });
    }
    useEffect(() => {
        getUserStatus();
    }, []);

    return (
        <section className="header">
            <div className="header-title">Community 社区</div>
            <div className="header-index">
                <Link to="/home">首页</Link>
            </div>
            <div className="header-publish">
                <Link to="/publish">说一说</Link>
            </div>
            <div className="header-login">
                <span className="header-auth">{AUTH[state.auth]}</span>
                <Link to="/login">{state.user || '登录'}</Link>
            </div>
        </section>
    )
}

export default Header;